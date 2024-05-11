import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

const HomePage = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5001/api/characters') // 确保路径正确
            .then(response => setCharacters(response.data))
            .catch(error => console.error('Error fetching characters:', error));
    }, []);

    return (
        <div>
            <h1>Character List</h1>
            <ul>
                {characters.map(character => (
                    <li key={character.id}>
                        <Link href={`/editCharacter?id=${character.id}`}>
                            {character.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
