import { EmployeeRepository } from "../Repositories/Employee.Repository.js";

export class EmployeeService {
  constructor() {
    this.employeeRepository = new EmployeeRepository();
  
  }

  async getAllEmployees() {
    return await this.employeeRepository.getAllEmployees();
    
  }

  async searchEmployees(response) {
    return await this.employeeRepository.searchEmployees(response);
  }

  async getEmployeeById(id) {
    return await this.employeeRepository.getEmployeeById(id);
  }

  async createEmployee(response) {
    return await this.employeeRepository.createEmployee(response);
  }

  async updateEmployee(id, response) {
    return await this.employeeRepository.updateEmployee(id, response);
  }

  async deleteEmployee(id) {
    return await this.employeeRepository.deleteEmployee(id);
  }
}

export default EmployeeService;
