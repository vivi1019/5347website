import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DeleteCharacterPage() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    // 在组件加载时发送请求获取角色列表信息
    axios.get('http://localhost:4000/characters')
      .then(response => {
        setCharacters(response.data); // 将角色列表信息存储到状态中
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
      });
  }, []); // 空数组作为依赖，表示只在组件加载时发送一次请求

  const handleDelete = (name) => {
    // 处理 delete character 按钮的点击事件
    // 发送请求删除对应的角色
  };

  return (
    <div className='main-container'>
      <h1>Delete Character Page</h1>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'left' }}>Name</th>
            <th style={{ textAlign: 'left' }}>Subtitle</th>
            <th style={{ textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {characters.map(character => (
            <tr key={character.name}>
              <td style={{ textAlign: 'left' }}>{character.name}</td>
              <td style={{ textAlign: 'left' }}>{character.subtitle}</td>
              <td style={{ textAlign: 'left' }}>
                <button className="reject-btn" onClick={() => handleDelete(character.name)}>Delete Character</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DeleteCharacterPage;
