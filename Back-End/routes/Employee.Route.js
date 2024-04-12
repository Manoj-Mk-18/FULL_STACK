import express from "express";
// import { Employeecontroller } from "../controllers/Employee.Controller.js";
import {
        getAllEmployees,
        searchEmployees,
        getEmployeeById, 
        Employees,
        createEmployee, 
        updateEmployee, 
        deleteEmployee  } from "../controllers/Employee.Controller.js"

const router = express.Router();

router.get('/getemployees', getAllEmployees);
router.get('/searchemployee/:search', searchEmployees);
router.get('/getEmployeeById/:id', getEmployeeById);
router.get('/employees', Employees);
router.post('/createemployee', createEmployee);
router.put('/updateemployee/:id', updateEmployee);
router.delete('/deleteemployee/:id', deleteEmployee);

export default router;