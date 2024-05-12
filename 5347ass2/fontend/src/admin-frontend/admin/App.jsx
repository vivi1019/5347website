// App.js
import React, { useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Home from './Home';
import ManageUsers from './ManageUsers';
import ManageCharacters from './ManageCharacters';
import ViewHistory from './ViewHistory';

function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  }


  const handlePageChange = (pageName) => {
    setCurrentPage(pageName); // 正确设置当前页面状态
  }

  return (
    <div className='grid-container'>
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
        onPageChange={handlePageChange}
      />
      {/* 根据当前页面状态渲染对应的组件 */}
      {currentPage === 'Home' && <Home />}
      {currentPage === 'ManageUsers' && <ManageUsers />}
      {currentPage === 'ManageCharacters' && <ManageCharacters />}
      {currentPage === 'ViewHistory' && <ViewHistory />}
    </div>
  );
}

export default App;
