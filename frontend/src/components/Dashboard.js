import React, { useEffect, useState } from 'react';
import { fetchGroups } from '../api'; 
import CreateGroup from './CreateGroup'; // Import the CreateGroup component
import JitsiMeetComponent from './JitsiMeetComponent'; // Import the JitsiMeetComponent

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentRoom, setCurrentRoom] = useState(null); // State to hold the current Jitsi room to join

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

    // Function to handle opening a Jitsi meeting
    const handleJoinMeeting = (roomName) => {
        setCurrentRoom(roomName); // Set the room name to open the Jitsi meeting
    };

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
                            {group.name} - 
                            <button onClick={() => handleJoinMeeting(group.name)}>Join Meeting</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No groups to display.</p>
            )}
            {/* Conditionally render the JitsiMeetComponent if a room is selected */}
            {currentRoom && (
                <JitsiMeetComponent roomName={currentRoom} />
            )}
        </div>
    );
}

export default Dashboard;
