// ManageCharacters.js
import React, { useState } from 'react';
import PendingCharacterPage from './PendingCharacterPage';
import DeleteCharacterPage from './DeleteCharacterPage';
import './App.css';
function ManageCharacters() {
  const [showPendingPage, setShowPendingPage] = useState(false);
  const [showDeletePage, setShowDeletePage] = useState(false);

  const handlePendingButtonClick = () => {
    setShowPendingPage(true);
    setShowDeletePage(false);
  };

  const handleDeleteButtonClick = () => {
    setShowPendingPage(false);
    setShowDeletePage(true);
  };

  return (
    <div className='main-container'>
      <h1>Manage Characters</h1>
      <div className='button-container'>
        {/* 切换到 "Pending Character" 页面 */}
        <button className='add-button' onClick={handlePendingButtonClick}>Pending Character</button>
        {/* 切换到 "Delete Character" 页面 */}
        <button className='delete-button' onClick={handleDeleteButtonClick}>Delete Character</button>
      </div>
      {/* 根据状态渲染相应的页面 */}
      {showPendingPage && <PendingCharacterPage />}
      {showDeletePage && <DeleteCharacterPage />}
    </div>
  );
}

export default ManageCharacters;
