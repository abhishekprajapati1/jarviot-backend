const { google } = require('googleapis');
const createAuthClient = require('./createAuthClient');

const createDriveClient = (token) => {
    const authClient = createAuthClient(token);
    const drive = google.drive({
        version: 'v3',
        auth: authClient,
    });
    return drive;
};

module.exports = createDriveClient;