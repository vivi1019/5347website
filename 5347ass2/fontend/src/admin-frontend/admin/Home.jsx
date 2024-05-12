import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';

function Home() {
  const [pendingCount, setPendingCount] = useState(0);
  const [totalCharacters, setTotalCharacters] = useState(0);
  const [totalAdmins, setTotalAdmins] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pendingResponse = await axios.get('http://localhost:4000/pending-contributions-count');
        setPendingCount(pendingResponse.data.pendingContributionsCount);

        const charactersResponse = await axios.get('http://localhost:4000/characters/count');
        setTotalCharacters(charactersResponse.data.count);

        const adminsResponse = await axios.get('http://localhost:4000/adminlist/count');
        setTotalAdmins(adminsResponse.data.count);

        const usersResponse = await axios.get('http://localhost:4000/userlist/count');
        setTotalUsers(usersResponse.data.count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h1>DASHBOARD</h1>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>Pending Characters</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1>{pendingCount}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Total Characters</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{totalCharacters}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Total Admins</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{totalAdmins}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3>Total Users</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{totalUsers}</h1>
        </div>
      </div>
    </main>
  );
}

export default Home;
