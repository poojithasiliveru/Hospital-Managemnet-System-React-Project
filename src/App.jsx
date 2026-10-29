// import React,{useState} from 'react'
// import Home from './Home.jsx'
// import Signup from './Signup.jsx';
// import Patients from './Patients.jsx';

// function App(){
//   const [username,setUsername]=useState('Codegnan Hospital');
//   return (
//     <>
//     <Patients/>
//     <Home hospitalname={username}/>
//     <Signup/><br/>
//     {/*<p>Hooks Concept in react,state management system-useState,
//       Props,Event handling, form handling, controlled input</p>
//     <h1>{username}</h1>*/}
//     <button onClick={()=>setUsername('No.1 Hospitals')}>Update name</button>
//     </>
//   )
// } 
// export default App

import React,{createContext} from "react"
import Home from './Home'
import Patients from './Patients'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Navigate from './Navigate';
import Doctors from './Doctors';
import SinglePatient from './SinglePatient';
import SingleDoctor from "./SingleDoctor";
import NotFound from "./NotFound";
import Signup from "./Signup";
import ProtectedRoute from "./ProtectedRoute";

export const HospitalContext=createContext()

function App(){
  const hospitaldetails={
    CEO:"John",
    HospitalName:'CG',
    year:1950
  }
  return(
    <>
    <HospitalContext.Provider value={hospitaldetails}>
      <BrowserRouter>
    <Navigate/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/patients" element={
        <ProtectedRoute>
          <Patients/>
        </ProtectedRoute>}/>
      <Route path="/doctors" element={
        <ProtectedRoute>
          <Doctors/>
        </ProtectedRoute>
      }/>
      <Route path="/patients/:id" element={<SinglePatient/>}/>
      <Route path="/doctors/:id" element={<SingleDoctor/>}/>
      <Route path="*" element={<NotFound/>}/>
      <Route path="/signup" element={<Signup/>}/>
    </Routes>
      </BrowserRouter>
    </HospitalContext.Provider>
    </>
  )
}
export default App
