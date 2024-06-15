import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './CommonStyles.css';
import './AuthForm.css';
import LogoImage from './Logo2.png'; // Ensure the path to the image is correct

function AuthForm() {
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

    const handleGoogleLogin = () => {
        window.location.href = process.env.REACT_APP_GOOGLE_AUTH_URL || 'http://localhost:5000/api/auth/google';
    };

    return (
        <div className="container">
            <div className="sidebar">
                <div className="logo-container">
                    <div className="circle-image"></div>
                </div>
                <div className="sidebar-item">
                    <span className="text">Developers Team</span>
                    <span className="icon">▶</span>
                    <div className="sidebar-info">
                        Sima,<br/> 
                        Lotfi,<br/>
                        Mojtaba<br/>
                    </div>
                </div>
                <div className="sidebar-item">
                    <span className="text">CONTACT</span>
                    <span className="icon">▶</span>
                    <div className="sidebar-info">
                        mojtaba.pourshiri@docc.techsta.com
                    </div>
                </div>
                <div className="sidebar-item">
                    <span className="text">ABOUT</span>
                    <span className="icon">▶</span>
                    <div className="sidebar-info">
                        This is the final project
                    </div>
                </div>
            </div>
            <div className="main-content">
                <div className="button-container">
                    <motion.button
                        className="button auth-button-toggle"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={() => navigate('/register')}
                    >
                        Need to register?
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
                </div>
                <div className="form-container">
                    <div className="header-with-logo">
                        <img src={LogoImage} alt="ConvoConnect Logo" className="header-logo" />
                        <motion.div className="auth-header" initial={{ y: 100, opacity: 0.2 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }}>
                            ConvoConnect
                        </motion.div>
                    </div>
                    <motion.div className="auth-subheader" initial={{ y: 100, opacity: 0.2 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2 }}>
                        Overview
                    </motion.div>
                    <motion.div className="auth-text" initial={{ y: 100, opacity: 0.2 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.4 }}>
                        ConvoConnect is a video conferencing platform developed as a DevOps project that incorporates technologies and methodologies. It utilizes Jitsi Meet for real-time communication and integrates Authentik for user authentication, showcasing a modern, scalable application built on Amazon EKS.
                    </motion.div>
                    <motion.div className="auth-subheader" initial={{ y: 100, opacity: 0.2 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.6 }}>
                        Features
                    </motion.div>
                    <motion.div className="auth-text" initial={{ y: 100, opacity: 0.2 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.8 }}>
                        <ul style={{ textAlign: 'left', color: 'black' }}>
                            <li>Authentik Integration: Secure user authentication ensuring flexibility and security.</li>
                            <li>Jitsi Meet: High-quality video conferencing embedded within the application.</li>
                            <li>Group Management: Enables creation and management of user groups for organized communications.</li>
                            <li>Dashboard: Personalized user dashboard displaying scheduled meetings and active groups.</li>
                        </ul>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default AuthForm;
