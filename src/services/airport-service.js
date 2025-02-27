const { StatusCodes } = require('http-status-codes');
const {AirportRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airportRepository = new AirportRepository();

async function createAirport(data){
    try {
        const response = await airportRepository.create(data);
        return response;
        
    } catch (error) {

        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        if(error.name == 'SequelizeForeignKeyConstraintError'){
            throw new AppError('The city you are trying to associate with the airport is not available', StatusCodes.BAD_REQUEST)
        }
        
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirports(){
    try {
        const response = await airportRepository.getAll();
        return response;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airports', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirport(id){
    try {
        const response = await airportRepository.get(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested is not available', StatusCodes.NOT_FOUND)
        }
        throw new AppError('Cannot fetch data of the airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function destroyAirport(id){
    try {
        const response = await airportRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The aiport you requested to delete is not available', StatusCodes.NOT_FOUND)
        }
        throw new AppError('Cannot delete the airport', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function updateAirport(id, data) {
    try {
        const response = await airportRepository.update(id, data);
        return response;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airport you requested to update is not available', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot update the airport', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}


module.exports = {
    createAirport,
    getAirports,
    getAirport,
    destroyAirport,
    updateAirport
}