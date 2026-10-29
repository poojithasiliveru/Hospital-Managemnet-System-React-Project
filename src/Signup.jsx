import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(){
    const navigate=useNavigate()
    const[username,setUsername]=useState('')
    function handlerSubmit(){
        localStorage.setItem('user',username)
        alert("Form submitted successfully")
        navigate('/')
    }
    return(
        <>
        <form onSubmit={handlerSubmit}>
            <center>
            <label>Username</label>
            <input type="text" placeholder='Enter username' name='username' className='signup' value={username}
            onChange={(e)=>setUsername(e.target.value)}/>
            <button className='signup'> Submit</button>
            </center>
        </form><br/>
        <h1>{username}</h1>
        </>
    )
}
export default Signup