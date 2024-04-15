import User from "../models/UserModel.js";
import { Op } from "sequelize";

export class EmployeeRepository {
  async getAllEmployees() {
    return await User.findAll();
  }

  async searchEmployees(response) {
    return await User.findAll({
      where: {
        [Op.or]: [
         
          { name: { [Op.like]: `%${response}%` } },
          { license_no: { [Op.like]: `%${response}%` } },
          { age: { [Op.like]: `%${response}%` } },
          { salary: { [Op.like]: `%${response}%` } },
        ],
      },
    });
  }

  async getEmployeeById(id) {
    return await User.findOne({
      where: {
        id: id,
      },
    });
  }

  async createEmployee(response) {
    return await User.create({
      name: response.name,
      license_no: response.license_no,
      age: response.age,
      salary: response.salary,
    });
  }

  async updateEmployee(id, response) {
    return await User.update(response, {
      where: {
        id: id,
      },
    });
  }

  async deleteEmployee(id) {
    return await User.destroy({
      where: {
        id: id,
      },
    });
  }
}

export default EmployeeRepository;
