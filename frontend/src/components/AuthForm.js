// frontend/src/components/AuthForm.js
import React, { useState } from 'react';
import { createUser, loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = isLogin ? await loginUser(userData) : await createUser(userData);
            
            if (response.data && response.data.token) {
                console.log('Token:', response.data.token); // Log the token
                localStorage.setItem('token', response.data.token); // Store the JWT token
                localStorage.setItem('username', userData.username); // Store the username for display in the dashboard
                navigate('/dashboard');  // Redirect to the dashboard
            } else {
                throw new Error('Authentication failed, no token provided');
            }
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleGoogleLogin = () => {
        window.location.href = 'http://localhost:5000/api/auth/google';
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={userData.username} onChange={handleChange} required />
            </label>
            {!isLogin && (
                <label>
                    Email:
                    <input type="email" name="email" value={userData.email} onChange={handleChange} required />
                </label>
            )}
            <label>
                Password:
                <input type="password" name="password" value={userData.password} onChange={handleChange} required />
            </label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit" disabled={loading}>{isLogin ? 'Login' : 'Register'}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? 'Need to register?' : 'Already have an account?'}
            </button>
            <button type="button" onClick={handleGoogleLogin}>
                Login with Google
            </button>
        </form>
    );
}

export default AuthForm;
