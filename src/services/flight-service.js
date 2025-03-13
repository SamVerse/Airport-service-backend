const { StatusCodes } = require("http-status-codes");
const { FlightRepository } = require("../repositories");
const AppError = require("../utils/errors/app-error");
const { Op } = require("sequelize");

const flightRepository = new FlightRepository();

async function createFlight(data) {
  try {
    const response = await flightRepository.create(data);
    return response;
  } catch (error) {
    if (error.name == "SequelizeValidationError") {
      let explanation = [];
      error.errors.forEach((err) => {
        explanation.push(err.message);
      });
      throw new AppError(explanation, StatusCodes.BAD_REQUEST);
    }
    if (error.name == "SequelizeForeignKeyConstraintError") {
      throw new AppError(
        "The city you are trying to associate with the airport is not available",
        StatusCodes.BAD_REQUEST
      );
    }
    console.log(error);

    throw new AppError(
      "Cannot create a new Airport object",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

async function getAllFlights(query) {    
  let customFilter = {};
  let sortFilter = [];
  // trips = MUM-DEL
  if (query.trips) {
    const trips = query.trips.split("-");
    [departureAirportId, arrivalAirportId] = trips;
    customFilter.departureAirportId = departureAirportId;
    customFilter.arrivalAirportId = arrivalAirportId;

    if (departureAirportId == arrivalAirportId) {
      throw new AppError(
        "Departure and Arrival airports cannot be the same",
        StatusCodes.BAD_REQUEST
      );
    }
  }

  if (query.price) {
    let priceValues = query.price.split("-");
    // Here we are checking if the price is negative or not by checking if the first character is "-" because of how the split function works
    if (query.price.startsWith("-")) {
      throw new AppError("Price cannot be negative", StatusCodes.BAD_REQUEST);
    }
    // Here we are assigning the first value to minPrice and the second value to maxPrice
    // If the second value is not present, we are assigning 1000000 to maxPrice
    let minPrice = Number(priceValues[0]);
    let maxPrice = priceValues.length > 1 ? Number(priceValues[1]) : 1000000;

    customFilter.price = {
      [Op.between]: [minPrice, maxPrice],
    };
  }

  if(query.travellers) {
    // Here we can check for some potential errors like   
    customFilter.totalSeats = {
      [Op.gte]: query.travellers
    }
  }

  if(query.tripDate) {
    try {
      // Create the start and end of the day
      const startDate = `${query.tripDate} 00:00:00`;
      const endDate = `${query.tripDate} 23:59:59`;
      
      // Use between operator for date range
      customFilter.departureTime = {
        [Op.between]: [startDate, endDate]
      };
      
    } catch (error) {
      throw new AppError("Invalid date format", StatusCodes.BAD_REQUEST);
    }
  }

  if(query.sort) {
    // Here we are taking the sort query and splitting it by "," to get the individual sort values and then splitting it by "_" to get the column and order values and then storing it in
    // sortFilter array
    const sortValues = query.sort.split(",");
    const sortFilters = sortValues.map((sortValue) => sortValue.split("_"));
    sortFilter = sortFilters;
  }

  try {
    const response = await flightRepository.getAllFlights(customFilter,sortFilter);
    // consider a case where there is no flight available for the given filter
    // in that case the response will be an empty array
    if (response.length == 0) {
      throw new AppError(
        "No flights available for the given filter",
        StatusCodes.NOT_FOUND
      );
    }
    return response;
  } catch (error) {
    if (error instanceof AppError) {
      throw error; // Re-throw AppError with its original status code
    }
    throw new AppError(
      "Cannot fetch data of all flights",
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
}

module.exports = {
  createFlight,
  getAllFlights,
};
