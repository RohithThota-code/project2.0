import { useContext } from 'react';
import React, { useState, useEffect } from 'react';
import { UserContext } from '../../context/userContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StartScreen from '../StartScreen';
import MemoryGame from '../Memorygame';

export default function Dashboard() {
    const [gameStage, setGameStage] = useState('start');
    const [sessionData, setSessionData] = useState({});

    const handleMemoryGame = () => setGameStage('memoryGame');
    const handleFinishMemoryGame = (memoryGameScore) => {
    setSessionData((prev) => ({ ...prev, memoryGameScore }));
    setGameStage('interface');
  };
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {

            await axios.post('/logout');
            setUser(null); 
            navigate('/login');

        } catch (error) {

            console.error('Logout failed:', error);
            
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            {!!user && <h2>Hi, {user.username}!</h2>}
            {!!user && <button onClick={handleLogout}>Logout</button>}
            {!!user && 
                <div>
            {gameStage === 'start' && <StartScreen onStartQuiz={handleMemoryGame} />}
            {gameStage === 'memoryGame' && <MemoryGame onFinish={handleFinishMemoryGame} />}
            {gameStage === 'interface' && <AdminReport sessionData={sessionData} />}
                </div>}
            
        </div>
    );
}

