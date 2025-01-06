<?php
/**
 * Plugin Name:       Reservoirs Levels Widget
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       reservoirs-levels-widget
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_reservoirs_levels_widget_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_reservoirs_levels_widget_block_init' );

/**
 * Enqueue the block editor assets and localize plugin asset paths.
 */
function enqueue_reservoirs_widget_assets() {
    // Localize the plugin's asset path for JavaScript use.
    wp_localize_script(
        'reservoirs-widget-script',
        'pluginAssets',
        [
            'images' => plugins_url( 'assets/images/', __FILE__ ),
        ]
    );
}
add_action( 'enqueue_block_editor_assets', 'enqueue_reservoirs_widget_assets' );
