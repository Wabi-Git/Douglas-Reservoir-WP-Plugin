/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

import { fetchDouglasWebsiteData } from '../integration/data';


export function ReservoirLevels() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch data (mocked or real based on the parameter)
        fetchDouglasWebsiteData({ mock: true })
            .then((result) => {
                setAttributes({ data: result });
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Get image paths from localized `pluginAssets`
    const mapSvg = pluginAssets.images + 'map.svg';
    const waterIconSvg = pluginAssets.images + 'water-icon.svg';

    // Render the layout
    return (
        <div {...useBlockProps()}>
            <h2>{__('Reservoir Levels Widget', 'reservoirs-levels-widget')}</h2>
            {loading ? (
                <p>{__('Loading data...', 'reservoirs-levels-widget')}</p>
            ) : error ? (
                <p>{__('Error: ', 'reservoirs-levels-widget')}{error}</p>
            ) : (
                <ul>
                    {data.map((item, index) => (
                        <li key={index}>
                            <strong>{item.Description}:</strong> {item.Value} {item.Units} ({item.DateTime})
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

