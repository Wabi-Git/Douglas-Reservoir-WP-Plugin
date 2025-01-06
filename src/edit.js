/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 */
import { useBlockProps } from '@wordpress/block-editor';
import './editor.scss';
import { ReservoirLevels } from './components/ReservoirLevels';

/**
 * The edit function renders the block in the editor.
 *
 * @return {Element} Element to render.
 */
export default function edit() {
    const blockProps = useBlockProps();
    return (
        <p { ...blockProps }>
            Reservoir Levels Widget - edit mode content!
        </p>
    );
}