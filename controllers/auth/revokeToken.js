const axios = require('axios');

async function revokeToken(accessToken) {
    try {
        await axios.post('https://accounts.google.com/o/oauth2/revoke', {
            token: accessToken,
        });
        console.log('Access token revoked successfully.');
    } catch (error) {
        console.error('Error revoking access token:', error.response?.data || error.message);
    }
}





module.exports = revokeToken;