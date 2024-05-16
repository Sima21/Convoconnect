//frontend\src\App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import MeetingRoom from './components/MeetingRoom';
import AuthForm from './components/AuthForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AuthForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/meet/:roomName" element={<MeetingRoom />} />
            </Routes>
        </Router>
    );
}

export default App;
