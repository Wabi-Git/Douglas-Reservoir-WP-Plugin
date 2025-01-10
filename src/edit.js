// /**
//  * React hook that is used to mark the block wrapper element.
//  * It provides all the necessary props like the class name.
//  */
// import { useBlockProps } from '@wordpress/block-editor';
// import './editor.scss';
// import { ReservoirLevels } from './components/ReservoirLevels';

// /**
//  * The edit function renders the block in the editor.
//  *
//  * @return {Element} Element to render.
//  */
// export default function edit() {
//     const blockProps = useBlockProps();
//     return (
//         <p { ...blockProps }>
//             Reservoir Levels Widget - edit mode content!
//         </p>
//     );
// }

import { useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

const MOCK_DATA = [
    {
        TagName: "WhyanbeelWTP.WHYLT5500_PV1",
        ReservoirName: "Whyanbeel",
        Units: "%",
        Description: "LT5500 Treated Water Reservoir Level",
        DateTime: "2024-12-19T14:06:00.0000000Z",
        Value: 85.0437436785017,
        AverageDailyUse: 160, // Average daily use in liters
        DailyUseChange: -0.5, // Percentage change in daily use since last week
        MonthWaterLevelChange: -2.0 // Percentage change in water level since last month
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

const Edit = () => {
    const blockProps = useBlockProps({
        className: "wp-block-create-block-reservoir-levels-widget",
    });

    useEffect(() => {
        const reservoirs = document.querySelectorAll(".reservoir");

        reservoirs.forEach((reservoir) => {
            const percentage = parseFloat(
                reservoir.querySelector(".level").textContent.replace("%", "")
            );

            let fill = document.createElement("div");
            fill.classList.add("reservoir-fill");
            reservoir.appendChild(fill);

            setTimeout(() => {
                fill.style.height = `${percentage}%`;
            }, 100);
        });
    }, []);

    const getRoundedValue = (value) => parseFloat(value.toFixed(1));

    return (
        <div {...blockProps}>
            <div className="single-index clearfix">
                <div className="single-entry">
                    <div className="single-content">
                        <div className="reservoir-widget">
                            <h2>How full are our reservoirs?</h2>
                            <div className="reservoir-details">
                                <div className="reservoir-column">
                                    <div className="reservoir total-reservoir">
                                        <div className="level">90.5%</div>
                                        <h3>Total Reservoir Level</h3>
                                        <div className="line-divider-thick"></div>
                                        <div className="total-usage">
                                            <img
                                                decoding="async"
                                                src="http://test-port-douglas-site.local/wp-content/plugins/Douglas Reservoir WP Plugin/assets/images/water-icon.svg"
                                                alt="Water Usage Icon"
                                                className="total-water-icon"
                                            />
                                            640L/day
                                        </div>
                                        <div className="paragraph">Average Daily Use Per Person</div>
                                        <div className="grounding-boxes">
                                            <div className="grounding-box">
                                                <div className="box-value negative">-2.6%</div>
                                                <span
                                                    className="label"
                                                    data-default="Change in Use"
                                                    data-hover="Change In Use Per Person Since Last Month"
                                                ></span>
                                            </div>
                                            <div className="grounding-box">
                                                <div className="box-value positive">2.5%</div>
                                                <span
                                                    className="label"
                                                    data-default="Change in Total"
                                                    data-hover="Change in Total Reservoir Level since Last Week"
                                                ></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="reservoir-column">
                                    {MOCK_DATA.slice(0, 2).map((reservoir, index) => (
                                        <div
                                            key={index}
                                            className="reservoir"
                                            data-name={reservoir.ReservoirName}
                                        >
                                            <div className="tag">{reservoir.ReservoirName}</div>
                                            <div className="level">{getRoundedValue(reservoir.Value)}%</div>
                                            <div className="line-divider"></div>
                                            <div className="usage">
                                                <img
                                                    decoding="async"
                                                    src="http://test-port-douglas-site.local/wp-content/plugins/Douglas Reservoir WP Plugin/assets/images/water-icon.svg"
                                                    alt="Water Usage Icon"
                                                    className="water-icon"
                                                />
                                                {reservoir.AverageDailyUse}L/day
                                            </div>
                                            <div className="reservoir-fill"></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="reservoir-column">
                                    {MOCK_DATA.slice(2).map((reservoir, index) => (
                                        <div
                                            key={index}
                                            className="reservoir"
                                            data-name={reservoir.ReservoirName}
                                        >
                                            <div className="tag">{reservoir.ReservoirName}</div>
                                            <div className="level">{getRoundedValue(reservoir.Value)}%</div>
                                            <div className="line-divider"></div>
                                            <div className="usage">
                                                <img
                                                    decoding="async"
                                                    src="http://test-port-douglas-site.local/wp-content/plugins/Douglas Reservoir WP Plugin/assets/images/water-icon.svg"
                                                    alt="Water Usage Icon"
                                                    className="water-icon"
                                                />
                                                {reservoir.AverageDailyUse}L/day
                                            </div>
                                            <div className="reservoir-fill"></div>
                                        </div>
                                    ))}
                                </div>
                                <div className="map-container">
                                    <div
                                        className="blue-dot"
                                        style={{ left: "222.832px", top: "286px", transform: "scale(0)" }}
                                    ></div>
                                    <svg
                                        id="Layer_1"
                                        data-name="Layer 1"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 766.98 1005.03"
                                    >
                                        <path className="cls-2" d="..." />
                                    </svg>
                                </div>
                            </div>
                            <div className="updated-daily">
                                ℹ️ Updated Daily
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
