const { google } = require('googleapis')

const revokeToken = async (req, res) => {
    const prisma = req.prisma;
    const { email, token } = req.user;


    try {
        // remove user from database
        const deleted = await prisma.User.delete({
            where: {
                email
            }
        })

        if (!deleted) {
            prisma.$disconnect();
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // revoke token
        try {
            const OAuth2Client = new google.auth.OAuth2();
            OAuth2Client.setCredentials({ access_token: token });
            await OAuth2Client.revokeCredentials();
        } catch (error) {
            console.log(error);
        }



        prisma.$disconnect();
        res.clearCookie("token");
        res.status(200).json({ success: true, message: 'Token revoked successfully' });
    } catch (error) {
        console.error('Error revoking access token:', error.response?.data || error.message);
        prisma.$disconnect();
        res.status(500).json({ success: false, message: error.message, error });
    }
}

module.exports = revokeToken;