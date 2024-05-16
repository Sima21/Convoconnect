//frontend\src\components\JitsiMeetComponent.js
import React, { useEffect, useRef } from 'react';

function JitsiMeetComponent({ roomName }) {
    const jitsiContainerRef = useRef(null);

    const loadJitsiScript = () => {
        const script = document.createElement('script');
        script.src = 'https://meet.jit.si/external_api.js';
        script.async = true;
        script.onload = initJitsi;
        document.body.appendChild(script);
    };

    const initJitsi = () => {
        const JitsiMeetExternalAPI = window.JitsiMeetExternalAPI;
        new JitsiMeetExternalAPI('meet.jit.si', {
            roomName,
            width: '100%',
            height: 700,
            parentNode: jitsiContainerRef.current,
        });
    };

    useEffect(() => {
        loadJitsiScript();
    }, [roomName]);

    return <div ref={jitsiContainerRef} />;
}

export default JitsiMeetComponent;
