// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from "./components/HeaderComponent/Header";
// import Footer from "./components/FooterComponent/Footer";
// import Home from "./components/HomeComponent/Home";
// import LoginComponent from "./components/LoginComponent/LoginComponent";
// import ScheduleComponent from "./components/RealScheduleComponent/RealScheduleComponent";
// import ErrorComponent from "./components/ErrorComponent/ErrorComponent";
// import Register from "./components/RegisterComponent/RegisterJ";
// import LogoutComponent from "./components/LogoutComponent/LogoutComponent";
// import { Bounce, ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import NotFoundComponent from "./components/NotFoundComponent/NotFoundComponent";
// import Sidebar from "./components/SidebarComponent/SidebarComponent";


// const App = () => {
//   return (
//     <Router>
      
//       <Header />
//       <Sidebar />
//       <main>
        
//         <Routes>
//           <Route path="/" element={<Home />} errorElement={<ErrorComponent />} />
//           <Route path="/Login" element={<LoginComponent />} errorElement={<ErrorComponent />}  />
//           <Route path="/Register" element={<Register />} errorElement={<ErrorComponent />} />
//           <Route path="/RealSchedule" element={<ScheduleComponent />} errorElement={<ErrorComponent />} />
//           <Route path="/Logout" element={<LogoutComponent />} errorElement={<ErrorComponent />} />
//           <Route path="*" element={<NotFoundComponent />} />
//         </Routes>
//       </main>
//       <Footer />
//       <ToastContainer position="top-right"            // FLASH-сообщения глобальные.
//                       autoClose={5000}
//                       hideProgressBar={false}
//                       newestOnTop={true}
//                       closeOnClick={false}
//                       rtl={false}
//                       pauseOnFocusLoss
//                       draggable
//                       pauseOnHover
//                       theme="dark"
//                       transition={Bounce}
//        />
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/HeaderComponent/Header";
import Footer from "./components/FooterComponent/Footer";
import Home from "./components/HomeComponent/Home";
import LoginComponent from "./components/LoginComponent/LoginComponent";
import ScheduleComponent from "./components/RealScheduleComponent/RealScheduleComponent";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";
import Register from "./components/RegisterComponent/RegisterJ";
import LogoutComponent from "./components/LogoutComponent/LogoutComponent";
import NotFoundComponent from "./components/NotFoundComponent/NotFoundComponent";
import Sidebar from "./components/SidebarComponent/SidebarComponent";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <Router>
  
    <Header />
    <Sidebar />

    <main className="ml-64 mt-20 mb-10 p-4">
      {/* ml-64: место под Sidebar, mt-20: место под Header, mb-10: место под Footer */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<LoginComponent />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/RealSchedule" element={<ScheduleComponent />} />
        <Route path="/Logout" element={<LogoutComponent />} />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </main>

    <Footer />
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={true}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Bounce}
    />

</Router>
  );
};

export default App;
