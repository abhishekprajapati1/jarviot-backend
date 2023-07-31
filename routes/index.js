const express = require('express');
const appRouter = express.Router();

const { redirectToAuth } = require('../controllers/auth/redirectToAuth.js');
const authCallback = require('../controllers/auth/authCallback.js');
const removeToken = require('../controllers/auth/revokeToken.js');
const authenticate = require('../middlewares/authenticate.js');
const driveRouter = require('./drive.router.js');

appRouter.get("/auth/google", redirectToAuth);
appRouter.get("/auth/google/callback", authCallback);
appRouter.get("/auth/revoke", authenticate, removeToken)

appRouter.use("/drive", authenticate, driveRouter);

module.exports = appRouter;