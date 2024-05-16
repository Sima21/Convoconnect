import React, { useState } from 'react';
import { createUser, loginUser } from '../api';
import { useNavigate } from 'react-router-dom';

function AuthForm() {
    const [isLogin, setIsLogin] = useState(true);
    const [userData, setUserData] = useState({ username: '', email: '', password: '' }); // Added email field
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();  // Replacing useHistory

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = isLogin ? await loginUser(userData) : await createUser(userData);
            console.log(response);
            setLoading(false);
            navigate('/dashboard');  // Redirect using navigate
        } catch (err) {
            setError(err.response ? err.response.data.message : err.message);
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type="text" name="username" value={userData.username} onChange={handleChange} required />
            </label>
            {/* Added Email input field */}
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
        </form>
    );
}

export default AuthForm;
