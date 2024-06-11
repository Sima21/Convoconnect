import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchGroups, createGroup, deleteGroup, inviteMember, generateMeetLink, shareGroup } from '../api';
import './Dashboard.css';

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [groupName, setGroupName] = useState('');
    const [inviteEmail, setInviteEmail] = useState('');
    const [shareEmail, setShareEmail] = useState('');
    const [selectedGroupId, setSelectedGroupId] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();
    const username = localStorage.getItem('username');
    const userId = parseInt(localStorage.getItem('userId'));

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const usernameFromParams = params.get('username');
        const userIdFromParams = params.get('userId');

        if (token) {
            localStorage.setItem('token', token);
            if (usernameFromParams) {
                localStorage.setItem('username', usernameFromParams);
            }
            if (userIdFromParams) {
                localStorage.setItem('userId', userIdFromParams);
            }
            navigate('/dashboard', { replace: true });
        }

        loadGroups();
    }, [location.search, navigate]);

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
            setError('Failed to send invitation');
        }
    };

    const handleShareGroup = async (groupId, email) => {
        try {
            const response = await shareGroup(groupId, email);
            if (response.status === 200) {
                alert('Group shared successfully');
                setShareEmail('');
                setSelectedGroupId(null);
                loadGroups();
            } else {
                throw new Error(response.statusText);
            }
        } catch (err) {
            setError('Failed to share group');
        }
    };

    const handleGenerateMeetLink = async (groupId) => {
        try {
            const response = await generateMeetLink(groupId);
            if (response.status === 200) {
                loadGroups();
            } else {
                throw new Error(response.statusText);
            }
        } catch (err) {
            setError('Failed to generate meet link');
        }
    };

    const handleJoinMeeting = (meetLink) => {
        window.location.href = meetLink;
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        navigate('/');
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <h1>Welcome to <span style={{ textDecoration: 'underline' }}>{username || "User"}</span>'s Dashboard</h1>
                <button onClick={logout}>Logout</button>
            </div>
            <div className="dashboard-content">
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter new group name"
                        value={groupName}
                        onChange={e => setGroupName(e.target.value)}
                    />
                    <button className="create-group-button" onClick={() => handleCreateGroup(groupName)}>Create Group</button>
                </div>
                <div className="dashboard-content-inner">
                    {loading ? (
                        <p>Loading groups...</p>
                    ) : error ? (
                        <p style={{ color: 'red' }}>{error}</p>
                    ) : groups.length > 0 ? (
                        <ul>
                            {groups.map(group => (
                                <li key={group.id}>
                                    {group.name}
                                    {group.isOwner ? '' : ` - Shared by ${group.ownerDetails ? group.ownerDetails.username : 'Unknown'}`}
                                    <div className="button-container">
                                        {group.isOwner ? (
                                            <>
                                                <button onClick={() => handleDeleteGroup(group.id)}>Delete Group</button>
                                                <button onClick={() => handleGenerateMeetLink(group.id)}>Generate Meet Link</button>
                                                {group.meetLink && (
                                                    <div>
                                                        <p>{group.meetLink}</p>
                                                    </div>
                                                )}
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
                                                <input
                                                    type="email"
                                                    placeholder="Enter email to share"
                                                    value={selectedGroupId === group.id ? shareEmail : ''}
                                                    onChange={e => {
                                                        setShareEmail(e.target.value);
                                                        setSelectedGroupId(group.id);
                                                    }}
                                                />
                                                <button onClick={() => handleShareGroup(group.id, shareEmail)}>Share Group</button>
                                            </>
                                        ) : (
                                            group.meetLink && (
                                                <>
                                                    <button onClick={() => handleJoinMeeting(group.meetLink)}>Join Meeting</button>
                                                </>
                                            )
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>You have no group yet! Click on Create Group</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
