const createDriveClient = require("../../helpers/createDriveClient");
const getFileInfos = require("../../services/getFileInfos");


const getAllPeopleWithAccess = async (req, res) => {
    const prisma = req.prisma;
    const { token } = req.user;
    try {
        const drive = createDriveClient(token);

        const response = await drive.permissions.list({
            fileId: 'root',
            fields: 'permissions(emailAddress, role)',
        });

        const otherusers = response.data.permissions.filter(p => p.role !== "owner");

        prisma.$disconnect();
        res.status(200).json({ success: true, data: otherusers });
    } catch (error) {
        prisma.$disconnect();
        res.status(500).json({ success: false, message: error.message, error });
    }
}

module.exports = getAllPeopleWithAccess;