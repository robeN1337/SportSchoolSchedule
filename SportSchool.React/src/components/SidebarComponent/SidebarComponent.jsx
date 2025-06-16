import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  HomeIcon,
  CalendarIcon,
  LogOutIcon,
  LogInIcon,
  Users
} from 'lucide-react'

import Cookies from "js-cookie";
const Sidebar = () => {
  return (
    <aside className="fixed top-30 left-0 w-64 h-[calc(100vh-5rem)] bg-blue-800 text-white z-40 overflow-y-auto">
     
      <div className="flex flex-col flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'}`
            }
          >
            <HomeIcon className="mr-3 h-5 w-5" />
            Главная
          </NavLink>
          <NavLink
            to="/RealSchedule"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'}`
            }
          >
            <CalendarIcon className="mr-3 h-5 w-5" />
            Расписание
          </NavLink>
            
            <NavLink 
            to="/groups"
            className={({ isActive }) =>
              `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'}`
            }
          >
            <Users className="mr-3 h-5 w-5" />
            Группы
          </NavLink>
          
            

          <div className="pt-3 mt-4 border-t border-blue-700">
            {/* <NavLink
              to="/profile"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'}`
              }
            >
              <UserIcon className="mr-3 h-5 w-5" />
              Профиль
            </NavLink> */}
            {/* <NavLink
              to="/settings"
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${isActive ? 'bg-blue-700 text-white' : 'text-blue-100 hover:bg-blue-700'}`
              }
            >
              <SettingsIcon className="mr-3 h-5 w-5" />
              Настройки
            </NavLink> */}
            {Cookies.get("session_id") ? (
                <NavLink className='flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors text-blue-100 hover:bg-blue-700' 
                onClick={() => {
                    Cookies.remove("session_id");
                    window.location.href = "/";
                    }}>
                <LogOutIcon className="mr-3 h-5 w-5" />
                Выйти
              </NavLink>
              
            ) : (
                <NavLink to="/Login"
                className='flex px-4 py-2 text-sm font-medium rounded-md transition-colors text-blue-100 hover:bg-blue-700' 
                  >
                <LogInIcon className="mr-3 h-5 w-5" />
                Войти
              </NavLink>
            )}
            
            
            
          </div>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar;