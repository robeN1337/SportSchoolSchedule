import React from 'react';
import { useState } from "react";
import * as sessions from "../../middleware/sessions.jsx";
import './LoginComponent.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { UserIcon, LockIcon } from "lucide-react"


function LoginComponent () {
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try{
      const response = axios( {
        method: "get",
        url: 'api/Users/auth?email=' + email + "&password=" + password
      })

        console.log("success " +(await response).status + " " + (await response).statusText);
        sessions.setSessionCookie((await response).data.userGuid);
        sessionStorage.setItem("successLogin", "true");
        setTimeout(() => {
          toast("Успешный вход в систему!", {
        progressClassName: "custom-progress",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
      })
      
          document.location.href = "/";
          
          
        }, 100);

      
    }
    catch (error) {
      console.log("Исключение try-catch: LoginComponent 36 строка(" + error.message + ")");
      if (error.status === 500)
      {
        toast("Некорректные данные для входа!", {
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
      else {
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
      
    }

    };

    if (Cookies.get("session_id") != null)
    {
      setTimeout(() => {
        
        navigate("/")
      }, 100);
      setTimeout(() => {
        toast("Вы уже вошли в систему!", {
        progressClassName: "custom-progress",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      })
      }, 100)
    }
    else{
      // return (
      //   <div className="login_base">
            
      //       <div className="login">
              
      //           <h1 style={{textAlign: "center"}}>Вход в систему расписания</h1>
  
      //         <div className="login_triangle"></div>
  
      //         <h2 className="login_header">Войти</h2>
  
      //         <form className="login_container" onSubmit={handleSubmit}>
                
      //           <p><input type="email" placeholder="Почта" onChange={(e) => setEmail(e.target.value)} required autoFocus /></p>
      //           <p><input type="password" placeholder="Пароль" onChange={(e) => setPassword(e.target.value)} required autoFocus /></p>
      //           <p><input type="submit" value="Login" /></p>
      //         </form>
      //       </div>
  
      //   </div>
            
      // );
      
     return (
      <div className=" flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Вход в систему
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Система управления расписанием школы
        </p>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Электронная почта
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                  placeholder="coach@yandex.ru"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Пароль
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockIcon size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2 border"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              

            </div>

            <p className='text-gray-400 text-xs pb-5'>Для получения данных для входа обратитесь к вашему системному администратору.</p>
            <div>
             
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Войти
                </button>
            
            </div>
            
          </form>
        </div>
      </div>
    </div>
      );
    }
    
}


export default LoginComponent;
