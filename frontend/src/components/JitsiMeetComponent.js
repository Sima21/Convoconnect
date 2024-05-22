import React, { useEffect, useRef } from 'react';

function JitsiMeetComponent({ roomName }) {
    const jitsiContainerRef = useRef(null);
    const jitsiApiRef = useRef(null);

    useEffect(() => {
        // Function to load the Jitsi script
        const loadJitsiScript = () => {
            const script = document.createElement('script');
            script.src = 'https://localhost:8443/external_api.js';
            script.async = true;
            script.onload = initJitsi;
            document.body.appendChild(script);
        };

        // Function to initialize Jitsi
        const initJitsi = () => {
            if (window.JitsiMeetExternalAPI && !jitsiApiRef.current) {
                jitsiApiRef.current = new window.JitsiMeetExternalAPI('localhost:8443', {
                    roomName,
                    width: '100%',
                    height: 700,
                    parentNode: jitsiContainerRef.current,
                });
            }
        };

        if (!window.JitsiMeetExternalAPI) {
            loadJitsiScript();
        } else {
            initJitsi();
        }

        // Cleanup function
        return () => {
            if (jitsiApiRef.current) {
                jitsiApiRef.current.dispose();
                jitsiApiRef.current = null;
            }
        };
    }, [roomName]); // Effect dependency on roomName

    return <div ref={jitsiContainerRef} />;
}

export default JitsiMeetComponent;
