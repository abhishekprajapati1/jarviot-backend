const { OAuth2Client } = require("google-auth-library");
const dotenv = require('dotenv');

dotenv.config();


const client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI,
)

const redirectToAuth = async (rea, res) => {
    try {
        const authUrl = client.generateAuthUrl({
            access_type: 'offline', // 'offline' to request a refresh token
            scope: ['https://www.googleapis.com/auth/drive.readonly', 'https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile'],
        });

        res.status(200).json({ success: true, authUrl });
    } catch (error) {
        res.status(500).json({ success: false, error, message: "Internal Server Error" })
    }
}
module.exports = { client, redirectToAuth };