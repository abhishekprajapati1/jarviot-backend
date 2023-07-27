const { OAuth2Client } = require("google-auth-library");
const dotenv = require('dotenv');

dotenv.config();


const client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
)

const redirectToAuth = async (rea, res) => {
    const authUrl = client.generateAuthUrl({
        access_type: 'offline', // 'offline' to request a refresh token
        scope: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
    });

    res.redirect(authUrl);
}
module.exports = { client, redirectToAuth };