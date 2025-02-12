const express = require('express');

const {infoController} = require('../../controllers');
const airplaneRoutes = require('./airplane-routes');

const router = express.Router();

router.use('/airplane', airplaneRoutes);

router.get('/info', infoController.info);

module.exports = router;