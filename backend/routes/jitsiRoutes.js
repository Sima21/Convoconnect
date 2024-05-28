// backend/routes/jitsiRoutes.js
const express = require('express');
const router = express.Router();

router.get('/config', (req, res) => {
    const groupId = req.query.groupId;  // Get the group ID from the query parameters
    res.json({
        hosts: {
            domain: 'localhost',
            muc: 'conference.localhost',
        },
        bosh: '//localhost:5280/http-bind', 
        clientNode: 'http://jitsi.org/jitsimeet',
        disableDeepLinking: true,
        toolbarButtons: [
            'microphone', 'camera', 'desktop', 'fullscreen', 'fodeviceselection', 'hangup', 
            'profile', 'chat', 'recording', 'livestreaming', 'etherpad', 'sharedvideo', 
            'settings', 'raisehand', 'videoquality', 'filmstrip', 'invite', 'feedback', 
            'stats', 'shortcuts', 'tileview', 'download', 'help', 'mute-everyone', 
            'e2ee'
        ],
        enableClosePage: true,  // Allow closing the page
        configOverwrite: {
            prejoinPageEnabled: false,
        },
        interfaceConfigOverwrite: {
            SHOW_JITSI_WATERMARK: false,
            SHOW_BRAND_WATERMARK: false,
            DEFAULT_LOGO_URL: '',
            DEFAULT_WELCOME_PAGE_LOGO_URL: '',
        },
        onEndMeetingRedirect: `http://localhost:3000/dashboard?groupId=${groupId}`,  // Custom parameter
    });
});

module.exports = router;
