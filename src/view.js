document.addEventListener("DOMContentLoaded", () => {
    // Select all reservoirs
    const reservoirs = document.querySelectorAll(".reservoir");

    reservoirs.forEach((reservoir) => {
        // Get the percentage value from the .level element
        const percentage = parseFloat(
            reservoir.querySelector(".level").textContent.replace("%", "")
        );

        // Create and append the reservoir-fill div
        let fill = document.createElement("div");
        fill.classList.add("reservoir-fill");
        reservoir.appendChild(fill);

        // Animate the fill based on the percentage
        setTimeout(() => {
            fill.style.height = `${percentage}%`;
        }, 100); // Add a slight delay for smoother animation
    });

    // Blue dot hover functionality
    const blueDot = document.querySelector(".blue-dot");
    const svgElement = document.querySelector(".map-container svg");

    const calculateDotPosition = (reservoir) => {
        const xPercent = parseFloat(reservoir.getAttribute("data-x"));
        const yPercent = parseFloat(reservoir.getAttribute("data-y"));

        const svgWidth = svgElement.getBoundingClientRect().width;
        const svgHeight = svgElement.getBoundingClientRect().height;

        // Calculate exact pixel positions using SVG dimensions
        const x = (xPercent / 100) * svgWidth;
        const y = (yPercent / 100) * svgHeight;

        return { x, y };
    };

    reservoirs.forEach((reservoir) => {
        // Ignore hover events for the "total-reservoir"
        if (reservoir.classList.contains("total-reservoir")) {
            return;
        }

        reservoir.addEventListener("mouseenter", () => {
            const { x, y } = calculateDotPosition(reservoir);

            // Update blue dot position
            if (blueDot) {
                blueDot.style.left = `${x}px`;
                blueDot.style.top = `${y}px`;
                blueDot.style.transform = "scale(1)";
            }
        });

        reservoir.addEventListener("mouseleave", () => {
            if (blueDot) {
                blueDot.style.transform = "scale(0)";
            }
        });
    });

    // Recalculate positions on window resize
    window.addEventListener("resize", () => {
        const activeReservoir = document.querySelector(".reservoir:hover");
        if (activeReservoir && !activeReservoir.classList.contains("total-reservoir")) {
            const { x, y } = calculateDotPosition(activeReservoir);

            // Update blue dot position on resize
            if (blueDot) {
                blueDot.style.left = `${x}px`;
                blueDot.style.top = `${y}px`;
            }
        }
    });
});
