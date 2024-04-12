import React from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';
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
           navigate("/");
           Swal.fire({
            icon: 'success',
            title: 'Employee Updated!',
            text: 'New employee has been successfully Updated...',
          }).then(() => {
            clearupdateEmployeeInput();
            handleCloseAddEmployeeModal();
    
            getEmployees();
          });
    
        } catch (error) {
          console.error('Error creating employee:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'An error occurred while creating employee. Please try again.',
          });
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
    <div className='container mt-5'>
    <div className='row'>
    <div className='col-lg-5 ms-5'>
       
        <form onSubmit={updateEmployee}>
          <div className='mb-4'>
            <label> Name : </label>
            <input type='text' className='form-control' value={name} onChange={(e)=> setName(e.target.value)}/>
          </div>

          <div className='mb-4'>
            <label> License_No : </label>
            <input type='text' className='form-control' value={license_no} onChange={(e)=> setLicense_no(e.target.value)}/>
          </div>

          <div className='mb-4'>
            <label> Age : </label>
            <input type='text' className='form-control' value={age} onChange={(e)=> setAge(e.target.value)}/>
          </div>

          <div className='mb-4'>
            <label> Salary : </label>
            <input type='text' className='form-control' value={salary} onChange={(e)=> setSalary(e.target.value)}/>
          </div>

          <div className="text-center">
                      <button class="btn btn-primary" type='submit' onClick={updateEmployee}> Update </button>
          </div>

        </form>
    </div>
    </div>
    </div>
      

    
       
    
  

  
    
  );
}

export default EditEmployee;