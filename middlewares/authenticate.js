const jwt = require('jsonwebtoken');

require('dotenv').config();

const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) return reject(err);
            resolve(user);
        });
    });
};


const authenticate = async (req, res, next) => {
    const prisma = req.prisma;
    let token = req.cookies?.token;
    
    if (!token) {
        prisma.$disconnect();
        return res.status(401).send({ success: false, message: "Access Denied !! this" });
    }

    let user;

    try {
        user = await verifyToken(token);
    } catch (error) {
        prisma.$disconnect();
        return res.status(401).send({ msg: "Access Denied !!" });
    }

    // now we put the user retrieved from the token in req.user.
    req.user = user;

    // return the control to route
    next();
}

module.exports = authenticate;