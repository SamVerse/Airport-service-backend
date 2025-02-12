const { Logger } = require("../config");

class crudRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    try {
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the crud repo: Service: create");
      throw error;
    }
  }

  async destroy(data) {
    try {
      const response = await this.model.destroy({ where: { id: data } });
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the crud repo: Service: destroy");
      throw error;
    }
  }

  async get(data) {
    try {
      const response = await this.model.findByPk(data);
      return response;
    } catch (error) {
      Logger.error("Something went wrong in the crud repo: Service: get");
      throw error;
    }
  }

    async getAll() {
        try {
        const response = await this.model.findAll();
        return response;
        } catch (error) {
        Logger.error("Something went wrong in the crud repo: Service: getAll");
        throw error;
        }
    }

    async update(id , data) { // data is the object to be updated eg. {name: "new name"}
        try {
        const response = await this.model.update(data, { where: { id } });
        return response;
        } catch (error) {
        Logger.error("Something went wrong in the crud repo: Service: update");
        throw error;
        }
    }

}

module.exports = crudRepository;