// import React, { useEffect } from "react";
// import "./Home.css";
// import Cookies from "js-cookie";
// import { use } from "react";
// import { toast } from "react-toastify";



// const Home = () => {
//   const isLoggedIn = Cookies.get("session_id") != null;


//   useEffect(() => {

//     //console.log("useEffect triggered\n" + "session_id: " + Cookies.get("session_id"));
//     if (sessionStorage.getItem("successLogin") === "true") {
      
//       console.log("Flash-сообщение должно появиться");
//       toast("Вы вошли в систему!", {
//         progressClassName: "custom-progress",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "light",
//       });
//       sessionStorage.removeItem("successLogin");
//       console.log(sessionStorage.getItem("successLogin"));
      
//     }
//   }, []);
  

//   return (
//     <div className="home">
//       <section className="hero">
//         <h1>Добро пожаловать на сайт расписания СШ (спортивной школы) по спортивной гимнастике</h1>
//         <p>Здесь вы найдете актуальное расписание занятий на неделю.</p>
//         {!isLoggedIn && <p>Для продолжения войдите или зарегистрируйтесь.</p>}
//       </section>
//     </div>
//   );
  
  
// };

// export default Home;


import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const Home = () => {
  const isLoggedIn = Cookies.get("session_id") != null;

  useEffect(() => {
    if (sessionStorage.getItem("successLogin") === "true") {
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
    }
  }, []);

  return (
    <main className="flex-1 p-4 lg:ml-64 pt-20 pb-16">
      {/* 
        p-4       - общий отступ
        lg:ml-64  - отступ слева для Sidebar (если ширина сайдбара 16rem = 64)
        pt-20     - отступ сверху для Header (например, если высота Header — 5rem = 20)
        pb-16     - отступ снизу для Footer (например, если высота Footer — 4rem = 16)
      */}
      <section className="bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold mb-4">
          Добро пожаловать на сайт расписания СШ (спортивной школы) по спортивной гимнастике
        </h1>
        <p className="mb-2">Здесь вы найдете актуальное расписание занятий на неделю.</p>
        {!isLoggedIn && (
          <p className="text-red-600">Для продолжения войдите или зарегистрируйтесь.</p>
        )}
      </section>
    </main>
  );
};

export default Home;
