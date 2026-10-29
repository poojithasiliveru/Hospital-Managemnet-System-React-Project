import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';

function SingleDoctor(){
    const[data,setData]=useState([])
    const{id}=useParams()

    async function getDoctors(){
        try{
            const res=await axios.get(`https://doc-back.onrender.com/doctors/${id}`)
            console.log(res.data);
            setData(res.data)
        }
        catch(error){
            console.log('Doctor details not allowed',error);
        }
        finally{
            console.log('Doctor details');
        }
    }
    //useEffect(function,dependency)
    useEffect(()=>{
        getDoctors()
    },[])
    return(
        <div>
        {
            data.length===0?
            <>
            <h1>Doctors Not found</h1>
            </>:
            <>
            <h1>Single Doctor Information</h1>
                        <div>
                            <h2>Doctor Name:{data.name}</h2>
                            <h3>specialization:{data.specialization}</h3>
                            <h3>Salary:{data.salary}</h3>
                            <h3>Gender:{data.gender}</h3>
                            <h4>Age:{data.age}</h4>
                        </div>
            </>
        }
        </div>
    )
}
export default SingleDoctor
