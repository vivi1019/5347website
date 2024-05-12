import React, { useEffect, useState } from 'react';
import axios from 'axios'; // 引入 Axios
import './userprofile.css';
const port = 4000;

function UserprofileContributions() {
    const [Userinfo, setUserinfo] = useState([]);
    //const [Loginuser, setLoginuser] = useState([]);
    const [Usercontributions, setUsercontributions] = useState([]);

    //get select user
    useEffect(() => {
        axios.get(`http://localhost:${port}/userprofile/userprofile/reselectuser`) // 使用 Axios 发送 GET 请求
            .then(response => {
                setUserinfo([response.data]); // 将响应数据作为数组的元素设置
            })
            .catch(error => {
                console.error('Error fetching data while getting user info in user profile: ', error);
            });
    }, []);

    /*
    //get login user
    useEffect(() => {
        axios.get(`http://localhost:${port}/homepage/loginuser`) // 获取登入角色
            .then(response => {
                setLoginuser([response.data]); // 将响应数据作为数组的元素设置
            })
            .catch(error => {
                console.error('Error fetching data while getting user info in user profile: ', error);
            });
    }, []);
     */

    //get user contribution
    useEffect(() => {
        axios.get(`http://localhost:${port}/userprofile/contributions`) // 使用 Axios 发送 GET 请求
            .then(response => {
                setUsercontributions(response.data); // 将响应数据作为数组的元素设置
            })
            .catch(error => {
                console.error('Error fetching data while getting user contributions in user profile: ', error);
            });
    }, []);

    //revoke contribution
    function RevokeContribution(id) {
        const selectrevoke = window.confirm('Do you want to revoke this contribution');
        // 如果用户点击了确定按钮
        if (selectrevoke) {
            console.log(id); //测试用，后删除
            axios.post(`http://localhost:${port}/userprofile/contributions/revoke`, { id })
                .then(response => {
                    // Handle response
                    console.log("Revoke successful", response.data);
                    window.location.href = `http://localhost:3000/userprofile/contributions`;
                })
                .catch(error => {
                    console.error('Error sending selected user ID to backend: ', error);
                });
            // 跳转至另一个网站 刷新界面
            window.location.href = `http://localhost:3000/userprofile/contributions`;//前端端口更改需要调整
        }
    }

    return (
        <>
            <div className="userprofile_background"></div>
            <div>返回主页及其他区域按钮预留</div>
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
                                    <th className="userprofile_select"><a href="http://localhost:3000/userprofile/favourite">Favourite Characters</a></th>
                                </tr>
                                <tr>
                                    <th className="userprofile_unselect"><a href="http://localhost:3000/userprofile/comparisons">Comparisons History</a>
                                    </th>
                                </tr>
                                <tr>
                                    <th className="userprofile_unselect">Contributions</th>
                                </tr>
                            </table>
                        </th>
                        <th className="userprofile_right-column">
                            {Usercontributions.length > 0 ? (
                                <table>
                                    {Usercontributions.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item._id}</td>
                                            <td>{item.date}</td>
                                            <td>{item.action}</td>
                                            <td>{item.data.id}</td>
                                            <td>{item.status}</td>
                                            <td>
                                                {item.status !== "Approved" ? ( // 添加判定，登入角色是否为自己时
                                                    <button onClick={() => RevokeContribution(item._id)}>Revoke</button>
                                                ) : (
                                                    <span></span> // 这里是空列的显示，可以用<span></span>或者直接留空
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </table>
                            ) : <p>This user has no contributions.</p>}
                        </th>

                    </tr>
                </table>
            </div>
        </>
    );
}

export default UserprofileContributions;
