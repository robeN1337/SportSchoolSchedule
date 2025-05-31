import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';

import './RealScheduleComponent.css';

const ScheduleComponent = () => {

  const groupid = 2; // TODO: Сделать вывод по группе из АПИ
  
  const [schedule, setSchedule] = useState([]);


  useEffect(() => {
    axios.get('http://localhost:8082/Schedule/getweeklyschedule')
      .then(response => {
        const filtered = response.data.filter(s => s.group.groupid === groupid); // TODO
        const grouped = groupByWeekday(filtered);
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
    // <div className="max-w-full mx-auto px-5 text-center">
    //   <h1 className="text-2xl font-bold mb-6">Расписание занятий</h1>
    //   <div className="grid md:grid-cols-7 gap-7">
    //     {schedule.map(day => (
    //       <div key={day.date} className="bg-white rounded shadow p-4">
    //         <h2 className="font-semibold text-lg text-blue-700">{getWeekdayName(day.date)}</h2>
    //         <ul className="divide-y mt-1 text-left">
    //           {day.sessions.map(session => (
    //             <li key={session.id} className="py-2">
    //               <div className="text-sm font-bold">{session.className}</div>
    //               <div className="text-sm">{session.startTime} – {session.endTime}</div>
    //               <div className="text-sm text-gray-600">
    //                 {session.group.groupname} — {session.group.coach.fullname}
    //               </div>
    //             </li>
    //           ))}
    //         </ul>
    //       </div>
    //     ))}
    //   </div>
    // </div>

    <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
  {weekDays.map(day => (
    <div key={day} className="bg-white rounded shadow p-3 min-h-[200px]">
      <h2 className="text-center font-semibold text-blue-500 capitalize">{day}</h2>
      {/* <h2 className="text-center text-sm">dsadass</h2> */}

          {schedule[day]?.[0] && (
        <p className="text-center text-sm text-gray-500 mb-2">
          {formatDate(schedule[day][0].date)}
        </p>
      )}

      <ul className="divide-y mt-2">
        {(schedule[day] || []).slice(0, 4).map(session => (
          <li key={session.id} className="py-1 text-sm">
            <div className="font-bold">{session.className}</div>
            <div>{session.startTime} – {session.endTime}</div>
          </li>
        ))}
        {/* Если меньше 4 — добавим пустые слоты */}
        {Array.from({ length: 4 - (schedule[day]?.length || 0) }).map((_, i) => (
          <li key={`empty-${i}`} className="py-1 text-gray-400 italic">—</li>
        ))}
      </ul>
    </div>
  ))}
</div>
  );
};



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

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
};



export default ScheduleComponent;
