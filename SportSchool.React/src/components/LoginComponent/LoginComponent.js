import React from 'react';
import { useState } from "react";
import * as sessions from "../../middleware/sessions.jsx";
import './LoginComponent.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';



function LoginComponent () {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const response = axios( {
        method: "get",
        url: 'http://localhost:8082/Users/auth?email=' + email + "&password=" + password
      })

        console.log("success " +(await response).status + " " + (await response).statusText);
        sessions.setSessionCookie((await response).data.user_Guid);
        sessionStorage.setItem("successLogin", "true");
        setTimeout(() => {
          window.location.href = "/";
        }, 100);

      
    }
    catch (error) {
      console.log("Исключение try-catch: LoginComponent 36 строка(" + error.message + ")");
      toast("Что-то пошло не так! " + "(" + (error.message) + ")", {
        progressClassName: "custom-progress",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
      })
    }

    };

    if (Cookies.get("session_id") != null)
    {
      setTimeout(() => {
        window.location.href = "/";
      }, 100);
    }
    else{
      return (
        <div className="login_base">
            
            <div className="login">
              
                <h1 style={{textAlign: "center"}}>Вход в систему расписания</h1>
  
              <div className="login_triangle"></div>
  
              <h2 className="login_header">Войти</h2>
  
              <form className="login_container" onSubmit={handleSubmit}>
                
                <p><input type="email" placeholder="Почта" onChange={(e) => setEmail(e.target.value)} required autoFocus /></p>
                <p><input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required autoFocus /></p>
                <p><input type="submit" value="Login" /></p>
              </form>
            </div>
  
        </div>
            
      );
    }
    
}


export default LoginComponent;
