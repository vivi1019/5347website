import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './characterdetail.css';
const port = 4000;

function ViewCharacterdetail() {
    const [Charinfo, setCharinfo] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:${port}/characterdetail/characterdetail/reselectchar`)
            .then(response => {
                setCharinfo([response.data]);
            })
            .catch(error => {
                console.error('Error fetching data while getting char info in character detail: ', error);
            });
    }, []);

    return (
        <>
            <div className="characterdetail_background"></div>
            <div className="characterdetail_header">
                <h1>User Profile</h1>
            </div>
            <div>
                <h3 className="characterdetail_text">Character details</h3>
            </div>
            {Charinfo.length > 0 ? (
                <table>
                    {Charinfo.map((item, index) => (
                        <tr key={index}>
                            <table className="characterdetail_outputarea">
                                <tr className="characterdetail_image"><img src={`assets/${item.image_url}`} alt={item.name}/></tr>
                                <tr>Contribution by: {item.id}</tr>
                                <tr>Name: {item.name}</tr>
                                <tr>Subtitle: {item.subtitle}</tr>
                                <tr>Description: {item.description}</tr>
                                <tr>Strength: {item.strength}</tr>
                                <tr>Speed: {item.speed}</tr>
                                <tr>Skill: {item.skill}</tr>
                                <tr>Fear factor: {item.fear_factor}</tr>
                                <tr>Intelligence: {item.intelligence}</tr>
                                <tr>Wealth: {item.wealth}</tr>
                                <tr>
                                    <a href="http://localhost:3000/characterdetail/characterdetail">
                                        <button>Back</button>
                                    </a>
                                </tr>
                            </table>
                        </tr>
                    ))}
                </table>
            ) : <p>There no char.</p>}
        </>
    );
}

export default ViewCharacterdetail;


