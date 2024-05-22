// frontend/src/components/MeetingRoom.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JitsiMeetComponent from './JitsiMeetComponent';

function MeetingRoom() {
    const { roomName } = useParams();  // Get the room name from the URL parameter
    const navigate = useNavigate();

    const handleMeetingEnd = () => {
        navigate('/dashboard');  // Redirect to dashboard on meeting end
    };

    return (
        <div>
            <JitsiMeetComponent roomName={roomName} onMeetingEnd={handleMeetingEnd} />
        </div>
    );
}

export default MeetingRoom;
