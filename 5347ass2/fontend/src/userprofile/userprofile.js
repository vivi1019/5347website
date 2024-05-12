import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userprofile.css';
const port = 4000;

function Userprofile() {
    const [Userinfo, setUserinfo] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:${port}/userprofile/userprofile/userinfo`)
            .then(response => {
                setUserinfo(response.data);
            })
            .catch(error => {
                console.error('Error fetching data while getting user info in user profile: ', error);
            });
    }, []);

    function ChoseUser(id, firstname, lastname) {
        const selectwindox = window.confirm('Do you want to view '+firstname+' '+lastname+' profile');
        // click
        if (selectwindox) {
            axios.get(`http://localhost:${port}/userprofile/userprofile/selectuser`, { params: { id, firstname, lastname } }) // 将ID作为参数传递给后端
                .then(response => {
                    // to backend
                    console.log("Backend response:", response.data);
                })
                .catch(error => {
                    console.error('Error sending selected user ID to backend: ', error);
                });
            // to user favourite
            window.location.href = `http://localhost:3000/userprofile/favourite`;// fontend port can change
        }
    }

    return (
        <>
            <div className="userprofile_background"></div>
            <div className="userprofile_header">
                <h1>User Profile</h1>
            </div>
            <div>
                <h3>Choose a user to view profile</h3>
            </div>
            {Userinfo.length > 0 ? (
                <table>
                    {Userinfo.map((item, index) => (
                        <tr key={index}>
                            <td>{item.firstname}</td>
                            <td>{item.lastname}</td>
                            <td>
                                <button onClick={() => ChoseUser(item._id, item.firstname, item.lastname)}>View</button>
                            </td>
                        </tr>
                    ))}
                </table>
            ) : <p>There no user.</p>}
        </>
    );
}

export default Userprofile;
