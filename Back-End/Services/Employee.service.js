import  {EmployeeRepository}  from "../Repositories/Employee.Repository.js";

export class EmployeeService {
  
    constructor() {
      this.employeeRepository = new EmployeeRepository();
    }
  
    async getAllEmployees() {

      return await this.employeeRepository.getAllEmployees();

      console.log("Service Layer");
    }

    async searchEmployees(response) {

      return await this.employeeRepository.searchEmployees(response);

      console.log("Service Layer");

     
    }


    async getEmployeeById(id) {

      return await this.employeeRepository.getEmployeeById(id);

      console.log("Service Layer");

     
    }

    async Employees(page,limit) {

      return await this.employeeRepository.Employees(page,limit);

      console.log("Service Layer");

     
    }

    async createEmployee (response) {

      return await this.employeeRepository. createEmployee(response);

      console.log("Service Layer");

     
    }

    async updateEmployee (id,response) {

      return await this.employeeRepository. updateEmployee(id,response);

      console.log("Service Layer");

     
    }

    async deleteEmployee (id) {

      return await this.employeeRepository. deleteEmployee(id);

      console.log("Service Layer");

     
    }

    
   



  }

  export default EmployeeService;