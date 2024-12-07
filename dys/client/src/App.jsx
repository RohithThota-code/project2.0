import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Header from '../src/components/Header';
import Navbar from '../src/components/Navbar';
import Home from '../src/pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import StartScreen from './StartScreen.jsx';
import { UserContextProvider } from '../context/userContext';


axios.defaults.baseURL = 'http://localhost:8000';
axios.defaults.withCredentials = true;

function App() {

  useEffect(() => {
    // Set up any necessary initialization logic (e.g., axios setup)
  }, []);

  

  return (
    <div>
    <UserContextProvider>
      <Header />
      <Navbar />
      <Toaster position="center" toastOptions={{ duration: 3000 }} />
      
      {/* Game and routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/startscreen" element={< StartScreen/>} />
      </Routes>
    
    </UserContextProvider>
    </div>
    
  );
  
}

export default App;

