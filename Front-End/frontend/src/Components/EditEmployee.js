import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const [name, setName] = useState("");
    const [license_no, setLicense_no] = useState("");
    const [age, setAge] = useState("");
    const [salary, setSalary] = useState("");
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {

      getEmployeeById(id);

    },[id]);

    const updateEmployee = async (e) =>{
       e.preventDefault();
       try {
           await axios.put(`http://localhost:3000/updateemployee/${id}`, {
  
             name,
             license_no,
             age,
             salary
  
           });
           Swal.fire({
            icon: 'success',
            title: 'Employee Updated!',
            // text: 'Employee has been Updated Successfully...',
            timer: 2000
          })
           navigate("/");
       } catch (error){
          console.log(error);
       }
    };

    const getEmployeeById = async (id) => {

      const response = await axios.get(`http://localhost:3000/getEmployeeById/${id}`);
      setName(response.data.name);
      setLicense_no(response.data.license_no);
      setAge(response.data.age);
      setSalary(response.data.salary);

    };

    

   

   

  return (

    <div className="container mt-5">
      <div className="row gx-5 justify-content-center">
        <div className="col-md-8 col-lg-5">
          <div className="update-employee-form card shadow-sm p-4">
            <h4 className="text-center mb-4">Update Employee</h4>

            <form onSubmit={updateEmployee}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="license_no" className="form-label">License No:</label>
                <input
                  type="text"
                  className="form-control"
                  id="license_no"
                  value={license_no}
                  onChange={(e) => setLicense_no(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="age" className="form-label">Age:</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="salary" className="form-label">Salary:</label>
                <input
                  type="number"
                  className="form-control"
                  id="salary"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                />
              </div>

              <div className="text-center">
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

  
    

export default EditEmployee;

