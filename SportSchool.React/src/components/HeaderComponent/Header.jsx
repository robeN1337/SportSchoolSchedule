import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './Header.css';
import Cookies from "js-cookie";





const Header = () => {

  const [userinfo, setuserinfo] = useState("");

  const [userrole, setuserrole] = useState("");

  useEffect(() => {
    const session_id = Cookies.get("session_id")
    if (!session_id ) 
      return;

    fetch("api/Users/getUserProfile?session_id=" + session_id)
    .then(res => res.json())
    .then(data => {
      setuserinfo(data.fullName);
    })
  })

  useEffect(() => {
    const session_id = Cookies.get("session_id")
    if (!session_id) 
      return;

    fetch("api/Users/getUserProfile?session_id=" + session_id)
    .then(res => res.json())
    .then(data => {
      if (data.role == "admin")
        setuserrole("Администратор")
      if (data.role == "coach")
        setuserrole("Тренер")
      if (data.role == "athlete")
        setuserrole("Атлет")
      if (data.role == "dispatch")
        setuserrole("Диспетчер")
    })
  }
  )


  if (Cookies.get("session_id") != null) {
    return (
      <header className="header bg-blue-700">
        <div className="logo">
          <img src="../../../logomain2.png" alt="Logo" className="logo-image" />
          <span className="logo-text"> <Link to="/"> РГБУ "СШ по Спортивной гимнастике"  </Link> </span>
        </div>
        <nav>
          <ul className="nav-links">
            <li><Link to="#">Контакты</Link></li>
            <li><Link to = "/profile">{userrole} - {userinfo}</Link></li>
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
  

};

export default Header;

