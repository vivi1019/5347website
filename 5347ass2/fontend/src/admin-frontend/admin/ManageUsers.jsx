import React, { useState } from 'react';
import AddAdmin from './AddAdmin'; // 导入 AddAdmin 组件
import DeleteAdmin from './DeleteAdmin'; // 导入 DeleteAdmin 组件
import './App.css';
function ManageUsers() {
  const [currentPage, setCurrentPage] = useState('ManageUsers');

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  }

  return (
    <div className='main-container'>
      <h1>Manage Users</h1>
      <div className='admin_button'>
        <button className='add-button' onClick={() => handlePageChange('AddAdmin')}>Add Admin</button>
        <button className='delete-button' onClick={() => handlePageChange('DeleteAdmin')}>Delete Admin</button>
      </div>

      {/* 根据当前页面状态渲染对应的组件 */}
      {currentPage === 'ManageUsers' && (
        <>
          {/* 在这里编写“Manage Users”界面的内容 */}
        </>
      )}
      {currentPage === 'AddAdmin' && <AddAdmin />}
      {currentPage === 'DeleteAdmin' && <DeleteAdmin />}
    </div>
  );
}

export default ManageUsers;
