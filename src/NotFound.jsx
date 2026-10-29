import React from "react";
import { useNavigate } from "react-router-dom";
function NotFound(){
    const hello=useNavigate()
    return(
        <div>
            <center>
                <img src="https://cdn.dribbble.com/userupload/18811435/file/original-48280240fb14711fdfc93e80c425fdf1.png" alt=""  width="20%"/>
                <button onClick={()=>hello('/')}>Home Page</button>
            </center>
        </div>
    )
}
export default NotFound