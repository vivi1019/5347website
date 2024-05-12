import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteAdmin() {
  const [admins, setAdmins] = useState([]);
  const [selectedAdmins, setSelectedAdmins] = useState([]);

  useEffect(() => {
    // 发送 GET 请求获取管理员列表
    axios.get('http://localhost:4000/admins')
      .then(response => {
        setAdmins(response.data);
      })
      .catch(error => {
        console.error('Error fetching admins:', error);
      });
  }, []);

  const handleCheckboxChange = (adminId) => {
    // 切换选中的管理员状态
    setSelectedAdmins(prevSelectedAdmins => {
      if (prevSelectedAdmins.includes(adminId)) {
        return prevSelectedAdmins.filter(id => id !== adminId); // 如果管理员已经被选中，则移除
      } else {
        return [...prevSelectedAdmins, adminId]; // 如果管理员未被选中，则添加
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await Promise.all(selectedAdmins.map(adminId => axios.delete(`http://localhost:4000/admin/${adminId}`)));
      alert('Selected admins deleted successfully!');
      // 更新管理员列表
      const updatedAdmins = admins.filter(admin => !selectedAdmins.includes(admin._id));
      setAdmins(updatedAdmins);
      // 清空选中的管理员
      setSelectedAdmins([]);
    } catch (error) {
      console.error('Error deleting admins:', error);
      alert('An error occurred while deleting admins.');
    }
  };

  return (
    <div className='main-container'>
      <h1>Delete Admin</h1>
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
            {admins.map(admin => (
              <tr key={admin._id}>
                <td>{admin._id}</td>
                <td>{admin.firstname}</td>
                <td>{admin.lastname}</td>
                <td><input type="checkbox" onChange={() => handleCheckboxChange(admin._id)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="submit">Delete Selected Admins</button>
      </form>
    </div>
  );
}

export default DeleteAdmin;
