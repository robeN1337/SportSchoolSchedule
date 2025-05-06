import React, { useEffect } from "react";
import "./Home.css";
import Cookies from "js-cookie";
import { use } from "react";
import { toast } from "react-toastify";



const Home = () => {
  const isLoggedIn = Cookies.get("session_id") != null;


  useEffect(() => {

    //console.log("useEffect triggered\n" + "session_id: " + Cookies.get("session_id"));
    if (sessionStorage.getItem("successLogin") === "true") {
      
      console.log("Flash-сообщение должно появиться");
      toast("Вы вошли в систему!", {
        progressClassName: "custom-progress",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      sessionStorage.removeItem("successLogin");
      console.log(sessionStorage.getItem("successLogin"));
      
    }
  }, []);
  

  return (
    <div className="home">
      <section className="hero">
        <h1>Добро пожаловать на сайт расписания СШ (спортивной школы) по спортивной гимнастике</h1>
        <p>Здесь вы найдете актуальное расписание занятий на неделю.</p>
        {!isLoggedIn && <p>Для продолжения войдите или зарегистрируйтесь.</p>}
      </section>
    </div>
  );
  
  
};

export default Home;
