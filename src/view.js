/* eslint-disable no-console */
console.log(
    'Hello World! (from create-block-reservoir-levels-widget block by SAFEgroup Automation, Monique Kuhn)'
);

document.addEventListener("DOMContentLoaded", () => {
    // Select all reservoir elements
    const reservoirs = document.querySelectorAll(".reservoir");

    reservoirs.forEach((reservoir) => {
        // Extract percentage value from the `.level` element
        const percentage = parseFloat(
            reservoir.querySelector(".level").getAttribute("data-level")
        );

        // Create a `reservoir-fill` div to visually represent the fill level
        let fill = document.createElement("div");
        fill.classList.add("reservoir-fill");
        reservoir.appendChild(fill);

        // Set the height of the `reservoir-fill` to match the percentage
        setTimeout(() => {
            fill.style.height = `${percentage}%`;
        }, 100); // Slight delay for smooth animation
    });

    // Blue dot hover functionality for the map
    const blueDot = document.querySelector(".blue-dot");
    const svgElement = document.querySelector(".map-container svg");

    // Calculate the blue dot position relative to the reservoir's data attributes
    const calculateDotPosition = (reservoir) => {
        const xPercent = parseFloat(reservoir.getAttribute("data-x"));
        const yPercent = parseFloat(reservoir.getAttribute("data-y"));

        const svgWidth = svgElement.getBoundingClientRect().width;
        const svgHeight = svgElement.getBoundingClientRect().height;

        // Convert percentage-based coordinates to pixel positions
        const x = (xPercent / 100) * svgWidth;
        const y = (yPercent / 100) * svgHeight;

        return { x, y };
    };

    // Show the blue dot when hovering over a reservoir
    const handleMouseEnter = (reservoir) => {
        const { x, y } = calculateDotPosition(reservoir);

        // Position and display the blue dot
        if (blueDot) {
            blueDot.style.left = `${x}px`;
            blueDot.style.top = `${y}px`;
            blueDot.style.transform = "scale(1)";
        }
    };

    // Hide the blue dot when the mouse leaves a reservoir
    const handleMouseLeave = () => {
        if (blueDot) {
            blueDot.style.transform = "scale(0)";
        }
    };

    reservoirs.forEach((reservoir) => {
        // Skip hover events for the total reservoir section
        if (reservoir.classList.contains("total-reservoir")) {
            return;
        }

        // Add hover events for desktop interaction
        reservoir.addEventListener("mouseenter", () => handleMouseEnter(reservoir));
        reservoir.addEventListener("mouseleave", handleMouseLeave);

        // Add click events for touch device interaction
        reservoir.addEventListener("click", () => {
            if (blueDot.style.transform === "scale(1)") {
                handleMouseLeave();
            } else {
                handleMouseEnter(reservoir);
            }
        });
    });

    // Recalculate blue dot position on window resize
    window.addEventListener("resize", () => {
        const activeReservoir = document.querySelector(".reservoir:hover");

        if (activeReservoir && !activeReservoir.classList.contains("total-reservoir")) {
            const { x, y } = calculateDotPosition(activeReservoir);

            // Update the blue dot position based on the resized window
            if (blueDot) {
                blueDot.style.left = `${x}px`;
                blueDot.style.top = `${y}px`;
            }
        }
    });
});
