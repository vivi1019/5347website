import React, { useEffect, useState } from 'react';
import axios from 'axios'; // 引入 Axios
import './userprofile.css';
const port = 4000;

//需要根据本地的比较历史列表来进行更改
function UserprofileComparisons() {
    const [Userinfo, setUserinfo] = useState([]);
    //const [Usercomparisons, setUsercomparisons] = useState([]); //设置历史记录

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
    //获取历史记录
    useEffect(() => {
        axios.get(`http://localhost:${port}/homepage/history`) // 使用 路由路径填写存放历史的端口
            .then(response => {
                setUsercomparisons([response.data]); // 将响应数据作为数组的元素设置
            })
            .catch(error => {
                console.error('Error fetching data while getting user info in user profile: ', error);
            });
    }, []);
     */

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
                                    <th className="userprofile_unselect">>Comparisons History</th>
                                </tr>
                                <tr>
                                    <th className="userprofile_unselect"><a href="http://localhost:3000/userprofile/contributions">Contributions</a></th>
                                </tr>
                            </table>
                        </th>
                        <th>
                            <p>比较历史生成区域</p>
                        </th>
                    </tr>
                </table>
            </div>
        </>
    );
}

export default UserprofileComparisons;
