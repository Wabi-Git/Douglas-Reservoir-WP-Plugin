// /**
//  * React hook that is used to mark the block wrapper element.
//  * It provides all the necessary props like the class name.
//  */
// import { useBlockProps } from '@wordpress/block-editor';
// import './editor.scss';
// import { ReservoirLevels } from './components/ReservoirLevels';

// /**
//  * The edit function renders the block in the editor.
//  *
//  * @return {Element} Element to render.
//  */
// export default function edit() {
//     const blockProps = useBlockProps();
//     return (
//         <p { ...blockProps }>
//             Reservoir Levels Widget - edit mode content!
//         </p>
//     );
// }


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 */
import { useBlockProps } from '@wordpress/block-editor';

export default function Edit({ attributes }) {
    const blockProps = useBlockProps();

    const reservoirs = [
        { name: 'Port Douglas', level: 69, dailyUsage: 161 },
        { name: 'Mossman', level: 44, dailyUsage: 156 },
        { name: 'Whyanbeel', level: 96, dailyUsage: 163 },
        { name: 'Daintree', level: 88, dailyUsage: 160 },
    ];

    return (
        <div { ...blockProps } className="reservoir-widget">
            <h2>How full are our reservoirs?</h2>
            <div className="reservoir-average">
                <span className="average-percent">{attributes.average || '72.5'}%</span>
                <span className="average-change">{attributes.averageChange || '-0.9'}% change since last week</span>
                <span className="daily-usage">Average daily use per person: {attributes.dailyUsagePerPerson || '160'}L</span>
            </div>
            <div className="reservoir-details">
                {reservoirs.map((reservoir, index) => (
                    <div key={index} className="reservoir">
                        <h3>{reservoir.name}</h3>
                        <div className="level">{reservoir.level}%</div>
                        <div className="usage">{reservoir.dailyUsage}L</div>
                    </div>
                ))}
            </div>
        </div>
    );
}
