/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { fetchDouglasWebsiteData } from './integration/data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit() {
    // useState(DEFAULT_VALUE)
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // URLs for static images (localized via pluginAssets in PHP)
    const mapUrl = `${pluginAssets.images}map.svg`;
    const iconUrl = `${pluginAssets.images}water-icon.svg`;

    console.log(mapUrl);

    useEffect(() => {
        fetchDouglasWebsiteData({ mock: true }) // TODO: Set to `false` in production to fetch real data
            .then((result) => {
                setData(result);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    return (
        <div { ...useBlockProps() }>
            <h2 className="reservoirs-title">{__('How full are our reservoirs?', 'reservoirs-levels-widget')}</h2>

            {/* Add the static map */}
            <div className="map-container">
                <img src={mapUrl} alt="Reservoir Map" className="map-image" />
            </div>

            {/* Add the static water icon */}
            <div className="water-icon-container">
                <img src={iconUrl} alt="Water Icon" className="water-icon" />
            </div>

            {/* Display fetched data or error */}
            {error ? (
                <p>{__('Error loading data:', 'reservoirs-levels-widget')} {error}</p>
            ) : (
                data.length > 0 ? (
                    <ul>
                        {data.map((item, index) => (
                            <li key={index}>
                                <strong>{item.Description}:</strong> {item.Value} {item.Units} ({item.DateTime})
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>{__('Loading data...', 'reservoirs-levels-widget')}</p>
                )
            )}
        </div>
    );
}
