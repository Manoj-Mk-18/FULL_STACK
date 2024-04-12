import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Papa from 'papaparse';


const EmployeeList = () => {
  const [employees, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); 
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState("");
  const [license_no, setLicense_no] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState("csv"); 
 
 
 
  

  useEffect(() => {

    getEmployees();
   
   
    
  }, []);

  const getEmployees = async () => {
    const response = await axios.get("http://localhost:3000/getemployees");
    setEmployee(response.data);
    
  };

  

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/deleteemployee/${id}`);
      getEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = async (event) => {
    const search = event.target.value;
    console.log(search);
    setSearchTerm(search)

    if (search) {
      try {
        const response = await axios.get(`http://localhost:3000/searchemployee/${search}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error('Error fetching search results:', error);
       
      }
    } else {
      setSearchResults([]); 
    }

    if (searchResults.length === 0) {
      setErrorMessage('No employees found for the search term...');
    } else {
      setErrorMessage(''); 
    }
  
  };

  const PER_PAGE = 5;
  const [currentPage, setCurrentPage] = useState(0);
  function handlePageClick({ selected: selectedPage }) {
      setCurrentPage(selectedPage)
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(employees.length / PER_PAGE);

  let counter = offset;

  const handleCloseAddEmployeeModal = () => setShowAddEmployeeModal(false);
  const handleOpenAddEmployeeModal = () => setShowAddEmployeeModal(true);


  const addEmployee = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/createemployee', {
        name,
        license_no,
        age,
        salary
      });
      handleCloseAddEmployeeModal();
    
      getEmployees(); 
    } catch (error) {
      console.log(error);
    }
  };


  const  handleDownload = async () => {
    const employeeData = employees.map((employee) => ({
     
      id: employee.id,
      name: employee.name,
      license_no: employee.license_no,
      age: employee.age,
      salary: employee.salary,
    }));
    const csvContent = Papa.unparse(employeeData); 

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" }); // Create blob
    const url = window.URL.createObjectURL(blob); 

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `employees.${downloadFormat}`); 

    document.body.appendChild(link); 
    link.click(); 

    document.body.removeChild(link); 
    window.URL.revokeObjectURL(url); 
  }
    
  return (
    
    <div className="container">
      <div className="mt-4">
      <div className="col-lg-6">
          <input type="text" id="search" placeholder="Search here..." value={searchTerm} onChange={(e)=>handleInput(e)}/>
        </div>
        <div className="col-lg-6 mt-5 center"> </div>
        <table className="table table-hover table-bordered text-center table-striped mt-3 shadow-lg">
          <thead>
            <tr>
              <th> SI No </th>
              <th> Name </th>
              <th> License_No </th>
              <th> Age </th>
              <th> Salary </th>
              <th> Action </th>
            </tr>
          </thead>

          <tbody>
         
          {searchResults.length > 0 ? ( 
         searchResults.map((employee, index) =>{
          return(
          <tr key={index}>
            <td>{employee.id}</td>
            <td>{employee.name}</td>
            <td>{employee.license_no}</td>
            <td>{employee.age}</td>
            <td>{employee.salary}</td>
            <td>
                    <Link
                      to={`edit/${employee.id}`}
                      className="btn btn-primary text-center"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteEmployee(employee.id)}
                      className="btn btn-danger ms-3 text-center"
                    >
                      Delete
                    </button>
              </td>
          </tr>
        )
      })
      ) : (

          
    errorMessage ? (
      <tr>
        <td colSpan="6" className="text-center text-danger">
          {errorMessage}
        </td>
      </tr>



    ) : 
    
    (


     
        employees.slice(offset, offset + PER_PAGE).map((employee, index) => {
        counter++;
        return(    
          <tr key={employee.id}>
            <td>{counter}</td>
            <td>{employee.name}</td>
            <td>{employee.license_no}</td>
            <td>{employee.age}</td>
            <td>{employee.salary}</td>
             <td>
                    <Link
                      to={`edit/${employee.id}`}
                      className="btn btn-primary text-center"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteEmployee(employee.id)}
                      className="btn btn-danger ms-3 text-center"
                    >
                      Delete
                    </button>
              </td>
          </tr>

        )


       
        }) 
      )
     )}

    
    
          </tbody>
          


     
        </table>

        <Link to={`add`} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addEmployeeModal" onClick={handleOpenAddEmployeeModal}>
             Add
        </Link>
        <div className="modal" id="addEmployeeModal" tabIndex="-1" aria-labelledby="addEmployeeModalLabel" aria-hidden={!showAddEmployeeModal}>
  <div className="modal-dialog">
    <div className="modal-content">
    <div className="modal-header">
        <h1 className="modal-title fs-5" id="staticBackdropLabel">Add Employee</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className='body'>
        <form onSubmit={addEmployee}>
          <div className='mt-4 mb-4 ms-3'>
            <label> Name : </label>
            <input type='text' className='form-control' value={name} onChange={(e)=> setName(e.target.value)}/>
          </div>

          <div className='mb-4 ms-3'>
            <label> License_No : </label>
            <input type='text' className='form-control' value={license_no} onChange={(e)=> setLicense_no(e.target.value)}/>
          </div>

          <div className='mb-4 ms-3'>
            <label> Age : </label>
            <input type='text' className='form-control' value={age} onChange={(e)=> setAge(e.target.value)}/>
          </div>

          <div className='mb-4 ms-3'>
            <label> Salary : </label>
            <input type='text' className='form-control' value={salary} onChange={(e)=> setSalary(e.target.value)}/>
          </div>
         
        <div className="modal-footer">

        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button className="btn btn-primary" type='submit' onClick={addEmployee}> Add </button>
        
        </div>
        

        </form>
    </div>
    </div>
  </div>
</div>
<div className="mb-4 mt-4">
      <button onClick={handleDownload}  className="btn btn-primary">Download as {downloadFormat}</button>
      <input
        id="csvFormat"
        name="downloadFormat"
        value="csv"
        checked={downloadFormat === "csv"}
        onChange={(e) => setDownloadFormat(e.target.value)}
      />
   </div>

        <div className="mb-4 mt-4">
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    breakLabel={"..."}
                    pageCount={pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination  justify-content-center"}
                    pageClassName={"page-item "}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active primary"}
                />
            </div>        
       
      </div>
    </div>
   
  );
 
};

export default EmployeeList;
