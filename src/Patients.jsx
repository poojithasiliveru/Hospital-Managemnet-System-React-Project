import React,{useState,useEffect,useMemo} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import useFetch from './useFetch';

function Patients(){

    const[search,setSearch]=useState('');
    const{data,load,error}=useFetch('https://doc-back.onrender.com/patients')

    const filteredPatients=useMemo(()=>{
        return data.filter((patient)=>{
        console.log(search)
        return patient.name.toLowerCase().includes(search.toLowerCase())||
        patient.age.includes(search)
    })
},[search])

    if(load){
        return <center><h1>Patients Loading...</h1></center>
    }
    if(error){
        return <h1>Patients error...</h1>
    }
    return(
        <>
        <div> 
            <center><input type="text" placeholder='Enter Patient Information' name='search' className='searchbox' value={search}
            onChange={(e)=>setSearch(e.target.value)} /></center>
        {
            filteredPatients.length===0?
            <>
            <center><h1>Patients Not found</h1></center>
            </>:
            <>
            <center><h1>Patients Information</h1></center>
            <div className="patients-container">
                {
                    filteredPatients.map((v,i)=>(
                        <div key={v.id}>
                            <h2>Patient Name:{v.name}</h2>
                            <h3>Disease:{v.disease}</h3>
                            <h3>Gender:{v.gender}</h3>
                            <h4>Weight:{v.weight}</h4>
                            <h4>Email:{v.email}</h4>
                            <h4>Age:{v.age}</h4>
                            <Link to={`/patients/${v.id}`}>View Patient</Link>
                            
                        </div>
                    ))
                }
            </div>
            </>
        }
        </div>
        </>
    )
}
export default Patients