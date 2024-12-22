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
    // ??? Reset that hardcoded database to an empth array []
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDouglasWebsiteData({mock: true}) // ??? TODO: Set to `false` in production to fetch real data
            .then((result) => {
                setData(result);
            })
            .catch((err) => {
                setError(err.message);
            });
    }, []);

    return (
        <div { ...useBlockProps() }>
            <p>{ __('Reservoirs Levels Widget', 'reservoirs-levels-widget') }</p>
            {error ? (
                <p>{ __('Error loading data:', 'reservoirs-levels-widget') } {error}</p>
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
                    <p>{ __('Loading data...', 'reservoirs-levels-widget') }</p>
                )
            )}
        </div>
    );
}
