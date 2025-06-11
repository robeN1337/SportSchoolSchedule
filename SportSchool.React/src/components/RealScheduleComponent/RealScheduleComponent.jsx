import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { EditIcon} from 'lucide-react'
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import './RealScheduleComponent.css';
import Dropdown from '../../middleware/dropdownbutton';

const ScheduleComponent = () => {

  const groupid = 2; // TODO: Сделать вывод по группе из АПИ
  const session_id = Cookies.get("session_id");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const navigate = useNavigate();

    const generateWeekDates = (startDateStr) => {
    const dates = [];
    const startDate = new Date(startDateStr);

    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      dates.push(date.toISOString().split('T')[0]); // YYYY-MM-DD
    }

    return dates;
  };


  const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('ru-RU', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
  }).format(date);
  };

  const groupWeekSessions = (sessions, weekDates) => {
  const grouped = {};
  weekDates.forEach(date => {
    grouped[date] = [];
  });

  sessions.forEach(session => {
    if (grouped[session.date]) {
      grouped[session.date].push(session);
    }
  });

  return weekDates.map(date => ({
    date,
    sessions: grouped[date],
  }));
};



  useEffect(() => {
    
    if (session_id != null) {
      setIsLoggedIn(true);
    }
    else {
      toast("Для просмотра этого раздела необходимо авторизироваться!", {
        autoClose: 3000,
        progressClassName: "custom-progress",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      })
      navigate("/Login");
    }
    axios.get('api/Schedule/getweeklyschedule')
      .then(response => {
      //   const filtered = response.data.filter(s => s.group.groupid === groupid); // TODO
      //   const grouped = groupByWeekday(filtered);
      // setSchedule(grouped);

      const weekStart = '2025-06-09'; // начальная дата недели
        const weekDates = generateWeekDates(weekStart);
        const grouped = groupWeekSessions(response.data, weekDates);
        setSchedule(grouped);
      })
      .catch(error => {
        console.error('Ошибка при загрузке расписания:', error)
        toast("Что-то пошло не так! " + "(" + (error.message) + ")", {
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
  }, []);

  const groupByDate = (sessions) => {
    const grouped = {};

    sessions.forEach(session => {
      if (!grouped[session.date]) {
        grouped[session.date] = [];
      }
      grouped[session.date].push(session);
    });

    return Object.keys(grouped).map(date => ({
      date,
      sessions: grouped[date]
    }));
  };

          return (
        <div className="max-w-full px-4 text-center py-3 ">
          <h1 className='text-2xl font-bold text-left mb-8'>Расписание</h1>
          <div className=" -mt-14 mb-5">Группа: 
              <Dropdown className = "-mt-5"> </Dropdown>
          </div>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {schedule.map(day => (
          <div key={day.date} className="bg-white rounded shadow p-3 min-h-[200px]">
            <h2 className="text-center font-semibold text-blue-500 capitalize">{formatDate(day.date)}</h2>
            
            {Array.from({ length: 4 }).map((_, index) => {
              const session = day.sessions[index];
              return session ? (
                <div key={index} className="border p-2 mb-2 rounded bg-blue-50 text-sm">
                  <EditIcon size={16} className="-mb-5 ml-auto">  </EditIcon>
                  <p><strong>{session.className}</strong></p>
                  <p>{session.startTime} - {session.endTime}</p>
                  <p>{session.group.groupname}</p>
                  <p className="text-xs text-gray-600">{session.group.coach.fullname}</p>
                </div>
              ) : (
                <div key={index} className="border border-dashed p-2 mb-2 rounded text-gray-400 text-sm text-center">
                  Добавить...
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
      




const weekDays = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];

const groupByWeekday = (sessions) => {
  const result = {};
 

  // Инициализация всех 7 дней
  weekDays.forEach(day => result[day] = []);

  sessions.forEach(session => {
    const date = new Date(session.date);
    const weekday = date.toLocaleDateString('ru-RU', { weekday: 'long' });
    if (result[weekday]) {
      result[weekday].push(session);
    }
    
  });

  return result;
};

// const formatDate = (dateStr) => {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
// };



export default ScheduleComponent;
