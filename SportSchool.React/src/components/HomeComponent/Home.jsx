import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import axios from 'axios';
import { CalendarIcon } from "lucide-react";
import { Link } from 'react-router-dom'


const Home = () => {

  const [ProfileData, setProfileData] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  
  const [userrole, setUserRole] = useState("");

  // useEffect(() => {
  //   if (sessionStorage.getItem("successLogin") === "true") {
  //     toast("Вы вошли в систему!", {
  //       progressClassName: "custom-progress",
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: "light",
  //     });
  //     sessionStorage.removeItem("successLogin");
  //   }
  // }, []);

  useEffect(() => {
    
    const session_id = Cookies.get("session_id");

    if (session_id) {
      
      setIsLoggedIn(true);
      axios.get(`api/Users/getUserProfile?session_id=${session_id}`)
      .then(response => {
        setProfileData(response.data);
        if (response.data.role === "athlete") {
            setUserRole("Атлет");
          } else if (response.data.role === "coach") {
            setUserRole("Тренер");
          } else if (response.data.role === "dispatch") {
            setUserRole("Диспетчер");
          }
      })
      
      .catch(error => {
        console.error("Ошибка при получении данных профиля:", error);
        toast("Ошибка при загрузке профиля! " + " (" + (error.message) + ")", {
                autoClose: 3000,
                progressClassName: "custom-progress",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                
              })
      });

    } else {
      setIsLoggedIn(false);
    }

  }, []);


      if (!isLoggedIn) {
        return (
          <main className="space-y-12">
            <div className="bg-white rounded-lg shadow p-5 px-7 -mt-14">
              <div className="flex items-center space-x-5">
                <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-xl text-white font-bold">
                  ?
                </div>
                <div>
                  <h2 className="text-xl font-semibold">Гость</h2>
                  <p className="text-gray-500"> <Link to = "/Login" className="text-blue-600 hover:text-blue-200">Авторизируйтесь</Link> для получения доступа к расписанию</p>
                </div>
              </div>
            </div>
          </main>
        )
      }


        if (!ProfileData)
        {
          return (
            <main className="space-y-12">
              <div className="bg-white rounded-lg shadow p-5 px-7 -mt-14">
                <div className="flex items-center space-x-5">
                  <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-xl text-white font-bold">
                    ?
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Загрузка...</h2>
                    <p className="text-gray-500">Загрузка профиля...</p>
                  </div>
                </div>
              </div>
            </main>
          )
        }

            return (
        <main className="space-y-12">
          <div className="bg-white rounded-lg shadow p-5 px-7 -mt-14">
            <div className="flex items-center space-x-5">
              <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-xl text-white font-bold">
                {getInitials(ProfileData.fullName)}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{ProfileData.fullName}</h2>
                <p className="text-gray-600">{userrole} • Группа: {ProfileData.groupName} • ID: {ProfileData.userGuid}</p>
              </div>
            </div>
          </div>
        </main>
      );
          
    


    // <main className="space-y-12">
    //   <div className="bg-white rounded-lg shadow p-5 px-7 -mt-14">
    //       <div className="flex items-center space-x-5">
    //         <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-xl text-white font-bold">
    //           ИП
    //         </div>
    //         <div>
    //           <h2 className="text-xl font-semibold">Иванов Петр Сергеевич</h2>
    //           <p className="text-gray-600">Студент • Группа: СП-31 • ID: 12345</p>
    //           <p className="text-sm text-blue-600">
    //             3 курс • Спортивная подготовка
    //           </p>
    //         </div>
    //       </div>
    //     </div>

    //     <div className="bg-white rounded-lg shadow">
    //       <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
    //         <h3 className="text-lg font-medium text-gray-900">
    //           Ближайшие занятия
    //         </h3>
    //         <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
    //           <CalendarIcon size={16} className="text-blue-600 mr-2" />
    //           <span className="text-sm font-medium text-blue-600">Сегодня</span>
    //         </div>
    //       </div>
    //       <div className="p-6">
    //         <ul className="divide-y divide-gray-200">
    //           <li className="py-4 flex">
    //             <div className="w-16 text-center">
    //               <p className="text-sm font-semibold text-blue-600">8:30</p>
    //               <p className="text-xs text-gray-500">10:00</p>
    //             </div>
    //             <div className="ml-4 flex-1">
    //               <div className="flex items-center justify-between">
    //                 <h4 className="text-sm font-medium text-gray-900">
    //                   Общая физическая подготовка
    //                 </h4>
    //                 <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
    //                   Практика
    //                 </span>
    //               </div>
    //               <p className="mt-1 text-xs text-gray-500">
    //                 Зал 1 • Иванов А.С.
    //               </p>
    //             </div>
    //           </li>
    //           <li className="py-4 flex">
    //             <div className="w-16 text-center">
    //               <p className="text-sm font-semibold text-blue-600">10:10</p>
    //               <p className="text-xs text-gray-500">11:40</p>
    //             </div>
    //             <div className="ml-4 flex-1">
    //               <div className="flex items-center justify-between">
    //                 <h4 className="text-sm font-medium text-gray-900">
    //                   Волейбол
    //                 </h4>
    //                 <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
    //                   Практика
    //                 </span>
    //               </div>
    //               <p className="mt-1 text-xs text-gray-500">
    //                 Зал 2 • Петров В.А.
    //               </p>
    //             </div>
    //           </li>
    //           <li className="py-4 flex">
    //             <div className="w-16 text-center">
    //               <p className="text-sm font-semibold text-blue-600">12:10</p>
    //               <p className="text-xs text-gray-500">13:40</p>
    //             </div>
    //             <div className="ml-4 flex-1">
    //               <div className="flex items-center justify-between">
    //                 <h4 className="text-sm font-medium text-gray-900">
    //                   Теория физической культуры
    //                 </h4>
    //                 <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
    //                   Лекция
    //                 </span>
    //               </div>
    //               <p className="mt-1 text-xs text-gray-500">
    //                 Аудитория 205 • Смирнова О.И.
    //               </p>
    //             </div>
    //           </li>
    //         </ul>
    //         <div className="mt-4">
    //           <button
    //             className="text-sm font-medium text-blue-600 hover:text-blue-500"
    //           >
    //             Посмотреть все расписание →
    //           </button>
    //         </div>
    //       </div>
    //     </div>

    // </main>
};


const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  return parts.map(p => p[0]).slice(0, 2).join('').toUpperCase();
};


export default Home;
