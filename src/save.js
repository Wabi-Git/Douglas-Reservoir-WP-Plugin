/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 */
import { useBlockProps } from '@wordpress/block-editor';
import { StaticReservoirLevels } from './components/ReservoirLevels';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @return {Element} Element to render.
 */
export default function save() {
    const blockProps = useBlockProps.save();
    return (
        <p { ...blockProps }>
            StaticReservoirLevels();
        </p>
    );
}