const CrudRepository = require('./crud-repository')
const { City } = require('../models');

class CityRepository extends CrudRepository {
    constructor(){
        super(City); // here we are passing the City model to the CrudRepository which can be used to perform CRUD operations
    }
}

module.exports = CityRepository;