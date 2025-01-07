<?php

// Define mock data as an array.
const MOCK_DATA = [
    [
        "TagName" => "WhyanbeelWTP.WHYLT5500_PV1",
        "Units" => "%",
        "Description" => "LT5500 Treated Water Reservoir Level",
        "DateTime" => "2024-12-19T14:06:00.0000000Z",
        "Value" => 85.0437436785017,
    ],
    [
        "TagName" => "MossmanWTP.MOSLT5133_PV1",
        "Units" => "%",
        "Description" => "LT5133 Clearwell Mossman Reservoir Level",
        "DateTime" => "2024-12-20T03:54:00.0000000Z",
        "Value" => 94.9312545157768,
    ],
    [
        "TagName" => "MossmanWTP.MOSLT5132_PV1",
        "Units" => "%",
        "Description" => "LT5132 Clearwell Port Douglas Reservoir Level",
        "DateTime" => "2024-12-20T03:54:15.0000000Z",
        "Value" => 92.8984355926514,
    ],
    [
        "TagName" => "DWTP.DAILT5175_PV1",
        "Units" => "%",
        "Description" => "LT5175 Treated Water Reservoir Level",
        "DateTime" => "2024-12-20T03:54:30.0000000Z",
        "Value" => 89.1531181335449,
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
function fetch_douglas_website_data( $url = 'https://www.odasa.com.au/douglas-website-data', $mock = false ) {
    // Return mock data if the mock flag is true.
    if ( $mock ) {
        return MOCK_DATA;
    }

    // Fetch live data from the API.
    $response = wp_remote_get( $url );

    // Check if the request resulted in an error.
    if ( is_wp_error( $response ) ) {
        throw new Exception( 'Network request failed: ' . $response->get_error_message() );
    }

    // Get the body of the response.
    $body = wp_remote_retrieve_body( $response );

    // Decode the JSON response into a PHP array.
    $data = json_decode( $body, true );

    // Check for JSON parsing errors.
    if ( json_last_error() !== JSON_ERROR_NONE ) {
        throw new Exception( 'Failed to parse JSON response: ' . json_last_error_msg() );
    }

    return $data;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 */
function create_block_reservoir_levels_widget_block_init() {
    register_block_type( __DIR__ . '/build', array(
        'render_callback' => 'render_reservoir_levels_widget',
    ) );
}
add_action( 'init', 'create_block_reservoir_levels_widget_block_init' );


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
            false // Set to true to use mock data for testing.
        );
    } catch (Exception $e) {
        return '<p>Error fetching reservoir data: ' . esc_html($e->getMessage()) . '</p>';
    }

    // Calculate the total reservoir level.
    $total_level = 0;
    $reservoir_count = count($reservoirs);
    foreach ($reservoirs as $reservoir) {
        $total_level += $reservoir['Value'];
    }
    $average_level = $reservoir_count > 0 ? round($total_level / $reservoir_count, 1) : 0;

    ob_start();
    ?>
    <div class="reservoir-widget">
        <h2>How full are our reservoirs?</h2>
        <div class="reservoir-details">
            
            <!-- Total Reservoir Level -->
            <div class="reservoir total-reservoir">
                <h3>Total Reservoir Level</h3>
                <div class="level"><?php echo esc_html($average_level); ?>%</div>
            </div>

            <!-- Column 2: First Two Reservoirs -->
            <div class="reservoir-column">
                <?php foreach (array_slice($reservoirs, 0, 2) as $reservoir): ?>
                    <div class="reservoir">
                        <h3><?php echo esc_html($reservoir['Description']); ?></h3>
                        <div class="level"><?php echo esc_html(round($reservoir['Value'], 1)); ?>%</div>
                        <div class="tag"><?php echo esc_html($reservoir['TagName']); ?></div>
                    </div>
                <?php endforeach; ?>
            </div>

            <!-- Column 3: Last Two Reservoirs -->
            <div class="reservoir-column">
                <?php foreach (array_slice($reservoirs, 2) as $reservoir): ?>
                    <div class="reservoir">
                        <h3><?php echo esc_html($reservoir['Description']); ?></h3>
                        <div class="level"><?php echo esc_html(round($reservoir['Value'], 1)); ?>%</div>
                        <div class="tag"><?php echo esc_html($reservoir['TagName']); ?></div>
                    </div>
                <?php endforeach; ?>
            </div>

            <!-- Column 4: Empty -->
            <!-- SVG Map -->
            <div class="map-container">
                <?php echo file_get_contents(plugin_dir_path(__FILE__) . 'assets/images/map.svg'); ?>
            </div>

        </div>
    </div>
    <?php
    return ob_get_clean();
}










