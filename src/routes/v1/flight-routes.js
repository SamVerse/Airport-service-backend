const express = require('express');

const { FlightController } = require('../../controllers');
const { FlightMiddlewares } = require('../../middlewares');

const router = express.Router();

// /api/v1/flights  POST
router.post('/',
      FlightMiddlewares.validateCreateRequest,
      FlightController.createFlight
);

// /api/v1/flights?trips=LKO-DEL  GET
router.get('/',
      FlightController.getAllFlights
);

// /api/v1/flights/:id  GET
router.get('/:id',
      FlightController.getFlightById
);


module.exports = router;