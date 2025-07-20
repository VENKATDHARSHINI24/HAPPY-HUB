import React from 'react';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const games = [
  { title: 'Math Challenge', subject: 'Math', color: '#87CEEB', route: '/math' },
  { title: 'Aptitude Quest', subject: 'Aptitude', color: '#FFD700', route: '/aptitude' },
  { title: 'Sentence Builder', subject: 'English', color: '#E0BBE4', route: '/sentence' },
  { title: 'Logical Puzzle', subject: 'Aptitude', color: '#B5EAD7', route: '/logical' },
  { title: 'Grammar Hunt', subject: 'English', color: '#C7CEEA', route: '/grammar' },
  { title: 'Quick Quiz', subject: 'Mixed', color: '#D5AAFF', route: '/quickquiz' }, // ✅ Fixed route
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard">
      <h1>🎮 Welcome to Virtual Study Arena</h1>
      <p>Use games to learn subjects like Math, English, Tamil & more!</p>

      <div className="grid-container">
        {games.map((game, index) => (
          <div
            key={index}
            className="grid-item"
            style={{ backgroundColor: game.color }}
          >
            <h3>{game.title}</h3>
            <p>{game.subject}</p>
            <button onClick={() => navigate(game.route)}>Play</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
