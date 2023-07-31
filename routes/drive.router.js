const express = require('express');
const driveRouter = express.Router();


const getRestrictedFiles = require('../controllers/drive/getRestrictedFiles');
const getPublicFiles = require('../controllers/drive/getPublicFiles');
const getAllPeopleWithAccess = require('../controllers/drive/getAllPeopleWithAccess');

driveRouter.get("/anyonewithlink", getRestrictedFiles);
driveRouter.get("/externallyshared", getPublicFiles);
driveRouter.get("/peoplewithaccess", getAllPeopleWithAccess);

module.exports = driveRouter;