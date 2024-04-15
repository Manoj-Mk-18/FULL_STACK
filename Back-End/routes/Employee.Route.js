import express from "express";
import {
        getAllEmployees,
        searchEmployees,
        getEmployeeById, 
        createEmployee, 
        updateEmployee, 
        deleteEmployee  } from "../controllers/Employee.Controller.js"

const router = express.Router();

router.get('/getemployees', getAllEmployees);
router.get('/searchemployee/:search', searchEmployees);
router.get('/getEmployeeById/:id', getEmployeeById);
router.post('/createemployee', createEmployee);
router.put('/updateemployee/:id', updateEmployee);
router.delete('/deleteemployee/:id', deleteEmployee);

export default router;