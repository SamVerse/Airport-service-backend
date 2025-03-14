const { StatusCodes } = require("http-status-codes");
const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");

class crudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
      const response = await this.model.create(data);
      return response;
  }

  async destroy(data) {
      const response = await this.model.destroy({ where: { id: data } });
      if(!response){
          throw new AppError('Not able to delete the resource', StatusCodes.NOT_FOUND);
      }
      return response;
  }

  async get(data) {
      const response = await this.model.findByPk(data);
      if(!response){
          throw new AppError('Not able to find the resource', StatusCodes.NOT_FOUND);
      }
      return response;
    
  }

    async getAll() {
        const response = await this.model.findAll();
        return response;
        
    }

    async update(id , data) { // data is the object to be updated eg. {name: "new name"}
        const response = await this.model.update(data, { where: { id } });
        // response[0] is the number of rows affected so if it is 0 then no rows are updated
        if(response[0] === 0){
            throw new AppError('Not able to update the resource', StatusCodes.NOT_FOUND);
        }
        return response;
    }

    async updateAll(data) {
        const response = await this.model.update(data);
        return response;
    }

}

module.exports = crudRepository;