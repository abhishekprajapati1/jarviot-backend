const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const appRouter = require("./routes/index.js");
const { prisma } = require('./middlewares/prisma.js');
const connectDb = require("./db/connectDb.js");

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}))
app.use(prisma);
app.use('', appRouter);





app.listen(port, () => {
    console.log("server started on ", port);
    connectDb();
})