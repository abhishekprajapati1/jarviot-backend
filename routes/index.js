const express = require('express');
const appRouter = express.Router();

const { redirectToAuth } = require('../controllers/auth/redirectToAuth.js');
const authCallback = require('../controllers/auth/authCallback.js');

appRouter.get("/auth/google", redirectToAuth);
appRouter.get("/auth/google/callback", authCallback)

module.exports = appRouter;