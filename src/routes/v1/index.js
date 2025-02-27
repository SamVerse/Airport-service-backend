const express = require('express');

const {infoController} = require('../../controllers');
const airplaneRoutes = require('./airplane-routes');
const cityRoutes = require('./city-routes');
const airportRoutes = require('./airport-routes');

const router = express.Router();

router.use('/airplane', airplaneRoutes);

router.use('/cities', cityRoutes);

router.use('/airport', airportRoutes)


router.get('/info', infoController.info);

module.exports = router;