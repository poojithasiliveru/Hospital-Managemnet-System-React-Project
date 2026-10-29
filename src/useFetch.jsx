import React,{useState,useEffect} from "react";
import axios from "axios";

function useFetch(url){
    const[data,setData]=useState([])
    const[error,setError]=useState('')
    const[load,setLoad]=useState(true)

    async function getData(){
        try{
            const res=await axios.get(url)
            console.log(res.data);  //200
            setData(res.data)
        }
        catch(error){
            setError(error)
        }
        finally{
            setLoad(false)
        }
    }
    //useEffect(function,dependency)
    useEffect(()=>{
        getData()
    },[])
    return {data,error,load} 
}
export default useFetch