import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import Papa from "papaparse";

const EmployeeList = () => {
  const [employees, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [license_no, setLicense_no] = useState("");
  const [age, setAge] = useState("");
  const [salary, setSalary] = useState("");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [downloadFormat, setDownloadFormat] = useState("csv");
  const PER_PAGE = 5;



  useEffect(() => {
    getEmployees();
    validateForm();
  }, [name, license_no, age, salary, touched]);

  const getEmployees = async () => {
    const response = await axios.get("http://localhost:3001/getemployees");
    setEmployee(response.data);
  };

  const deleteEmployee = async (id) => {
    if (window.confirm("Are You Sure You want to Delete this Employee?")) {
      try {
        await axios.delete(`http://localhost:3001/deleteemployee/${id}`);
        getEmployees();
        Swal.fire({
          icon: "success",
          title: "Employee Deleted!",
          text: "Employee has been Deleted Successfully...",
          timer: 3000,
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("Deletion cancelled");
    }
  };

  const handleInput = async (event) => {
    const search = event.target.value;
    setSearchTerm(search);

    if (search) {
      try {
        const response = await axios.get(
          `http://localhost:3001/searchemployee/${search}`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }

    if (searchResults.length === 0) {
      setErrorMessage("No employees found for the search term...");
    } else {
      setErrorMessage("");
    }
  };
 
  function handlePageClick({ selected: selectedPage }) {
    setCurrentPage(selectedPage);
  }
  const offset = currentPage * PER_PAGE;
  const pageCount = Math.ceil(employees.length / PER_PAGE);

  const handleCloseAddEmployeeModal = () => setShowAddEmployeeModal(false);
  const handleOpenAddEmployeeModal = () => setShowAddEmployeeModal(true);

  const validateForm = () => {
    let errors = {};
    let isValidForm = true;

    if (touched.name && name.trim() === "") {
      errors.name = "*Name is required";
      isValidForm = false;
    }

    if (touched.license_no && license_no.trim() === "") {
      errors.license_no = "*License number is required";
      isValidForm = false;
    }

    if (touched.age && age.trim() === "") {
      errors.age = "*Age is required";
      isValidForm = false;
    } else if (!/^\d+$/.test(age)) {
      errors.age = "*Age must be a valid number";
      isValidForm = false;
    }

    if (touched.salary && salary.trim() === "") {
      errors.salary = "*Salary is required";
      isValidForm = false;
    } else if (!/^\d+$/.test(salary)) {
      errors.salary = "*Salary must be a valid number";
      isValidForm = false;
    }

    setErrors(errors);
    setIsValid(isValidForm);
  };

  const handleBlur = (field) => {
    setTouched({ ...touched, [field]: true });
  };

  const addEmployee = async (e) => {
    e.preventDefault();
    if (isValid) {
      try {
        await axios.post("http://localhost:3001/createemployee", {
          name,
          license_no,
          age,
          salary,
        });
        Swal.fire({
          icon: "success",
          title: "Employee Added!",
          text: "New Employee has been Created Successfully...",
          timer: 3500,
        }).then(() => {
          setName("");
          setLicense_no("");
          setAge("");
          setSalary("");
          handleCloseAddEmployeeModal();
        });
      } catch (error) {
        console.error("Error creating employee:", error);
        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "An error occurred while creating employee. Please try again...",
        });
      }
    }
  };

  const handleDownload = async () => {
    const employeeData = employees.map((employee) => ({
      id: employee.id,
      name: employee.name,
      license_no: employee.license_no,
      age: employee.age,
      salary: employee.salary,
    }));
    const csvContent = Papa.unparse(employeeData);

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `employees.${downloadFormat}`);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <div className="mt-4">
        <div className="col-lg-6">
          <h3 className="header"> Crud Operation </h3>
          <input
            type="text"
            id="search"
            placeholder=" Search here..."
            value={searchTerm}
            onChange={(e) => handleInput(e)}
          />
        </div>
        <div className="col-lg-6 mt-4 center"> </div>
        <table className="table table-hover table-bordered text-center table-striped mt-3 shadow-lg">
          <thead>
            <tr>
              <th> ID </th>
              <th> Name </th>
              <th> License_No </th>
              <th> Age </th>
              <th> Salary </th>
              <th> Action </th>
            </tr>
          </thead>

          <tbody>
            {searchResults.length > 0 ? (
              searchResults.map((employee, index) => {
                return (
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
                );
              })
            ) : errorMessage ? (
              <tr>
                <td colSpan="6" className="text-center text-danger">
                  {errorMessage}
                </td>
              </tr>
            ) : (
              employees
                .slice(offset, offset + PER_PAGE)
                .map((employee, index) => {
                  return (
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
                  );
                })
            )}
          </tbody>
        </table>

        <Link
          to={`add`}
          className="btn btn-secondary"
          data-bs-toggle="modal"
          data-bs-target="#addEmployeeModal"
          onClick={handleOpenAddEmployeeModal}
        >
          Add
        </Link>
        <div
          className="modal"
          id="addEmployeeModal"
          tabIndex="-1"
          aria-labelledby="addEmployeeModalLabel"
          aria-hidden={!showAddEmployeeModal}
        >
          <div className="modal-dialog">
            <div className="modal-content bg-info">
              <div className="modal-header">
                <h1 className="modal-title fs-5">Add Employee</h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="body ms-1">
                <form onSubmit={addEmployee}>
                  <div className="mt-4 mb-4 ms-3">
                    <label> Name : </label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => handleBlur("name")}
                    />
                    {touched.name && errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>

                  <div className="mb-4 ms-3">
                    <label> License_No : </label>
                    <input
                      type="text"
                      className="form-control"
                      value={license_no}
                      onChange={(e) => setLicense_no(e.target.value)}
                      onBlur={() => handleBlur("license_no")}
                    />
                    {touched.license_no && errors.license_no && (
                      <div className="text-danger">{errors.license_no}</div>
                    )}
                  </div>

                  <div className="mb-4 ms-3">
                    <label> Age : </label>
                    <input
                      type="text"
                      className="form-control"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      onBlur={() => handleBlur("age")}
                    />
                    {touched.age && errors.age && (
                      <div className="text-danger">{errors.age}</div>
                    )}
                  </div>

                  <div className="mb-4 ms-3">
                    <label> Salary : </label>
                    <input
                      type="text"
                      className="form-control"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      onBlur={() => handleBlur("salary")}
                    />
                    {touched.salary && errors.salary && (
                      <div className="text-danger">{errors.salary}</div>
                    )}
                  </div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      className="btn btn-primary"
                      type="submit"
                      onClick={addEmployee}
                      data-bs-dismiss="modal"
                      disabled={!isValid}
                    >
                      {" "}
                      Add{" "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-4 mt-4">
          <button
            onClick={handleDownload}
            className="btn btn-primary"
            id="b3"
            onChange={(e) => setDownloadFormat(e.target.value)}
          >
            Download
          </button>
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
