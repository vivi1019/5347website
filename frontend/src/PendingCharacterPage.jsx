import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // 导入自定义的 CSS 样式文件

function PendingCharacterPage() {
  const [pendingContributions, setPendingContributions] = useState([]);

  useEffect(() => {
    // 在组件加载时发送请求获取待处理角色信息
    axios.get('http://localhost:4000/contributions/Pending')
      .then(response => {
        setPendingContributions(response.data); // 将待处理角色信息存储到状态中
      })
      .catch(error => {
        console.error('Error fetching pending contributions:', error);
      });
  }, []); // 空数组作为依赖，表示只在组件加载时发送一次请求

  const handleApprove = (id) => {
    // 处理 approve 按钮的点击事件
    // 发送请求将该条记录标记为已通过
  };

  const handleReject = (id) => {
    // 处理 reject 按钮的点击事件
    // 发送请求将该条记录标记为已拒绝
  };

  return (
    <div className='main-container'>
      <h1>Pending Character Page</h1>
      <table>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Action</th>
            <th>Date</th>
            <th>Data</th>
            <th>Review</th>
          </tr>
        </thead>
        <tbody>
          {pendingContributions.map(contribution => (
            <tr key={contribution._id}>
              <td className="table-cell">{contribution.user_id._id}</td>
              <td className="table-cell">{contribution.action}</td>
              <td className="table-cell">{contribution.date}</td>
              <td className="table-cell">
                <ul>
                  {Object.entries(contribution.data).map(([key, value]) => (
                    <li key={key}>
                      <strong>{key}:</strong> {value}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="table-cell">
                <button className="approve-btn" onClick={() => handleApprove(contribution._id)}>Approve</button>
                <button className="reject-btn" onClick={() => handleReject(contribution._id)}>Reject</button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PendingCharacterPage;
