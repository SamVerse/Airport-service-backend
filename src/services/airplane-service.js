const { StatusCodes } = require('http-status-codes');
const {AirplaneRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const airplaneRepository = new AirplaneRepository();

async function createAirplane(data){
    try {
        const response = await airplaneRepository.create(data);
        return response;
        
    } catch (error) {

        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST)
        }

        throw new AppError('Cannot create a new airplane object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplanes(){
    try {
        const response = await airplaneRepository.getAll();
        return response;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the airplanes', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

async function getAirplane(id){
    try {
        const response = await airplaneRepository.get(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The airplane you requested is not available', StatusCodes.NOT_FOUND)
        }
        throw new AppError('Cannot fetch data of the airplane', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {
    createAirplane,
    getAirplanes,
    getAirplane
}