// src/components/MeetingRoom.js
import React from 'react';
import JitsiMeetComponent from './JitsiMeetComponent';

function MeetingRoom({ match }) {
    return <JitsiMeetComponent roomName={match.params.roomName} />;
}

export default MeetingRoom;
