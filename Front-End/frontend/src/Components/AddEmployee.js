import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [license_no, setLicense_no] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const navigate = useNavigate();

  const addEmployee = async (e) =>{
     e.preventDefault();
     try {
         await axios.post('http://localhost:3000/createemployee', {

           name,
           license_no,
           age,
           salary

         });
         navigate("/");
     } catch (error){
        console.log(error);
     }
  };
  return (
    <div className='container mt-5'>
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#myModal">
         Add Employee
      </button>
    <div className="modal" id="myModal" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
   <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Employee</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className='body'>
        <form onSubmit={addEmployee}>
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

        <div class="modal-footer">

        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button class="btn btn-primary" type='submit' onClick={addEmployee}> Add </button>
        
        </div>
        

        </form>
    </div>
    </div>
    </div>
    </div>
    </div>
   
   
      

  );
}

export default AddEmployee;