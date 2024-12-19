import React from 'react';
import { useState, useEffect } from 'react';
import "./ScheduleComponent.css";
//import './Raspisanie.css';
import Cookies from "js-cookie";

import axios from "axios"

import httpClient from "react-http-client"

const config = {
    headers: {
       "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
 };

function ScheduleComponent () {

    const [users, setUsers] = useState();
    if (Cookies.get("session_id") != null)
    {
        return (
        <center>
            <h1>Расписание</h1>
            <button onClick={getClick} style={{margin: "10px"}}>Получить пользователей</button>
            <button onClick={postClick} style={{margin: "10px"}}>Сделать пользователя</button>
            

            <table style={{border: "1px solid"}}>
            <thead>
                <tr style={{border: "2px solid"}}> 
                    <th>GUID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {users?.map(user =>
                    <tr key={user.user_Guid}>
                        
                        <td>{user.user_Guid}</td>
                        <td>{user.userName}</td>
                        <td>{user.password}</td>
                        <td>{user.email}</td>
                        <th><button guidvalue={user.user_Guid} onClick={async () => {
                            await axios.delete("http://localhost:5082/Users/deleteUser?id=" + user.user_Guid, config ).then(function deletedata(response) {
                                
                                console.log(response);
                            })
                        }}>Delete</button></th>
                    </tr>
                )}
                
            </tbody>
        </table>
        </center>  
            
        );
    }

    else {

        window.document.location.href = "/Login";
    window.addEventListener('DOMContentLoaded', () => {
        // Проверяем, находимся ли мы на странице /Login
        if (window.location.pathname === '/Login') {
            // Создаем элемент flash-сообщения
            const flashMessage = document.createElement('div');
            flashMessage.textContent = 'Вы не авторизованы';
            flashMessage.style.position = 'absolute';
            flashMessage.style.top = '20px';
            flashMessage.style.left = '50%';
            flashMessage.style.transform = 'translateX(-50%)';
            flashMessage.style.padding = '10px 20px';
            flashMessage.style.backgroundColor = 'red';
            flashMessage.style.color = 'white';
            flashMessage.style.fontSize = '16px';
            flashMessage.style.borderRadius = '5px';
            flashMessage.style.zIndex = '1000';
    
            // Добавляем flash-сообщение в тело документа
            document.body.append(flashMessage);
    
            // Удаляем сообщение через 5 секунд
            setTimeout(() => {
                flashMessage.remove();
            }, 5000);
        };
    });

        
    }



    
    function postClick() {

        try {   
            httpClient.post("http://localhost:5082/Users/newUser", {
                user_Guid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                userName: "String",
                password: "string",
                email: "made by button"
            }).then(response => {
                console.log(response);
            })
        } catch (error) {
            console.log(error);
        }
        
        // httpClient.post("localhost:5082/Users/", {
        //     guid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        //     username: "String",
        //     email: "string",
        //     password: "ffasfasdfas"
        // }).then(response => {
        //     console.log(response);
        // })

        

    }


    function getClick() {

  

        httpClient.get("http://localhost:5082/Users/getUsers").then(function getdata(response) {
            setUsers(response);
          
          
    
          //console.log(response[4]["guid"])
          let users_list = [];
    
            response.map((user) => {
            //console.log(user.guid);
            users_list.push(user.user_Guid);
            
            
          })
          console.log(users_list);
        })
      
        // const response = fetch("localhost:5082/Users/").then((response) => {
        //   const data = response.json();
        //   console.log(response[4]);
        // })
       
    }
    
}

export default ScheduleComponent;