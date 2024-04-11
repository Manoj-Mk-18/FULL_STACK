import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const [employees, setEmployee] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [errorMessage, setErrorMessage] = useState('');
  
 
 
  

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
      setSearchResults([]); // Clear search results if search term is empty
    }

    if (searchResults.length === 0) {
      setErrorMessage('No employees found for the search term...');
    } else {
      setErrorMessage(''); // Clear any previous errors
    }
  
  };

 

   
    
  return (
    
    <div className="container">
      <div className="mt-4">
      <div className="col-lg-6">
          <input type="text" id="search" placeholder="Search here..." value={searchTerm} onChange={(e)=>handleInput(e)}/>
        </div>
        <div className="col-lg-6 mt-5 center"> </div>
        {/* {errorMessage && <p className="text-danger">{errorMessage}</p>} */}
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
         searchResults.map((employee, index) => (
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
        ))
      ) : (

          
    errorMessage ? (
      <tr>
        <td colSpan="6" className="text-center text-danger">
          {errorMessage}
        </td>
      </tr>



    ) : (



        employees.map((employee, index) => ( 
          <tr key={employee.id}>
            <td>{index+1}</td>
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
        ))

       
      ) 
      )
     }

     
    
          </tbody>
          


     
        </table>

        <Link
          to={`add`}
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#myModal"
        >
          Add
        </Link>
       
      </div>
    </div>
   
  );
 
};

export default EmployeeList;


// const [data, setData] = useState([]);
// const [currentPage, setCurrentPage] = useState(1);
// const [postsPerPage] = useState(10); // Number of items per page
// const [isLoading, setIsLoading] = useState(false); // Optional

// useEffect(() => {
//   const fetchData = async () => {
//     setIsLoading(true);
//     const response = await Axios.get('https://your-backend-api/data'); // Replace with your API endpoint
//     setData(response.data);
//     setIsLoading(false);
//   };
//   fetchData();
// }, []);

// const indexOfLastPost = currentPage * postsPerPage;
// const indexOfFirstPost = indexOfLastPost - postsPerPage;
// const currentPageData = data.slice(indexOfFirstPost, indexOfLastPost);

// const paginate = (pageNumber) => setCurrentPage(pageNumber);

// const totalPageCount = Math.ceil(data.length / postsPerPage);

// return (
//   <div>
//     {isLoading ? (
//       <p>Loading data...</p>
//     ) : (
//       <>
//         {currentPageData.map((item) => (
//           <div key={item.id}> {/* Render each item */} </div>
//         ))}
//         {totalPageCount > 1 && (
//           <Pagination
//             postsPerPage={postsPerPage}
//             totalPageCount={totalPageCount}
//             currentPage={currentPage}
//             paginate={paginate}
//           />
//         )}
//       </>
//     )}
//   </div>
// );
// }

// function Pagination({ postsPerPage, totalPageCount, currentPage, paginate }) {
// const pageNumbers = [];
// for (let i = 1; i <= Math.ceil(totalPageCount / postsPerPage); i++) {
//   pageNumbers.push(i);
// }

// return (
//   <ul className="pagination">
//     {pageNumbers.map((pageNumber) => (
//       <li key={pageNumber} className={pageNumber === currentPage ? 'active' : ''}>
//         <a onClick={() => paginate(pageNumber)} href="#">
//           {pageNumber}
//         </a>
//       </li>
//     ))}
//   </ul>import React, { useState, useEffect } from 'react';





// import axios from 'axios';
// import Pagination from 'react-paginate';

// const MyPaginationComponent = () => {
//     const [currentPage, setCurrentPage] = useState(0); // Page number (starts from 0)
//     const [data, setData] = useState([]);
//     const [totalPages, setTotalPages] = useState(0); // Total number of pages

//     const pageSize = 10; // Items per page (adjust as needed)

//     useEffect(() => {
//         const fetchData = async () => {
//             const response = await axios.get(`/api/data?page=${currentPage + 1}`); // Adjust URL based on your backend route
//             setData(response.data.items);
//             setTotalPages(Math.ceil(response.data.totalItems / pageSize));
//         };

//         fetchData();
//     }, [currentPage]); // Re-fetch data on page change

//     const handlePageChange = (data) => {
//         setCurrentPage(data.selected);
//     };

//     // ... (render pagination controls and data)
// };

// export default MyPaginationComponent;