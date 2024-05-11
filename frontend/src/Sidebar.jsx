// Sidebar.js
import React from 'react';
import { BsGrid1X2Fill, BsPeopleFill, BsMenuButtonWideFill } from 'react-icons/bs';
import { MdHistory } from 'react-icons/md';
import adminIcon from "../assets/adminIcon.png";

function Sidebar({ openSidebarToggle, OpenSidebar, onPageChange }) {
  const handlePageClick = (pageName) => {
    onPageChange(pageName); // 正确调用 onPageChange 函数
    OpenSidebar();
  }

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
      <div className='sidebar-title'>
        <div className='sidebar-brand'>
          <img src={adminIcon} alt="Admin Icon" className='icon_header' />
        </div>
        <span className='icon close_icon' onClick={OpenSidebar}>X</span>
      </div>

      <ul className='sidebar-list'>
        <li className='sidebar-list-item' onClick={() => handlePageClick('Home')}>
          <a href="#">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </a>
        </li>

        <li className='sidebar-list-item' onClick={() => handlePageClick('ManageUsers')}>
          <a href="#">
            <BsPeopleFill className='icon' /> Manage Users
          </a>
        </li>

        <li className='sidebar-list-item' onClick={() => handlePageClick('ManageCharacters')}>
          <a href="#">
            <BsMenuButtonWideFill className='icon' /> Manage Characters
          </a>
        </li>

        <li className='sidebar-list-item' onClick={() => handlePageClick('ViewHistory')}>
          <a href="#">
            <MdHistory style={{ fontSize: '26px' }} className='icon_history' />View History
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
