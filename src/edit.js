import React, { Component, createRef } from "react";

const MOCK_DATA = [
    {
        TagName: "WhyanbeelWTP.WHYLT5500_PV1",
        ReservoirName: "Whyanbeel",
        Units: "%",
        Description: "LT5500 Treated Water Reservoir Level",
        DateTime: "2024-12-19T14:06:00.0000000Z",
        Value: 85.0437436785017,
        AverageDailyUse: 160,
        DailyUseChange: -0.5,
        MonthWaterLevelChange: -2.0
    },
    {
        TagName: "MossmanWTP.MOSLT5133_PV1",
        ReservoirName: "Mossman",
        Units: "%",
        Description: "LT5133 Clearwell Mossman Reservoir Level",
        DateTime: "2024-12-20T03:54:00.0000000Z",
        Value: 94.9312545157768,
        AverageDailyUse: 156,
        DailyUseChange: -0.8,
        MonthWaterLevelChange: 1.5
    },
    {
        TagName: "MossmanWTP.MOSLT5132_PV1",
        ReservoirName: "Port Douglas",
        Units: "%",
        Description: "LT5132 Clearwell Port Douglas Reservoir Level",
        DateTime: "2024-12-20T03:54:15.0000000Z",
        Value: 92.8984355926514,
        AverageDailyUse: 161,
        DailyUseChange: -0.3,
        MonthWaterLevelChange: 0.5
    },
    {
        TagName: "DWTP.DAILT5175_PV1",
        ReservoirName: "Daintree",
        Units: "%",
        Description: "LT5175 Treated Water Reservoir Level",
        DateTime: "2024-12-20T03:54:30.0000000Z",
        Value: 89.1531181335449,
        AverageDailyUse: 163,
        DailyUseChange: -1.0,
        MonthWaterLevelChange: 2.5
    },
];

const RESERVOIR_COORDINATES = {
    Whyanbeel: { x: 43, y: 48 },
    Mossman: { x: 56.5, y: 65.5 },
    PortDouglas: { x: 73, y: 71.5 },
    Daintree: { x: 53, y: 62 },
};

// use react class component instead of function component for clearer lifecycle management

class Edit extends Component {
    constructor(props) {
        super(props);
        // Create refs for each reservoir
        this.reservoirRefs = [];
        this.mapContainerRef = createRef();
        this.blueDotRef = createRef();
    }

    // Dynamically create refs for reservoirs
    createReservoirRef = (index) => {
        if (!this.reservoirRefs[index]) {
            this.reservoirRefs[index] = createRef();
        }
        return this.reservoirRefs[index];
    };

    componentDidMount() {
        console.log("mounting...");

        // Dynamically fetch the SVG content
        const mapSvgUrl = `${PluginAssets.images}map.svg`; // Use the dynamically provided assets path
        fetch(mapSvgUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch map.svg");
                }
                return response.text();
            })
            .then((svgContent) => {
                // Inject the SVG content directly into the map-container
                if (this.mapContainerRef.current) {
                    this.mapContainerRef.current.innerHTML += svgContent;
                }
            })
            .catch((error) => {
                console.error("Error fetching the SVG:", error);
            });

        // Iterate over refs and perform DOM manipulation
        this.reservoirRefs.forEach((ref) => {
            // update water levels
            if (ref.current) {
                const levelElement = ref.current.querySelector(".level");
                const percentage = parseFloat(levelElement.getAttribute("data-level"));
                const fill = document.createElement("div");
                fill.classList.add("reservoir-fill");
                ref.current.appendChild(fill);
                setTimeout(() => {
                    fill.style.height = `${percentage}%`;
                }, 100);
            }

            // attach event handlers
            if (ref.current) {
                ref.current.addEventListener("mouseenter", () => this.handleMouseEnter(ref.current));
                ref.current.addEventListener("mouseleave", this.handleMouseLeave);
                ref.current.addEventListener("click", () => this.handleClick(ref.current));
            }
        });

        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        this.reservoirRefs.forEach((ref) => {
            if (ref.current) {
                ref.current.removeEventListener("mouseenter", this.handleMouseEnter);
                ref.current.removeEventListener("mouseleave", this.handleMouseLeave);
                ref.current.removeEventListener("click", this.handleClick);
            }
        });

        window.removeEventListener("resize", this.handleResize);
    }

    handleMouseEnter = (reservoir) => {
        const { x, y } = this.calculateDotPosition(reservoir);
        if (this.blueDotRef.current) {
            this.blueDotRef.current.style.left = `${x}px`;
            this.blueDotRef.current.style.top = `${y}px`;
            this.blueDotRef.current.style.transform = "scale(1)";
        }
    };

    handleMouseLeave = () => {
        if (this.blueDotRef.current) {
            this.blueDotRef.current.style.transform = "scale(0)";
        }
    };

    handleClick = (reservoir) => {
        const { x, y } = this.calculateDotPosition(reservoir);
        if (this.blueDotRef.current) {
            const isActive = this.blueDotRef.current.style.transform === "scale(1)";
            if (isActive) {
                this.handleMouseLeave();
            } else {
                this.blueDotRef.current.style.left = `${x}px`;
                this.blueDotRef.current.style.top = `${y}px`;
                this.blueDotRef.current.style.transform = "scale(1)";
            }
        }
    };

    handleResize = () => {
        const activeReservoir = this.reservoirRefs.find(
            (ref) => ref.current && ref.current.matches(":hover")
        );
        if (activeReservoir) {
            const { x, y } = this.calculateDotPosition(activeReservoir.current);
            if (this.blueDotRef.current) {
                this.blueDotRef.current.style.left = `${x}px`;
                this.blueDotRef.current.style.top = `${y}px`;
            }
        }
    };

    calculateDotPosition = (reservoir) => {
        const xPercent = parseFloat(reservoir.getAttribute("data-x"));
        const yPercent = parseFloat(reservoir.getAttribute("data-y"));
        const svgElement = this.mapContainerRef.current.querySelector("svg");

        if (!svgElement) return { x: 0, y: 0 };

        const svgRect = svgElement.getBoundingClientRect();
        const x = (xPercent / 100) * svgRect.width;
        const y = (yPercent / 100) * svgRect.height;

        return { x, y };
    };

    getRoundedValue = (value) => parseFloat(value.toFixed(1));

    render() {
        const reservoirsByColumn = Array.from(
            { length: Math.ceil(MOCK_DATA.length / 2) }, 
            (_, i) => MOCK_DATA.slice(i * 2, i * 2 + 2)
        )

        return (
            <div className="wp-block-create-block-reservoir-levels-widget">
                <div className="single-index clearfix">
                    <div className="single-entry">
                        <div className="single-content">
                            <div className="reservoir-widget">
                                <h2>How full are our reservoirs?</h2>
                                <div className="reservoir-details">
                                    <div className="reservoir-column">
                                        <div
                                            className="reservoir total-reservoir"
                                            ref={this.createReservoirRef(0)}
                                        >
                                            <div className="level" data-level="90.5">90.5%</div>
                                            <h3>Total Reservoir Level</h3>
                                            <div className="line-divider-thick"></div>
                                            <div className="total-usage">
                                                <img
                                                    decoding="async"
                                                    src={`${PluginAssets.images}water-icon.svg`} // Dynamically fetch the correct URL
                                                    alt="Water Usage Icon"
                                                    className="total-water-icon"
                                                />
                                                640L/day
                                            </div>
                                            <div className="paragraph">Average Daily Use Per Person</div>
                                            <div className="grounding-boxes">
                                                <div className="grounding-box">
                                                    <div className="box-value positive">2.5%</div>
                                                    <span
                                                        className="label"
                                                        data-default="Change in Total"
                                                        data-hover="Change in Total Reservoir Level since Last Week"
                                                    ></span>
                                                </div>
                                                <div className="grounding-box">
                                                    <div className="box-value negative">-2.6%</div>
                                                    <span
                                                        className="label"
                                                        data-default="Change in Use"
                                                        data-hover="Change In Use Per Person Since Last Month"
                                                    ></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {reservoirsByColumn.map((column, columnIndex) => (
                                        <div className="reservoir-column" key={columnIndex}>
                                            {column.map((reservoir, reservoirIndex) => {
                                                const overallIndex = columnIndex * 2 + reservoirIndex + 1; // Calculate the overall index
                                                const { x, y } = RESERVOIR_COORDINATES[reservoir.ReservoirName] || { x: 0, y: 0 };

                                                return (
                                                    <div
                                                        key={overallIndex}
                                                        className="reservoir"
                                                        ref={this.createReservoirRef(overallIndex)}
                                                        data-name={reservoir.ReservoirName}
                                                        data-x={x}
                                                        data-y={y}
                                                    >
                                                        <div className="tag">{reservoir.ReservoirName}</div>
                                                        <div className="level" data-level={reservoir.Value}>
                                                            {this.getRoundedValue(reservoir.Value)}%
                                                        </div>
                                                        <div className="line-divider"></div>
                                                        <div className="usage">
                                                            <img
                                                                decoding="async"
                                                                src={`${PluginAssets.images}water-icon.svg`} // Dynamically fetch the correct URL
                                                                alt="Water Usage Icon"
                                                                className="total-water-icon"
                                                            />
                                                            {reservoir.AverageDailyUse}L/day
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}

                                    <div
                                        className="map-container"
                                        ref={this.mapContainerRef}
                                    >
                                        <div
                                            className="blue-dot"
                                            ref={this.blueDotRef}
                                            style={{
                                                left: "222.832px",
                                                top: "286px",
                                                transform: "scale(0)",
                                            }}
                                        ></div>
                                    </div>
                                </div>
                                <div className="updated-daily">ℹ️ Updated Daily</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Edit;
