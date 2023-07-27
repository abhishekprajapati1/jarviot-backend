const express = require('express');
const dotenv = require('dotenv');
const appRouter = require("./routes/index.js");

dotenv.config();

const app = express();

const port = process.env.PORT || 5000;





app.use('', appRouter);





app.listen(port, () => {
    console.log("server started on ", port);
})