import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchGroups } from '../api'; 
import CreateGroup from './CreateGroup'; // Import the CreateGroup component

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    return (
        <div>
            <h1>Dashboard</h1>
            <CreateGroup /> {/* Include CreateGroup component */}
            {loading ? (
                <p>Loading groups...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : groups.length > 0 ? (
                <ul>
                    {groups.map(group => (
                        <li key={group.id}>
                            {group.name} - <Link to={`/meet/${group.name}`}>Join Meeting</Link>
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
