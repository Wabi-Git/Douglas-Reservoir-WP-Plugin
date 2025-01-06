<?php
/**
 * Plugin Name:       reservoir Levels Widget
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       reservoir-levels-widget
 *
 * @package CreateBlock
 */

 if ( ! defined( 'ABSPATH' ) ) {
    exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 */
function create_block_reservoir_levels_widget_block_init() {
    register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_reservoir_levels_widget_block_init' );

/**
 * Enqueue the block editor assets and localize plugin asset paths.
 */
function enqueue_additional_reservoir_widget_assets() {
    wp_localize_script(
        'create-block-reservoir-levels-widget-editor-script',
        'pluginAssets',
        [
            'images' => plugins_url( 'assets/images/', __FILE__ ),
        ]
    );
}
add_action( 'enqueue_block_editor_assets', 'enqueue_additional_reservoir_widget_assets' );




