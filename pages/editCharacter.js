import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const EditCharacter = () => {
    const router = useRouter();
    const { id } = router.query;

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

    useEffect(() => {
        console.log('Router query ID:', id); // Debug log to confirm id
        if (id) {
            const url = `/api/characters/${id}`;
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
            const response = await axios.put(`/api/characters/${id}`, formData);
            console.log(response.data.message);
            // Redirect to character page or display success message
        } catch (error) {
            console.error('Error updating character:', error);
        }
    };

    return (
        <div style={{ backgroundImage: 'url(/images/background.jpg)', backgroundSize: 'cover', height: '100vh' }}>
            <h1>Edit Character</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                <input type="text" name="subtitle" placeholder="Subtitle" value={formData.subtitle} onChange={handleChange} required />
                <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
                <input type="text" name="image_url" placeholder="Image URL" value={formData.image_url} onChange={handleChange} required />
                <input type="number" name="strength" placeholder="Strength" value={formData.strength} onChange={handleChange} required />
                <input type="number" name="speed" placeholder="Speed" value={formData.speed} onChange={handleChange} required />
                <input type="number" name="skill" placeholder="Skill" value={formData.skill} onChange={handleChange} required />
                <input type="number" name="fear_factor" placeholder="Fear Factor" value={formData.fear_factor} onChange={handleChange} required />
                <input type="number" name="power" placeholder="Power" value={formData.power} onChange={handleChange} required />
                <input type="number" name="intelligence" placeholder="Intelligence" value={formData.intelligence} onChange={handleChange} required />
                <input type="number" name="wealth" placeholder="Wealth" value={formData.wealth} onChange={handleChange} required />
                <button type="submit">Edit Character</button>
            </form>
        </div>
    );
};

export default EditCharacter;
