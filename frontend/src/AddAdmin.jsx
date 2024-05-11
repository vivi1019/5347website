import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddAdmin() {
  const [users, setUsers] = useState([]); // 存储从后端获取的用户列表
  const [selectedUsers, setSelectedUsers] = useState([]); // 存储选中的用户ID

  useEffect(() => {
    // 发送 GET 请求获取用户列表
    axios.get('http://localhost:4000/users')
      .then(response => {
        setUsers(response.data); // 将用户列表存储到状态中
      })
      .catch(error => {
        console.error('Error fetching users:', error);
      });
  }, []); // 空数组作为依赖，表示只在组件加载时发送一次请求

  const handleCheckboxChange = (userId) => {
    // 切换选中的用户状态
    setSelectedUsers(prevSelectedUsers => {
      if (prevSelectedUsers.includes(userId)) {
        return prevSelectedUsers.filter(id => id !== userId); // 如果用户已经被选中，则移除
      } else {
        return [...prevSelectedUsers, userId]; // 如果用户未被选中，则添加
      }
    });
  };
  console.log('Selected users:', selectedUsers);
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await Promise.all(selectedUsers.map(userId => axios.post(`http://localhost:4000/admin/add/${userId}`)));
      // 异步操作执行完成后打印选中的用户 ID
      console.log('Selected users:', selectedUsers);
      alert('Selected users added to admin list successfully!');
    } catch (error) {
      console.error('Error adding users to admin list:', error);
      alert('An error occurred while adding users to admin list.');
    }
  };



  return (
    <div className='main-container'>
      <h1>Add Admin</h1>
      <form onSubmit={handleSubmit}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Select</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td><input type="checkbox" onChange={() => handleCheckboxChange(user._id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Add Selected Users to Admin</button>
      </form>
    </div>
  );
}

export default AddAdmin;
