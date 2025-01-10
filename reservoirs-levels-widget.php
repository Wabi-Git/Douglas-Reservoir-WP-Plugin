<?php
/**
 * Plugin Name:       Douglas Shire Council's Reservoir Levels Widget
 * Description:       This custom block retrieves the level data from https://www.odasa.com.au/douglas-website-data and formats it for Douglas Shire Council's website.
 * Version:           0.1.0
 * Requires at least: 6.6.2
 * Requires PHP:      7.4
 * Author:            The WordPress Contributors, SAFEgroup Automation, Monique Kuhn
 * License:           N/A
 * License URI:       N/A
 * Text Domain:       reservoir-levels-widget
 *
 * @package CreateBlock
 */

 if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// PHP: In your main plugin file
function enqueue_plugin_assets() {
    $plugin_url = plugin_dir_url(__FILE__);
    wp_enqueue_script('reservoir-widget-script', $plugin_url . 'assets/js/widget.js', array('wp-blocks', 'wp-element', 'wp-editor'), null, true);

    // Pass dynamic asset URL to the JavaScript
    wp_localize_script('reservoir-widget-script', 'PluginAssets', array(
        'images' => $plugin_url . 'assets/images/',
    ));
}
add_action('enqueue_block_editor_assets', 'enqueue_plugin_assets');

// Define mock data as an array for development and testing purposes.
const MOCK_DATA = [
    [
        "TagName" => "WhyanbeelWTP.WHYLT5500_PV1",
        "ReservoirName" => "Whyanbeel",
        "Units" => "%",
        "Description" => "LT5500 Treated Water Reservoir Level",
        "DateTime" => "2024-12-19T14:06:00.0000000Z",
        "Value" => 85.0437436785017,
        "AverageDailyUse" => 160, // Average daily use in liters
        "DailyUseChange" => -0.5, // Percentage change in daily use since last week
        "MonthWaterLevelChange" => -2.0 // Percentage change in water level since last month
    ],
    [
        "TagName" => "MossmanWTP.MOSLT5133_PV1",
        "ReservoirName" => "Mossman",
        "Units" => "%",
        "Description" => "LT5133 Clearwell Mossman Reservoir Level",
        "DateTime" => "2024-12-20T03:54:00.0000000Z",
        "Value" => 94.9312545157768,
        "AverageDailyUse" => 156,
        "DailyUseChange" => -0.8,
        "MonthWaterLevelChange" => 1.5
    ],
    [
        "TagName" => "MossmanWTP.MOSLT5132_PV1",
        "ReservoirName" => "Port Douglas",
        "Units" => "%",
        "Description" => "LT5132 Clearwell Port Douglas Reservoir Level",
        "DateTime" => "2024-12-20T03:54:15.0000000Z",
        "Value" => 92.8984355926514,
        "AverageDailyUse" => 161,
        "DailyUseChange" => -0.3,
        "MonthWaterLevelChange" => 0.5
    ],
    [
        "TagName" => "DWTP.DAILT5175_PV1",
        "ReservoirName" => "Daintree",
        "Units" => "%",
        "Description" => "LT5175 Treated Water Reservoir Level",
        "DateTime" => "2024-12-20T03:54:30.0000000Z",
        "Value" => 89.1531181335449,
        "AverageDailyUse" => 163,
        "DailyUseChange" => -1.0,
        "MonthWaterLevelChange" => 2.5
    ],
];

/**
 * Fetch data from the Douglas Website API or use mock data.
 *
 * @param string $url The API endpoint to fetch data from.
 * @param bool   $mock Whether to use mock data instead of making a network request.
 * @return array The data from the API or mock data.
 * @throws Exception If the API request fails.
 */
function fetch_douglas_website_data($url = 'https://www.odasa.com.au/douglas-website-data', $mock = false) {
    // Return mock data if the mock flag is true.
    if ($mock) {
        return MOCK_DATA;
    }

    // Fetch live data from the API.
    $response = wp_remote_get($url);

    // Check if the request resulted in an error.
    if (is_wp_error($response)) {
        throw new Exception('Network request failed: ' . $response->get_error_message());
    }

    // Get the body of the response.
    $body = wp_remote_retrieve_body($response);

    // Decode the JSON response into a PHP array.
    $data = json_decode($body, true);

    // Check for JSON parsing errors.
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Failed to parse JSON response: ' . json_last_error_msg());
    }

    return $data;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 */
function create_block_reservoir_levels_widget_block_init() {
    // Register the block and associate a render callback function.
    register_block_type(__DIR__ . '/build', array(
        'render_callback' => 'render_reservoir_levels_widget',
        'icon' => 'chart-bar', // Dashicon for a bar chart
    ));
}
add_action('init', 'create_block_reservoir_levels_widget_block_init');

/**
 * Render callback for the reservoir levels widget block.
 *
 * @param array $attributes The block attributes.
 * @return string The rendered HTML for the block.
 */
function render_reservoir_levels_widget($attributes) {
    // Fetch data dynamically, or use mock data for development.
    try {
        $reservoirs = fetch_douglas_website_data(
            'https://www.odasa.com.au/douglas-website-data',
            true // Set to true to use mock data for testing.
        );
    } catch (Exception $e) {
        return '<p>Error fetching reservoir data: ' . esc_html($e->getMessage()) . '</p>';
    }

    // Calculate the total reservoir level and total daily usage.
    $total_level = 0;
    $total_daily_use = 0;
    $reservoir_count = count($reservoirs);

    $total_water_level_change = 0;
    $total_daily_use_change = 0;

    foreach ($reservoirs as $reservoir) {
        $total_level += $reservoir['Value'];
        $total_daily_use += $reservoir['AverageDailyUse'];
    }

    // Iterate through reservoirs to sum up changes.
    foreach ($reservoirs as $reservoir) {
        $total_water_level_change += $reservoir['MonthWaterLevelChange'];
        $total_daily_use_change += $reservoir['DailyUseChange'];
    }

    // Round off the totals for better display
    $average_level = $reservoir_count > 0 ? $total_level / $reservoir_count : 0;
    $total_water_level_change = round($total_water_level_change, 1); // e.g., -0.5%
    $total_daily_use_change = round($total_daily_use_change, 1);     // e.g., +0.5%

    // Define the map coordinates for each reservoir.
    $reservoir_map_coordinates = [
        'Daintree' => ['x' => 43, 'y' => 48],
        'Whyanbeel' => ['x' => 53, 'y' => 62],
        'Mossman' => ['x' => 56.5, 'y' => 65.5],
        'Port Douglas' => ['x' => 73, 'y' => 71.5],
    ];

    ob_start();
    ?>
    <div class="reservoir-widget">
        <h2>How full are our reservoirs?</h2>
        <div class="reservoir-details">
            
            <!-- Total Reservoir Level -->
            <div class="reservoir total-reservoir">
                <div class="level" data-level="<?php echo esc_attr($average_level); ?>"><?php echo esc_html(round($average_level, 1)); ?>%</div>
                <h3>Total Reservoir Level</h3>
                <div class="line-divider-thick"></div>
                <div class="total-usage">
                    <img src="<?php echo plugin_dir_url(__FILE__) . 'assets/images/water-icon.svg'; ?>" alt="Water Usage Icon" class="total-water-icon">
                    <?php echo esc_html($total_daily_use); ?>L/day    
                </div>
                <div class="paragraph">Average Daily Use Per Person</div>

                <!-- New Boxes -->
                <div class="grounding-boxes">

                    <!-- Left Box: Total Water Level Change since last month -->
                    <div class="grounding-box">
                        <div class="box-value <?php echo $total_water_level_change >= 0 ? 'positive' : 'negative'; ?>">
                            <?php echo esc_html($total_water_level_change); ?>% 
                        </div>
                        <span class="label" 
                            data-default="Change in Total" 
                            data-hover="Change in Total Reservoir Level since Last Week">
                            
                        </span>
                    </div>

                    <!-- Right Box: Total Daily Use Change since last week-->
                    <div class="grounding-box">
                        <div class="box-value <?php echo $total_daily_use_change >= 0 ? 'positive' : 'negative'; ?>">
                            <?php echo esc_html($total_daily_use_change); ?>%
                        </div>
                        <span class="label" 
                            data-default="Change in Use" 
                            data-hover="Change In Use Per Person Since Last Month">
                            
                        </span>
                    </div>
                </div>
            </div>

            <!-- Column 2: First Two Reservoirs -->
            <div class="reservoir-column">
                <?php foreach (array_slice($reservoirs, 0, 2) as $reservoir): ?>
                    <?php
                        $coordinates = $reservoir_map_coordinates[$reservoir['ReservoirName']] ?? ['x' => 0, 'y' => 0];
                    ?>
                    <div 
                        class="reservoir" 
                        data-name="<?php echo esc_attr($reservoir['ReservoirName']); ?>" 
                        data-x="<?php echo esc_attr($coordinates['x']); ?>" 
                        data-y="<?php echo esc_attr($coordinates['y']); ?>">
                        <div class="tag"><?php echo esc_html($reservoir['ReservoirName']); ?></div>
                        <div class="level" data-level="<?php echo esc_attr($reservoir['Value']); ?>"><?php echo esc_html(round($reservoir['Value'], 1)); ?>%</div>
                        <div class="line-divider"></div>
                        <div class="usage">
                            <img src="<?php echo plugin_dir_url(__FILE__) . 'assets/images/water-icon.svg'; ?>" alt="Water Usage Icon" class="water-icon">
                            <?php echo esc_html($reservoir['AverageDailyUse']); ?>L/day
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <!-- Column 3: Last Two Reservoirs -->
            <div class="reservoir-column">
                <?php foreach (array_slice($reservoirs, 2) as $reservoir): ?>
                    <?php
                        $coordinates = $reservoir_map_coordinates[$reservoir['ReservoirName']] ?? ['x' => 0, 'y' => 0];
                    ?>
                    <div 
                        class="reservoir" 
                        data-name="<?php echo esc_attr($reservoir['ReservoirName']); ?>" 
                        data-x="<?php echo esc_attr($coordinates['x']); ?>" 
                        data-y="<?php echo esc_attr($coordinates['y']); ?>">
                        <div class="tag"><?php echo esc_html($reservoir['ReservoirName']); ?></div>
                        <div class="level" data-level="<?php echo esc_attr($reservoir['Value']); ?>"><?php echo esc_html(round($reservoir['Value'], 1)); ?>%</div>
                        <div class="line-divider"></div>
                        <div class="usage">
                            <img src="<?php echo plugin_dir_url(__FILE__) . 'assets/images/water-icon.svg'; ?>" alt="Water Usage Icon" class="water-icon">
                            <?php echo esc_html($reservoir['AverageDailyUse']); ?>L/day
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>

            <!-- SVG Map -->
            <div class="map-container">
                <div class="blue-dot"></div>
                <?php echo file_get_contents(plugin_dir_path(__FILE__) . 'assets/images/map.svg'); ?>
            </div>

        </div>

        <div class="updated-daily">
            ℹ️ Updated Daily
        </div>
    </div>
    <?php
    return ob_get_clean();
}












