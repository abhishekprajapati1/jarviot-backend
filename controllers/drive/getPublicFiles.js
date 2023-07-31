const getFileInfos = require("../../services/getFileInfos");


const getPublicFiles = async (req, res) => {
    const prisma = req.prisma;
    const { token } = req.user;
    try {
        const query = "visibility = 'anyoneCanFind'";
        const files = await getFileInfos(token, query);
        prisma.$disconnect();
        res.status(200).json({ success: true, data: files });
    } catch (error) {
        prisma.$disconnect();
        res.status(500).json({ success: false, message: error.message, error });
    }
}

module.exports = getPublicFiles;