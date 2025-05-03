import React from "react";
import { Link } from "react-router-dom";
import './Header.css';
import Cookies from "js-cookie";

const Header = () => {
  if (Cookies.get("session_id") != null) {
    return (
      <header className="header">
        <div className="logo">
          <img src="../../../logomain.png" alt="Logo" className="logo-image" />
          <span className="logo-text"> <Link to="/"> College Schedule  </Link> </span>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/Schedule">Расписание</Link></li>
            <li><Link to="/Logout">Выйти</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
  
  else{
    return (
      <header className="header">
        <div className="logo">
          <img src="../../../logomain.png" alt="Logo" className="logo-image" />
          <span className="logo-text"> <Link to="/"> College Schedule  </Link> </span>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="/RegisterJ">Регистрация</Link></li>
            <li><Link to="/Login">Войти</Link></li>
          </ul>
        </nav>
      </header>
    );
  }
  
};

export default Header;