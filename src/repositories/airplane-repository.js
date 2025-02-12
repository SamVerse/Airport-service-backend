const CrudRepository = require('./crud-repository')
const { Airplane } = require('../models')

class AirplaneRepository extends CrudRepository {
    constructor(){
        super(Airplane); // here we are passing the Airplane model to the CrudRepository which can be used to perform CRUD operations
    }
}

module.exports = AirplaneRepository;