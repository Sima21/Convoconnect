<<<<<<< HEAD
//frontend\src\components\Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchGroups, createGroup, deleteGroup, inviteMember, generateMeetLink } from '../api';
=======
// frontend/src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchGroups, createGroup, deleteGroup, inviteMember } from '../api';
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [groupName, setGroupName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const navigate = useNavigate();
<<<<<<< HEAD
    const location = useLocation();
    const username = localStorage.getItem('username');

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const usernameFromParams = params.get('username');

        if (token) {
            localStorage.setItem('token', token);
            if (usernameFromParams) {
                localStorage.setItem('username', usernameFromParams);
            }

            navigate('/dashboard', { replace: true });
        }

        loadGroups();
    }, [location.search, navigate]);

=======
    const username = localStorage.getItem('username');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const user = urlParams.get('username');
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', user);
            window.history.replaceState(null, null, '/dashboard');
        }
        loadGroups();
    }, []);

>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
    const loadGroups = async () => {
        setLoading(true);
        setError('');
        try {
            const response = await fetchGroups();
            if (response.status === 200) {
                setGroups(response.data.groups || []);
            } else {
                throw new Error(response.statusText);
            }
        } catch (err) {
            console.error('Error fetching groups:', err);
            setError(`Failed to fetch groups: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateGroup = async (groupName) => {
        try {
            const response = await createGroup({ name: groupName });
            if (response.status === 201) {
                setGroupName('');
                loadGroups();
            } else {
                throw new Error(response.statusText);
            }
        } catch (err) {
            console.error('Failed to create group:', err);
            setError('Failed to create group');
        }
    };

    const handleDeleteGroup = async (groupId) => {
        try {
            const response = await deleteGroup(groupId);
            if (response.status === 200) {
                loadGroups();
            } else {
                throw new Error('Failed to delete group');
            }
        } catch (err) {
            console.error('Error deleting group:', err);
            setError(`Failed to delete group: ${err.message}`);
        }
    };

    const handleInviteMember = async (groupId, email) => {
        try {
            const response = await inviteMember(groupId, email);
            if (response.status === 200) {
                alert('Invitation sent successfully');
                setInviteEmail('');
                setSelectedGroupId(null);
            } else {
                throw new Error(response.statusText);
            }
        } catch (err) {
            console.error('Failed to send invitation:', err);
            setError('Failed to send invitation');
        }
    };

<<<<<<< HEAD
    const handleGenerateMeetLink = async (groupId) => {
        try {
            const response = await generateMeetLink(groupId);
            if (response.status === 200) {
                loadGroups();
            } else {
                throw new Error(response.statusText);
            }
        } catch (err) {
            console.error('Failed to generate meet link:', err);
            setError('Failed to generate meet link');
        }
    };

    const handleJoinMeeting = (meetLink) => {
        const roomName = meetLink.replace('https://localhost:8443/', '');
        navigate(`/jitsi/${roomName}`);
=======
    const handleJoinMeeting = (roomName) => {
        navigate(`/meet/${roomName}`);
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    return (
        <div>
            <h1>Welcome to <span style={{ textDecoration: 'underline' }}>{username || "User"}</span>'s Dashboard</h1>
            <button onClick={logout}>Logout</button>
            <div>
                <input
                    type="text"
                    value={groupName}
                    onChange={e => setGroupName(e.target.value)}
                    placeholder="Enter new group name"
                />
                <button onClick={() => handleCreateGroup(groupName)}>Create Group</button>
            </div>
            {loading ? (
                <p>Loading groups...</p>
            ) : error ? (
                <p style={{ color: 'red' }}>{error}</p>
            ) : groups.length > 0 ? (
                <ul>
                    {groups.map(group => (
                        <li key={group.id}>
                            {group.name} -
                            <button onClick={() => handleDeleteGroup(group.id)}>Delete Group</button>
<<<<<<< HEAD
                            <button onClick={() => handleGenerateMeetLink(group.id)}>Generate Meet Link</button>
                            {group.meetLink && (
                                <div>
                                    <button onClick={() => handleJoinMeeting(group.meetLink)}>Join Meeting</button>
                                    <p>{group.meetLink}</p>
                                </div>
                            )}
=======
                            <button onClick={() => handleJoinMeeting(group.name)}>Join Meeting</button>
>>>>>>> ab7617cc7a846cd5bf26e7e2278ad7529c022dfe
                            <input
                                type="email"
                                placeholder="Enter member email"
                                value={selectedGroupId === group.id ? inviteEmail : ''}
                                onChange={e => {
                                    setInviteEmail(e.target.value);
                                    setSelectedGroupId(group.id);
                                }}
                            />
                            <button onClick={() => handleInviteMember(group.id, inviteEmail)}>Invite Member</button>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>You have no group yet! Click on Create Group</p>
            )}
        </div>
    );
}

export default Dashboard;
