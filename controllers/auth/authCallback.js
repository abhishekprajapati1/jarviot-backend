const axios = require('axios');
const { client } = require('./redirectToAuth.js');
const revokeToken = require('./revokeToken.js');

const authCallback = async (req, res) => {
    const code = req.query.code;


    try {
        const { tokens } = await client.getToken(code);
        const { access_token } = tokens;

        try {
            const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            });
            return res.send(data);
        } catch (error) {
            await revokeToken(access_token);
            return res.send("revoked token")
        }



        // Save the access token and user information in the database
        // await User.upsert({
        //     email: email,
        //     accessToken: access_token,
        // });

        res.send('Authentication successful! You can now close this window.');
    } catch (error) {
        console.error('Error during OAuth2 callback:', error);
        res.status(500).send('An error occurred during authentication.');
    }
}

module.exports = authCallback;