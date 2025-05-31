import React from 'react';
import { useState, useEffect } from 'react';
import "./ScheduleComponent.css";
//import './Raspisanie.css';
import Cookies from "js-cookie";
import axios from "axios"
import { toast } from 'react-toastify';

import httpClient, { get } from "react-http-client"

const config = {
    headers: {
       "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
 };
function ScheduleComponent () {
    
    const [users, setUsers] = useState();
    useEffect(() => {
        for (var i = 0; i <= 1; i++)
            {getClick()}
    }, []);
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
                    <tr key={user.userGuid}>
                        
                        <td>{user.userGuid}</td>
                        <td>{user.userName}</td>
                        <td>{user.password}</td>
                        <td>{user.email}</td>
                        <th><button guidvalue={user.userGuid} onClick={async () => {
                            
                            try
                            {
                                await axios.delete("api/Users/deleteUser?id=" + user.userGuid, config ).then(function deletedata(response) {
                                
                                
                                console.log(response.data);
                                
                                
                                toast("Пользователь " + user.userGuid +  " удалён!", {
                                    progressClassName: "custom-progress",
                                    autoClose: 4000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    theme: "light",
                                    
                                }
                                );
                                getClick();
                                
                            })
                            }
                            catch(error)
                            {
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
                                console.log(error);
                            }

                            
                        }}>Delete</button> </th>
                        
                    </tr>
                )}
                
            </tbody>
        </table>
        
        </center>  
            
        );
    }

    else {

        window.location.href = "/Login";
    // toast("Вы не авторизованы!", {
    //     progressClassName: "custom-progress",
    //     autoClose: 4000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
        
    // }
    // );
    }



    
    function postClick() {

        try {   
            httpClient.post("api/Users/newUser", {
                user_Guid: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
                userName: "String",
                password: "string",
                email: "made by button"
            }).then(response => {
                const user = response;
                toast("Пользователь " + user.user_Guid +  " добавлен!", {
                    progressClassName: "custom-progress",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    
                })
                getClick();
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

  

        httpClient.get("api/Users/getUsers").then(function getdata(response) {
            setUsers(response);
          
          
    
          //console.log(response[4]["guid"])
          let users_list = [];
    
            response.map((user) => {
            //console.log(user.guid);
            users_list.push(user.user_Guid);
            
            
          })
          console.log(users_list);
          console.log("[FROM getClick() method");
        })
      
        // const response = fetch("localhost:5082/Users/").then((response) => {
        //   const data = response.json();
        //   console.log(response[4]);
        // })
       
    }
    
}

export default ScheduleComponent;