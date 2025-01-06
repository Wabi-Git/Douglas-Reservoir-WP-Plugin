import React, { useEffect, useState } from 'react';
import { fetchDouglasWebsiteData } from '../integration/data';

export function ReservoirLevels() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDouglasWebsiteData({ mock: true }) // Change `mock: true` to `false` for live API.
            .then((result) => {
                setData(result);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading reservoir levels...</p>;
    }

    if (error) {
        return <p>Error fetching data: {error.message}</p>;
    }

    return (
        <ul>
            {data.map((item, index) => (
                <li key={index}>
                    {item.Description}: {item.Value} {item.Units}
                </li>
            ))}
        </ul>
    );
    
}

export const StaticReservoirLevels = () => {
    return [
        {
            name: "Reservoir 1",
            level: 80, // Static level data
            capacity: 100,
        },
        {
            name: "Reservoir 2",
            level: 60,
            capacity: 80,
        },
        // Add more reservoirs as needed
    ];
};
