/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import './editor.scss'; // Import custom styles

import { ReservoirLevels } from './components/ReservoirLevels'


export default function Edit() {
    return ReservoirLevels();
}
