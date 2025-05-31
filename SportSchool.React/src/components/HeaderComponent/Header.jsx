import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import Cookies from "js-cookie";

const Header = () => {
  if (Cookies.get("session_id") != null) {
    return (
      <header className="header bg-blue-700">
        <div className="logo">
          <img src="../../../logomain2.png" alt="Logo" className="logo-image" />
          <span className="logo-text"> <Link to="/"> РГБУ "СШ по Спортивной гимнастике"  </Link> </span>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="#">Группы</Link></li>
            <li><Link to="#">Контакты</Link></li>
            <li><Link to="/RealSchedule">Расписание</Link></li>
            {/* <li><Link to="/Logout">Выйти</Link></li> */}
            {/* <li><Link onClick={() => {
               if (Cookies.get("session_id") != null) {
                  Cookies.remove("session_id");
                  
                  return (
                    document.location.href = "/"
                    
                        
                  );
                  
                }  
              
                else
                {
                  return (
                    document.location.href = "/"
              
                  );
                }
              
            }}>Выйти</Link></li> */}
            <li><Link to = "/profile">Тренер Фамилия И.О.</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
  
  else{
    return (
      <header className="header bg-blue-700">
        <div className="logo">
          <img src="../../../logomain2.png" alt="Logo" className="logo-image" />
          <span className="logo-text"> <Link to="/"> РГБУ "СШ по Спортивной гимнастике"  </Link> </span>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="#">Контакты</Link></li>

          </ul>
        </nav>
      </header>
    );
  }
  
//   <header className="header bg-blue-800">
//   <div className="flex items-center">
//     <img src="../../../logomain2.png" alt="Logo" className="h-10 mr-3" />
//     <span className="text-lg font-semibold">
//       <Link to="/">РГБУ "СШ по Спортивной гимнастике"</Link>
//     </span>
//   </div>
//   <nav>
//     <ul className="flex gap-4 text-sm">
//       {/* Отрисовывай разные ссылки в зависимости от логина */}
//       {Cookies.get("session_id") ? (
//         <>
//           <li><Link to="#">Группы</Link></li>
//           <li><Link to="#">Контакты</Link></li>
//           <li><Link to="/RealSchedule">Расписание</Link></li>
//           <li><button onClick={() => {
//             Cookies.remove("session_id");
//             window.location.href = "/";
//           }}>Выйти</button></li>
//         </>
//       ) : (
//         <>
//           <li><Link to="#">Контакты</Link></li>
//           <li><Link to="/RegisterJ">Регистрация</Link></li>
//           <li><Link to="/Login">Войти</Link></li>
//         </>
//       )}
//     </ul>
//   </nav>
// </header>



};

export default Header;