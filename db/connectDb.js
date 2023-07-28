const { Prisma_Client } = require('../middlewares/prisma.js');

require('dotenv').config();


const connectDb = async () => {
    try {
        // Print the value of DATABASE_URL
        console.log('DATABASE_URL:', process.env.DATABASE_URL);

        // Connect to the database
        await Prisma_Client.$connect();

        console.log('Database connection established.');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

module.exports = connectDb;