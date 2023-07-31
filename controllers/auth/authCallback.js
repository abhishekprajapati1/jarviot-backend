const { client } = require('./redirectToAuth.js');
const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const createAuthClient = require('../../helpers/createAuthClient.js');

require('dotenv').config();

const authCallback = async (req, res) => {
    const code = req.query.code;
    const prisma = req.prisma;
    try {
        const { tokens } = await client.getToken(code);
        const { access_token } = tokens;

        const authClient = createAuthClient(access_token);
        const oauth2 = google.oauth2({
            version: 'v2',
            auth: authClient,
        });
        const { data } = await oauth2.userinfo.get();

        // search for user in db
        const userExists = await prisma.User.findUnique({
            where: {
                email: data.email,
            }
        });


        let user;

        if (!userExists) {
            user = await prisma.User.create({
                data: {
                    name: data.name,
                    email: data.email,
                    token: access_token,
                }
            });
        } else {
            user = await prisma.User.update({
                where: {
                    email: data.email,
                },
                data: {
                    token: access_token,
                }
            })
        }


        const token = jwt.sign(user, process.env.SECRET_KEY);

        res.cookie("token", token, {
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