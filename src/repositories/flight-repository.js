const CrudRepository = require('./crud-repository')
const { Flight, Airplane, Airport ,City} = require('../models');
const { Sequelize } = require('sequelize');
const db = require('../models');
const { addRowLockOnFlightsQuery } = require('./queries');

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

    async updateRemainingSeats(flightId, seats, dec = 1){
        const transaction = await db.sequelize.transaction();
        // Here we are using the sequelize query to lock the row for update so that no other transaction can update the row until this transaction is completed
        try {
            await db.sequelize.query(addRowLockOnFlightsQuery(flightId));
            // We are going to use decrement method given by sequelize to update the remaining seats
            // We are going to decrement the totalSeats by the number of seats booked
            // If dec is true then it will decrement the totalSeats else it will increment the totalSeats
            
            if(parseInt(dec)){
                await Flight.decrement('totalSeats', { by: seats, where: { id: flightId } }, { transaction});
            }else{
                await Flight.increment('totalSeats', { by: seats, where: { id: flightId } }, { transaction});  
            }
            await transaction.commit(); // commit the transaction after the update is done
        } catch (error) {
            await transaction.rollback();
            throw error;
        }        
    }
}

module.exports = FlightRepository;