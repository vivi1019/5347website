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
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // 检查必填字段
        const requiredFields = [
            'id', 'name', 'subtitle', 'description', 'image_url',
            'strength', 'speed', 'skill', 'fear_factor',
            'power', 'intelligence', 'wealth'
        ];
        for (let field of requiredFields) {
            if (!formData[field]) {
                setError(`The field '${field}' is required`);
                return;
            }
        }

        try {
            const response = await axios.post('http://localhost:4000/api/characters/add', formData);
            alert(response.data.message);
            setError(null); // 清除错误信息
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <div style={{
                backgroundImage: 'url(/images/background.jpg)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(8px)', // 背景虚化效果
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: -1 // 背景层在下
            }}></div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
            }}>
                <div style={{
                    background: 'rgba(255, 255, 255, 0.8)', // 半透明白色背景
                    padding: '20px',
                    borderRadius: '10px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // 添加阴影效果
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h1>Add New Character</h1>
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
            </div>
        </div>
    );
};

export default AddCharacter;
