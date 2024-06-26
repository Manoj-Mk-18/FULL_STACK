import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import EmployeeList from "./Components/EmployeeList";
// import AddEmployee from "./Components/AddEmployee";
import EditEmployee from "./Components/EditEmployee";





function App() {

  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
            <Route exact path="/" element={<EmployeeList/>}/>
            {/* <Route exact path="add" element={<AddEmployee/>}/> */}
            <Route exact path="edit/:id" element={<EditEmployee/>}/>
            
           

       </Routes>
      </BrowserRouter>

      
     
    </div>
  );
 
}

export default App;
