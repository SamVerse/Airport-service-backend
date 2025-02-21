const { StatusCodes } = require('http-status-codes');
const { CityRepository } = require('../repositories');
const AppError = require('../utils/errors/app-error');

const cityRepository = new CityRepository();

async function createCity(data){
    try {
        const response = await cityRepository.create(data);
        return response;
    } catch (error) {
        if(error.name == 'SequelizeValidationError' || error.name == 'SequelizeUniqueConstraintError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        // if(error.name == 'SequelizeUniqueConstraintError'){
        //     throw new AppError('City name already exists', StatusCodes.BAD_REQUEST);
        // }
        throw new AppError('Cannot create the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities(){
    try {
        const response = await cityRepository.getAll();
        return response;
    } catch (error) {
        throw new AppError('Cannot fetch data of all the cities', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id){
    try {
        const response = await cityRepository.get(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested is not available', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot fetch data of the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested to delete is not available', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot delete the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function updateCity(id, data) {
    try {
        const response = await cityRepository.update(id, data);
        return response;
    } catch (error) {
        if(error.name == 'SequelizeValidationError'){
            let explanation = [];
            error.errors.forEach(err => {
                explanation.push(err.message);
            });
            throw new AppError(explanation, StatusCodes.BAD_REQUEST);
        }
        if(error.statusCode == StatusCodes.NOT_FOUND){
            throw new AppError('The city you requested to update is not available', StatusCodes.NOT_FOUND);
        }
        throw new AppError('Cannot update the city', StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
}