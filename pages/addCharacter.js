import React, { useState } from 'react';
import axios from 'axios';

const AddCharacter = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        subtitle: '',
        description: '',
        image_url: '',
        strength: '',
        speed: '',
        skill: '',
        fear_factor: '',
        power: '',
        intelligence: '',
        wealth: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/characters/add', formData);
            alert(response.data.message);
        } catch (error) {
            alert(error.response.data.error);
        }
    };

    return (
        <div style={{ backgroundImage: 'url(/images/background.jpg)', backgroundSize: 'cover', height: '100vh' }}>
            <h1>Add New Character</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="id" placeholder="ID" value={formData.id} onChange={handleChange} required />
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
                <button type="submit">Add Character</button>
            </form>
        </div>
    );
};

export default AddCharacter;
