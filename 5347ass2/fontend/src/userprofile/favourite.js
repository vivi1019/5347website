import React, { useEffect, useState } from 'react';
import axios from 'axios'; // import Axios
import './userprofile.css';
const port = 4000;


function UserprofileComparisons() {
    const [Userinfo, setUserinfo] = useState([]);
    const [Userfavourchar, setUserfavourchar] = useState([]);

    // get select user info
    useEffect(() => {
        axios.get(`http://localhost:${port}/userprofile/userprofile/reselectuser`)
            .then(response => {
                setUserinfo([response.data]); // 将响应数据作为数组的元素设置
            })
            .catch(error => {
                console.error('Error fetching data while getting user info in user profile: ', error);
            });
    }, []);

    // get user favourite info
    useEffect(() => {
        axios.get(`http://localhost:${port}/userprofile/favourite`)
            .then(response => {
                setUserfavourchar(response.data);
            })
            .catch(error => {
                console.error('Error fetching data while getting user info in user profile: ', error);
            });
    }, []);

    return (
        <>
            <div className="userprofile_background"></div>
            <div>area for bottom</div>
            <div className="userprofile_header">
                <h1>User Profile</h1>
            </div>
            {Userinfo.map((item, index) => (
                <div key={index} className="userprofile_userinfo">
                    <p>Dear user: {item.firstname} {item.lastname}</p>
                </div>
            ))}
            <div>
                <table className="userprofile_table">
                    <tr>
                        <th className="userprofile_left-column">
                            <table className="userprofile_table">
                                <tr>
                                    <th className="userprofile_unselect"><a href="http://localhost:3000/userprofile/userprofile">Chose Users</a></th>
                                </tr>
                                <tr>
                                    <th className="userprofile_select">Favourite Characters</th>
                                </tr>
                                <tr>
                                    <th className="userprofile_unselect"><a href="http://localhost:3000/userprofile/comparisons">Comparisons History</a></th>
                                </tr>
                                <tr>
                                    <th className="userprofile_unselect"><a href="http://localhost:3000/userprofile/contributions">Contributions</a></th>
                                </tr>
                            </table>
                        </th>
                        <th className="userprofile_right-column">
                            {Userfavourchar.length > 0 ? Userfavourchar.map((item, index) => (
                                <p key={index}>{item.characters}</p>
                            )) : <p>This user has no favourite character.</p>}
                        </th>
                    </tr>
                </table>
            </div>
        </>
    );
}

export default UserprofileComparisons;
