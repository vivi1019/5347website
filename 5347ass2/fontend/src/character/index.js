import React, { useEffect, useState } from 'react';
import axios from 'axios';

const HomePage = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:4000/api/characters') // Ensure the path is correct
            .then(response => setCharacters(response.data))
            .catch(error => console.error('Error fetching characters:', error));
    }, []);

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <div style={{
                backgroundImage: 'url(/images/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)', // Background blur effect
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1 // Background layer at the bottom
            }}></div>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                zIndex: 1 // Content layer on top
            }}>
                <nav style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.8)', // Translucent white background
                    padding: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adding shadow effect
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <a href="/" style={{ margin: '0 15px' }}>Home</a>
                    <a href="/addCharacter" style={{ margin: '0 15px' }}>Add Character</a>
                    {/* Add more navigation links */}
                </nav>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.8)', // Translucent white background
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Adding shadow effect
                    textAlign: 'center'
                }}>
                    <h1>Character List</h1>
                    <ul style={{ listStyleType: 'none', padding: 0 }}>
                        {characters.map(character => (
                            <li key={character.id} style={{ margin: '10px 0' }}>
                                <a href={`/editCharacter?id=${character.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                    {character.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
