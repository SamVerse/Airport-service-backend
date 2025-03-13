const CrudRepository = require('./crud-repository')
const { Flight } = require('../models')

class FlightRepository extends CrudRepository {
    constructor(){
        super(Flight); // here we are passing the Flight model to the CrudRepository which can be used to perform CRUD operations
    }

    async getAllFlights(filter,sort){
        const response = await Flight.findAll({
            where: filter,
            order: sort
        });
        return response;
    }

}

module.exports = FlightRepository;