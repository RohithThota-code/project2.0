import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const navigate = useNavigate();
    const [data, setData] = useState({ 
        email: '',
        password: '',
    });

    const loginUser = async (e) => {
        e.preventDefault();
        console.log(data);
        
        const { email, password } = data; 

        try {
            const response = await axios.post('/login', { email, password });
            const data = response.data;

            if (data.error) {
                toast.error(data.error);
            } else {
                setData({ email: '', password: '' });
                
                navigate('/dashboard');
                // onStartQuiz(childName, sessionId); // Call the onStartQuiz function after successful API call
                // navigate('/quiz');
                
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while logging in.');
        }
    };

    return (
        <div>
            <h3>Login</h3>
            <br />
            <form onSubmit={loginUser}>
                <label>Email</label>
                <input
                    type="text"
                    placeholder="Enter email"
                    value={data.email} 
                    onChange={(e) => setData({ ...data, email: e.target.value })} 
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder="Enter password"
                    value={data.password} 
                    onChange={(e) => setData({ ...data, password: e.target.value })} 
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

