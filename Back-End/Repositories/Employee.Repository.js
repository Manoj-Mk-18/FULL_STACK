import User from "../models/UserModel.js";
import { Op } from "sequelize";


    export class EmployeeRepository {
      
      async getAllEmployees() {

        return await User.findAll();

        console.log("Repository Layer");
       
      }

      
      async searchEmployees(response) {

        console.log(response);
          
        return await User.findAll({
          where:{
          [Op.or]: [
               
                        { name: { [Op.like]: `%${response}%` } },
                        { license_no: { [Op.like]: `%${response}%` } },
                        { age: { [Op.like]: `%${response}%` } },
                        { salary: { [Op.like]: `%${response}%` } },
                   ],
                
           
          }
          

         });  
       
      }


      async getEmployeeById(id) {

        console.log(id);
          
        return await User.findOne({

          where:{
                
            id: id
          }
          

        });

       
       
      }

      async Employees(page = 1, limit = 10) {
        const offset = (page - 1) * limit;

        const { rows: employees, count: totalEmployees } = await User.findAndCountAll({
            limit,
            offset
        });

        return { employees, totalEmployees };
    }









      async createEmployee (response) {

        return await User.create({

          name: response.name,
          license_no: response.license_no,
          age: response.age,
          salary: response.salary

         

      });
    
      }

      async updateEmployee(id,response) {

        console.log(id);
          
        return await User.update(response,{
          where:{
                
            id: id

          }
          

        });        

  }

  async deleteEmployee(id) {

    console.log(id);
      
    return await User.destroy({

      where:{
            
        id: id

      }
      

    });
}






}

export default EmployeeRepository;



// app.get('/users/:page', (req, res) => {
//   const page = parseInt(req.params.page);
//   const limit = 10; // Number of items per page
//   const offset = (page - 1) * limit;

//   User.findAndCountAll()
//       .then(([users, count]) => {
//           res.json({ users, count, page, totalPages: Math.ceil(count / limit) });
//       })
//       .catch(error => console.error(error));
// });
