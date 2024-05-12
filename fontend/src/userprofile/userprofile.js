import React, { useEffect, useState } from 'react';
import axios from 'axios'; // 引入 Axios
import './userprofile.css';
const port = 4000;

function Userprofile() {
    const [Userinfo, setUserinfo] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:${port}/userprofile/userprofile/userinfo`) // 使用 Axios 发送 GET 请求
            .then(response => {
                setUserinfo(response.data); // 将响应数据设置为用户信息
            })
            .catch(error => {
                console.error('Error fetching data while getting user info in user profile: ', error);
            });
    }, []);

    function ChoseUser(id, firstname, lastname) {
        const selectwindox = window.confirm('Do you want to view '+firstname+' '+lastname+' profile');
        // 如果用户点击了确定按钮
        if (selectwindox) {
            axios.get(`http://localhost:${port}/userprofile/userprofile/selectuser`, { params: { id, firstname, lastname } }) // 将ID作为参数传递给后端
                .then(response => {
                    // 处理后端响应
                    console.log("Backend response:", response.data);
                    // 在这里你可以根据后端的响应做一些操作
                })
                .catch(error => {
                    console.error('Error sending selected user ID to backend: ', error);
                });
            // 跳转至另一个网站
            window.location.href = `http://localhost:3000/userprofile/favourite`;//前端端口更改需要调整
        }
    }

    return (
        <>
            <div className="userprofile_background"></div>
            <div>返回主页及其他区域按钮预留</div>
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
