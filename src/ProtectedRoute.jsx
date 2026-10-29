import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}){
    const userinfo=localStorage.getItem('user')
    if(!userinfo){
        return <Navigate to="/signup"/>
    }
    return children
}
export default ProtectedRoute