const axios = require('axios');
const { client } = require('./redirectToAuth.js');
// const revokeToken = require('./revokeToken.js');

const authCallback = async (req, res) => {
    const code = req.query.code;
    const prisma = req.prisma;
    try {
        const { tokens } = await client.getToken(code);
        const { access_token } = tokens;


        const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        await prisma.User.create({
            data: {
                name: data.name,
                email: data.email,
                token: access_token,
            }
        })
        
        res.cookie("token", access_token, {
            expires: new Date(Date.now() + 4 * 60 * 60 * 1000),
            httpOnly: true,
            sameSite: "none", // change it to none in production
            secure: true,
        })


        return res.redirect("http://localhost:3000/");
    } catch (error) {
        console.error('Error during OAuth2 callback:', error);
        res.status(500).send('An error occurred during authentication.');
    }
}

module.exports = authCallback;