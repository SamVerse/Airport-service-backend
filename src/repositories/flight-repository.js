const CrudRepository = require('./crud-repository')
const { Flight, Airplane, Airport ,City} = require('../models');
const { Sequelize } = require('sequelize');

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight); // here we are passing the Flight model to the CrudRepository which can be used to perform CRUD operations
    }

    async getAllFlights(filter,sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort,
            include: [
                {
                    model: Airplane,
                    required: true,
                    as: 'airplaneDetail' // Add this alias
                },
                {
                    model: Airport,
                    as: 'departureAirport',  // Add this alias
                    required: true,
                    on: {
                        col1: Sequelize.where(Sequelize.col('Flight.departureAirportId'), '=', Sequelize.col('departureAirport.code'))
                    },
                    include: {
                        model: City,
                        required: true,
                    }
                },
                {
                    model: Airport,
                    as: 'arrivalAirport',    // Add this alias
                    required: true,
                    on: {
                        col1: Sequelize.where(Sequelize.col('Flight.arrivalAirportId'), '=', Sequelize.col('arrivalAirport.code'))
                    },
                    include: {
                        model: City,
                        required: true,
                    }
                }
            ]
        });
        return response;
    }

}

module.exports = FlightRepository;