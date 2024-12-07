// StartScreen.js
import React, { useState } from 'react';

const StartScreen = ({ onStartQuiz, onAdminLogin }) => {
  const [username, setUsername] = useState('');
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const handlePlayGame = () => {
    const username = prompt("Please enter your username:");
    onStartQuiz(username);
  };

  // const handleAdminLogin = () => {
  //   const adminId = prompt("Admin ID:");
  //   const adminPassword = prompt("Admin Password:");
  //   onAdminLogin(adminId, adminPassword);
  // };

  return (
    <div className="start-screen">
      <h1>Memory Game</h1>
      <br/>
      <button onClick={handlePlayGame}>PLAY GAME</button>
    </div>
  );
};

export default StartScreen;
