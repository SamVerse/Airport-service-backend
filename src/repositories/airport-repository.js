const CrudRepository = require('./crud-repository')
const { Airport } = require('../models')
 
class AirportRepository extends CrudRepository {
    constructor(){
        super(Airport); // here we are passing the Airport model to the CrudRepository which can be used to perform CRUD operations
    }
}

module.exports = AirportRepository;