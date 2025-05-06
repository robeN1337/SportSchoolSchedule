import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/HeaderComponent/Header";
import Footer from "./components/FooterComponent/Footer";
import Home from "./components/HomeComponent/Home";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import ScheduleComponent from "./components/ScheduleComponent/ScheduleComponent";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";
import Register from "./components/Register/RegisterJ";
import LogoutComponent from "./components/LogoutComponent/LogoutComponent";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotFoundComponent from "./components/NotFoundComponent/NotFoundComponent";


const App = () => {
  return (
    <Router>
      
      <Header />
      <main>
        
        <Routes>
          <Route path="/" element={<Home />} errorElement={<ErrorComponent />} />
          <Route path="/Login" element={<LoginComponent />} errorElement={<ErrorComponent />}  />
          <Route path="/RegisterJ" element={<Register />} errorElement={<ErrorComponent />} />
          <Route path="/Schedule" element={<ScheduleComponent />} errorElement={<ErrorComponent />} />
          <Route path="/Logout" element={<LogoutComponent />} errorElement={<ErrorComponent />} />
          <Route path="*" element={<NotFoundComponent />} />
        </Routes>
      </main>
      <Footer />
      <ToastContainer position="top-right"            // FLASH-сообщения глобальные.
                      autoClose={5000}
                      hideProgressBar={false}
                      newestOnTop={true}
                      closeOnClick={false}
                      rtl={false}
                      pauseOnFocusLoss
                      draggable
                      pauseOnHover
                      theme="light"
                      transition={Bounce}
       />
    </Router>
  );
};

export default App;