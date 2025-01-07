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

        // Get the reservoir-fill div
        let fill = document.createElement("div");
        fill.classList.add("reservoir-fill");
        reservoir.appendChild(fill);

        // Animate the fill based on the percentage
        setTimeout(() => {
            fill.style.height = `${percentage}%`;
        }, 100); // Add a slight delay for smoother animation
    });
});

