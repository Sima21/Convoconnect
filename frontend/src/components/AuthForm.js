import React, { useState } from 'react';
import { createUser, loginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import './AuthForm.css';

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
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username || userData.username);
                navigate('/dashboard');
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
        window.location.href = process.env.REACT_APP_GOOGLE_AUTH_URL || 'http://localhost:5000/api/auth/google';
    };

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
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
        </div>
    );
}

export default AuthForm;
