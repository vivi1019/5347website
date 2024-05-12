import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditCharacter = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get('id');

    const [formData, setFormData] = useState({
        name: '',
        subtitle: '',
        description: '',
        image_url: '',
        strength: 0,
        speed: 0,
        skill: 0,
        fear_factor: 0,
        power: 0,
        intelligence: 0,
        wealth: 0
    });

    const [selectedFields, setSelectedFields] = useState([]);

    useEffect(() => {
        console.log('Router query ID:', id); // Debug log to confirm id
        if (id) {
            const url = `http://localhost:4000/api/characters/${id}`;
            console.log('Fetching character data from:', url); // Debug log to confirm URL
            axios.get(url)
                .then(response => {
                    console.log('Fetched character data:', response.data); // Debug log to confirm fetched data
                    setFormData({ ...response.data, id });
                })
                .catch(error => {
                    console.error('Error fetching character data:', error);
                });
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:4000/api/characters/${id}`, formData);
            console.log(response.data.message);
            // Redirect to character page or display success message
        } catch (error) {
            console.error('Error updating character:', error);
        }
    };

    const handleFieldSelect = (field) => {
        if (selectedFields.includes(field)) {
            setSelectedFields(selectedFields.filter(f => f !== field));
        } else {
            setSelectedFields([...selectedFields, field]);
        }
    };

    const fields = [
        'name', 'subtitle', 'description', 'image_url', 'strength',
        'speed', 'skill', 'fear_factor', 'power', 'intelligence', 'wealth'
    ];

    return (
        <div style={{
            position: 'relative',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <div style={{
                backgroundImage: 'url(/images/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1
            }}></div>
            <div style={{
                background: 'rgba(255, 255, 255, 0.8)',
                padding: '20px',
                borderRadius: '10px',
                zIndex: 1
            }}>
                <h1>Edit Character</h1>
                <form onSubmit={handleSubmit}>
                    {fields.map(field => (
                        <div key={field}>
                            <label>
                                <input
                                    type="checkbox"
                                    onChange={() => handleFieldSelect(field)}
                                /> {field}
                            </label>
                            {selectedFields.includes(field) && (
                                <>
                                    {field !== 'description' ? (
                                        <input
                                            type={field === 'image_url' ? 'text' : 'number'}
                                            name={field}
                                            placeholder={field}
                                            value={formData[field] || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                    ) : (
                                        <textarea
                                            name={field}
                                            placeholder={field}
                                            value={formData[field] || ''}
                                            onChange={handleChange}
                                            required
                                        />
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                    <button type="submit">Edit Character</button>
                </form>
            </div>
        </div>
    );
};

export default EditCharacter;
