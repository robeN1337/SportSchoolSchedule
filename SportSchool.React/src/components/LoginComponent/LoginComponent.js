import React from 'react';
import { useState } from "react";
import * as sessions from "../../middleware/sessions.jsx";
//import s from './LoginComponent.module.css';
import './LoginComponent.css';
import axios from 'axios';


function LoginComponent () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  let responsestatus;
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const response = axios( {
        method: "get",
        url: 'http://localhost:5082/Users/auth?email=' + email + "&password=" + password
      });
  
      if ((await response).status != 200)
      {
        console.log("error" + (await response).status + " " + (await response).statusText);
      }
      else
      {
        console.log("success " +(await response).status + " " + (await response).statusText);
        sessions.setSessionCookie((await response).data.user_Guid);
        window.location.href = "/Schedule";
      }
      
    }
    catch (error) {
      console.log(error.message + "хер" + responsestatus + " ");
    }

    };


    return (
      <div className="login_base">
          
          <div className="login">
            
              <h1 style={{textAlign: "center"}}>SKS Schedule</h1>

            <div className="login_triangle"></div>

            <h2 className="login_header">Войти</h2>

            <form className="login_container" onSubmit={handleSubmit}>
              
              <p><input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required autoFocus /></p>
              <p><input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required autoFocus /></p>
              <p><input type="submit" value="Login" /></p>
            </form>
          </div>

      </div>
          
    );
}


export default LoginComponent;
