
//import s from './LoginComponent.module.css';
import './LogoutComponent.css';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function LogoutComponent () {
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

  
  
}



export default LogoutComponent;
