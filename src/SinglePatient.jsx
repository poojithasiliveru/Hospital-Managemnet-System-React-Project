import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function SinglePatient(){
    const[data,setData]=useState([])
    const{id}=useParams()

    async function getPatients(){
        try{
            const res=await axios.get(`https://doc-back.onrender.com/patients/${id}`)
            console.log(res.data);
            setData(res.data)
        }
        catch(error){
            console.log('Patient details not allowed',error);
        }
        finally{
            console.log('Patient details');
        }
    }
    //useEffect(function,dependency)
    useEffect(()=>{
        getPatients()
    },[])

    return(
        <div>

        {
            data.length===0?
            <>
            <h1>Patients Not found</h1>
            </>:
            <>
            <h1>Single Patient Information</h1>
                        <div>
                            <h2>Patient Name:{data.name}</h2>
                            <h3>Disease:{data.disease}</h3>
                            <h3>Gender:{data.gender}</h3>
                            <h4>Weight:{data.weight}</h4>
                            <h4>Email:{data.email}</h4>
                            <h4>Age:{data.age}</h4>
                        </div>
            </>
        }
        </div>
    )
}
export default SinglePatient