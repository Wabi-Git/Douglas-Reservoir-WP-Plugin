/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss'; // Import custom styles
import { fetchDouglasWebsiteData } from './integration/data';

export default function Edit() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    // Fetch data on load
    useEffect(() => {
        fetchDouglasWebsiteData({ mock: true }) // Change to false for real API
            .then((result) => {
                setData(result);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    // Get image paths from localized `pluginAssets`
    const mapSvg = pluginAssets.images + 'map.svg';
    const waterIconSvg = pluginAssets.images + 'water-icon.svg';

    // Render the layout
    return (
        <div {...useBlockProps()}>
            <div className="reservoir-widget">
                <h2>{__('How full are our reservoirs?', 'reservoirs-levels-widget')}</h2>

                {/* Main stats block */}
                <div className="reservoir-main-stats">
                    <div className="main-stat">
                        <p className="percentage">72.5%</p>
                        <p className="change-week">-0.9% change since last week</p>
                        <div className="daily-use">
                            <img src={waterIconSvg} alt="Water Icon" className="water-icon" />
                            <p className="daily-use-value">160L</p>
                            <p className="change-month">-0.9% change since last month</p>
                            <p className="label">Average daily use per person</p>
                        </div>
                    </div>
                </div>

                {/* Individual reservoirs block */}
                <div className="reservoir-stats-grid">
                    {data.map((item, index) => (
                        <div key={index} className="reservoir-stat">
                            <div className="stat-bar">
                                <div
                                    className="stat-fill"
                                    style={{ height: `${item.Value}%` }}
                                ></div>
                                <p className="percentage">{item.Value}%</p>
                            </div>
                            <p className="location">{item.Description}</p>
                            <div className="daily-usage">
                                <img src={waterIconSvg} alt="Water Icon" className="water-icon-small" />
                                <p>{item.Units}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Map */}
                <div className="reservoir-map">
                    <img src={mapSvg} alt="Reservoir Map" className="map-image" />
                </div>

                {/* Footer */}
                <p className="footer-note">{__('Updated Daily', 'reservoirs-levels-widget')}</p>
            </div>
        </div>
    );
}
