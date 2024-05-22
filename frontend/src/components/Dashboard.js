// frontend\src\components\Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for that redirection will be used
import { fetchGroups } from '../api';
import CreateGroup from './CreateGroup';

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    useEffect(() => {
        const loadGroups = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetchGroups();
                setGroups(response.data.groups);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch groups');
                setLoading(false);
            }
        };
        loadGroups();
    }, []);

    // Navigate to the MeetingRoom component
    const handleJoinMeeting = (roomName) => {
        navigate(`/meet/${roomName}`); // Redirect to the meeting room page
    };

    return (
        <div>
            <h1>Dashboard</h1>
            <CreateGroup />
            {loading ? (
                <p>Loading groups...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : groups.length > 0 ? (
                <ul>
                    {groups.map(group => (
                        <li key={group.id}>
                            {group.name} -
                            <button onClick={() => handleJoinMeeting(group.name)}>Join Meeting</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No groups to display.</p>
            )}
        </div>
    );
}

export default Dashboard;
