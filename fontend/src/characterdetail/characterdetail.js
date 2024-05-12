import React, { useEffect, useState } from 'react';
import axios from 'axios'; // 引入 Axios
import './characterdetail.css';
const port = 4000;

function Characterdetail() {
    const [Charinfo, setCharinfo] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:${port}/characterdetail/characterdetail/charinfo`) // 使用 Axios 发送 GET 请求
            .then(response => {
                setCharinfo(response.data); // 将响应数据设置为用户信息
            })
            .catch(error => {
                console.error('Error fetching data while getting char info in character detail: ', error);
            });
    }, []);

    //向后端传递选择char的信息
    function ChoseChar(id, name, subtitle, description, image_url, strength, speed, skill, fear_factor, intelligence, wealth) {
        const selectchar = window.confirm('Do you want to view detail');
        // 如果用户点击了确定按钮
        if (selectchar) {
            axios.get(`http://localhost:${port}/characterdetail/characterdetail/selectchar`, { params: { id, name, subtitle, description, image_url, strength, speed, skill, fear_factor, intelligence, wealth } }) // 将ID作为参数传递给后端
                .then(response => {
                    // 处理后端响应
                    console.log("Backend response:", response.data);
                    // 在这里你可以根据后端的响应做一些操作
                })
                .catch(error => {
                    console.error('Error sending selected char ID to backend: ', error);
                });
            // 跳转至另一个网站
            window.location.href = `http://localhost:3000/characterdetail/viewdetail`;//前端端口更改需要调整
        }
    }

    function AddLike(id) {
        const selectlike = window.confirm('Do you want to add '+id+' into favourite character');
        // 如果用户点击了确定按钮
        if (selectlike) {
            axios.post(`http://localhost:${port}/characterdetail/characterdetail/like`, { id })
                .then(response => {
                    // Handle response
                    console.log("Add successful", response.data);
                    window.location.href = `http://localhost:3000/characterdetail/characterdetail`;
                })
                .catch(error => {
                    console.error('Error add favourite character to backend: ', error);
                });
        }
    }


    function RemoveLike(id) {
        const selectremove = window.confirm('Do you want to remove '+id+' out favourite character');
        // 如果用户点击了确定按钮
        if (selectremove) {
            axios.post(`http://localhost:${port}/characterdetail/characterdetail/remove`, { id })
                .then(response => {
                    // Handle response
                    console.log("Remove successful", response.data);
                    window.location.href = `http://localhost:3000/characterdetail/characterdetail`;
                })
                .catch(error => {
                    console.error('Error remove favourite character to backend: ', error);
                });
        }
    }


    return (
        <>
            <div className="characterdetail_background"></div>
            <div>返回主页及其他区域按钮预留</div>
            <div className="characterdetail_header">
                <h1>User Profile</h1>
            </div>
            <div>
                <h3 className="characterdetail_text">Choose a char to view detail or add like</h3>
            </div>
            {Charinfo.length > 0 ? (
                <table className="characterdetail_outputarea">
                    {Charinfo.map((item, index) => (
                        <tr key={index}>
                            <td className="characterdetail_image"><img src={`assets/${item.image_url}`}
                                                                       alt={item.name}/></td>
                            <td>{item.name}</td>
                            <td>
                                <button
                                    onClick={() => ChoseChar(item.id, item.name, item.subtitle, item.description, item.image_url, item.strength, item.speed, item.skill, item.fear_factor, item.intelligence, item.wealth)}>View
                                </button>
                                <button onClick={() => AddLike(item.id)}>Add Like</button>
                                <button onClick={() => RemoveLike(item.id)}>Remove Like</button>
                            </td>
                        </tr>
                    ))}
                </table>
            ) : <p>There no char.</p>}
        </>
    );
}

export default Characterdetail;
