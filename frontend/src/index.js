// frontend/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import AuthForm from './components/AuthForm';
import Dashboard from './components/Dashboard';
import MeetingRoom from './components/MeetingRoom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<AuthForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/meet/:roomName" element={<MeetingRoom />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
