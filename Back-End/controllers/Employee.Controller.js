import User from "../models/UserModel.js";
import EmployeeService from "../Services/Employee.service.js";




// export class  Employeecontroller {


//     constructor() {
        // this.employeeService = new EmployeeService();
//       }

    
    const employeeService = new EmployeeService();

     export async function getAllEmployees(req,res) {
        try {
          const employees = await employeeService.getAllEmployees();
          res.status(200).json(employees);
          console.log("Controller Layer");
        } catch (error) {
          console.error('Error retrieving employees:', error);
          res.status(500).json({ error: 'Internal server error' });
        }
      }
    

   
    

    


// export const getEmployees = async(req, res)=>{
//     try{
//         const response = await User.findAll();
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

// export const searchEmployees = async(req, res)=>{
//     const { query } = req.query;
  
//     try {
//       const response = await User.findAll({
//         where: {
//           [Op.or]: [
//             { name: { [Op.like]: `%${query}%` } },
//             { license_no: { [Op.like]: `%${query}%` } },
//             { age: { [Op.like]: `%${query}%` } },
//             { salary: { [Op.like]: `%${query}%` } },
//           ],
//         },
//       });
//       res.status(200).json(response);
//     } catch (error) {
//        console.log(error.message);
//     }
//   };


// export const getEmployeeById = async(req, res)=>{
//     try{
//         const response = await User.findOne({
//             where:{
                
//                  id: req.params.id
//             }
//         });
//         res.status(200).json(response);
//     } catch (error) {
//         console.log(error.message);
//     }
// }


export async function  searchEmployees(req,res) {
  try {
    const response = req.params.search;
    const employees = await employeeService.searchEmployees(response);
    res.status(200).json(employees);
    console.log("Controller Layer");
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}


export async function getEmployeeById(req,res) {
    try {
      const id = req.params.id;
      const employees = await employeeService.getEmployeeById(id);
      res.status(200).json(employees);
      console.log("Controller Layer");
    } catch (error) {
      console.error('Error retrieving employees:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

// export const createEmployee = async(req, res)=>{
//     try{
//         await User.create(req.body);
//         res.status(201).json({msg: "Employee Created Successfully"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }


export async function Employees(req,res) {
  try {
    const { page = 1, limit = 10 } = req.query; 
    const employees = await employeeService.Employees(page,limit);
    res.status(200).json({ employees });
    console.log("Controller Layer");
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




export async function createEmployee(req,res) {
    try {
      const response = req.body;
      const employees = await employeeService.createEmployee(response);
      res.status(201).json({msg: "Employee Created Successfully"});
      
    } catch (error) {
      console.error('Error retrieving employees:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }


// export const updateEmployee = async(req, res)=>{
//     try{
//         await User.update(req.body,{
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Employee Updated Successfully"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }


export async function updateEmployee(req,res) {
  try {
    const id = req.params.id;
    const response = req.body;
    const employees = await employeeService.updateEmployee(id,response);
    res.status(200).json({msg:"Employee Updated Successfully"});
    console.log("Controller Layer");
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// export const deleteEmployee = async(req, res)=>{
//     try{
//         await User.destroy({
//             where:{
//                 id: req.params.id
//             }
//         });
//         res.status(200).json({msg: "Employee Deleted Successfully"});
//     } catch (error) {
//         console.log(error.message);
//     }
// }


export async function deleteEmployee(req,res) {
  try {
    const id = req.params.id;
    const employees = await employeeService.deleteEmployee(id);
    res.status(200).json({msg:"Employee Deleted Successfully"});
    console.log("Controller Layer");
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
