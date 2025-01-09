/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

/* eslint-disable no-console */
console.log(
	'Hello World! (from create-block-reservoir-levels-widget block)'
);
/* eslint-enable no-console */

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
    const mapContainer = document.querySelector(".map-container");

    reservoirs.forEach((reservoir) => {
        // Ignore hover events for the "total-reservoir"
        if (reservoir.classList.contains("total-reservoir")) {
            return;
        }

        reservoir.addEventListener("mouseenter", () => {
            // Get the data-x and data-y attributes for positioning
            const xPercent = parseFloat(reservoir.getAttribute("data-x")); // Percentage from data attribute
            const yPercent = parseFloat(reservoir.getAttribute("data-y"));

            // Get actual pixel dimensions of the map container
            const containerWidth = mapContainer.offsetWidth;
            const containerHeight = mapContainer.offsetHeight;

            // Calculate exact pixel positions
            const x = (xPercent / 100) * containerWidth;
            const y = (yPercent / 100) * containerHeight;

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
});
