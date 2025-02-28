const { StatusCodes } = require('http-status-codes');
const {FlightRepository} = require('../repositories');
const AppError = require('../utils/errors/app-error');

const flightRepository = new FlightRepository();

async function createFlight(data){
    try {
        const response = await flightRepository.create(data);
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
        console.log(error);
        
        throw new AppError('Cannot create a new Airport object', StatusCodes.INTERNAL_SERVER_ERROR)
    }
}


module.exports = {
    createFlight,
}