const { google } = require('googleapis');

const createAuthClient = (token) => {
    const OAuth2Client = new google.auth.OAuth2();
    OAuth2Client.setCredentials({ access_token: token });
    
    return OAuth2Client;
}

module.exports = createAuthClient;