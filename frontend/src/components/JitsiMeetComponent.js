import React, { useEffect, useRef } from 'react';

function JitsiMeetComponent({ roomName, onMeetingEnd }) {
    const jitsiContainerRef = useRef(null);
    const jitsiApiRef = useRef(null);

    useEffect(() => {
        console.log('Mounting JitsiMeetComponent:', roomName);

        const loadJitsiScript = () => {
            if (!window.JitsiMeetExternalAPI) {
                const script = document.createElement('script');
                script.src = 'https://localhost:8443/external_api.js';
                script.async = true;
                script.onload = initJitsi;
                document.body.appendChild(script);
            } else {
                initJitsi();
            }
        };

        const initJitsi = () => {
            if (!jitsiApiRef.current) {
                jitsiApiRef.current = new window.JitsiMeetExternalAPI('localhost:8443', {
                    roomName,
                    parentNode: jitsiContainerRef.current,
                    width: '100%',
                    height: 700,
                });

                jitsiApiRef.current.addEventListener('readyToClose', onMeetingEnd);
            }
        };

        loadJitsiScript();

        return () => {
            console.log('Unloading JitsiMeetComponent:', roomName);
            if (jitsiApiRef.current) {
                jitsiApiRef.current.dispose();
                jitsiApiRef.current = null;
            }
        };
    }, [roomName, onMeetingEnd]);

    return <div ref={jitsiContainerRef} />;
}

export default JitsiMeetComponent;
