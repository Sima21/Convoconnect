import React, { useState, useEffect } from 'react';
import { createUser, loginUser } from '../api';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CommonStyles.css';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState({ username: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const moveX = (clientX / window.innerWidth) * 100;
            const moveY = (clientY / window.innerHeight) * 100;
            document.documentElement.style.setProperty('--mouse-x', `${moveX}%`);
            document.documentElement.style.setProperty('--mouse-y', `${moveY}%`);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

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
        <div className="container">
            <form className="form-container" onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input className="input-field" type="text" name="username" value={userData.username} onChange={handleChange} required />
                </label>
                {!isLogin && (
                    <label>
                        Email:
                        <input className="input-field" type="email" name="email" value={userData.email} onChange={handleChange} required />
                    </label>
                )}
                <label>
                    Password:
                    <input className="input-field" type="password" name="password" value={userData.password} onChange={handleChange} required />
                </label>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <motion.button
                    className="button auth-button-login"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={loading}
                >
                    {isLogin ? 'Login' : 'Register'}
                </motion.button>
                <motion.button
                    className="button auth-button-toggle"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Need to register?' : 'Already have an account?'}
                </motion.button>
                <motion.button
                    className="button auth-button-google"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    onClick={handleGoogleLogin}
                >
                    Login with Google
                </motion.button>
            </form>
        </div>
    );
}

export default AuthForm;
