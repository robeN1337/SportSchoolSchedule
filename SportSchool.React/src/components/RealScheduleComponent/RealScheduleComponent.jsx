import { toast } from 'react-toastify';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import { EditIcon, ChevronLeftIcon, ChevronRightIcon, CalendarIcon, ArrowDown, SquareX} from 'lucide-react'
import Cookies from "js-cookie";
import { data, useNavigate } from "react-router-dom";
import  EditSessionModal from "../EditSessionComponent/EditSessionComponent.jsx";

import './RealScheduleComponent.css';
import Dropdown from '../../middleware/dropdownbutton';
import { getSessionCookie } from '../../middleware/sessions';

const ScheduleComponent = () => {


  
  const [sessionToDelete, setSessionToDelete] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSession, setSelectedSession] = useState(null);

  const handleEditSession = (session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  const handleSaveChanges = async (updatedSession) => {
    // Здесь логика отправки запроса на сервер (PUT /api/ClassSessions/update)
    // и обновление состояния расписания (schedule)
      try {
    // Поиск объекта группы по groupName, выбранному в форме
    const selectedGroup = groups.find(g => g.groupname === updatedSession.groupName);

    if (!selectedGroup) {
      toast("Выбрана несуществующая группа!", {
        autoClose: 3000,
        progressClassName: "custom-progress",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    // Формируем тело запроса с нужным groupId
    const body = {
      className: updatedSession.className,
      date: updatedSession.date,
      startTime: updatedSession.startTime,
      endTime: updatedSession.endTime,
      groupId: selectedGroup.groupid,  // <-- подставляем id группы из массива
    };

    const response = await axios.put(
      `api/ClassSessions/updateClassSession?id=${updatedSession.id}`,
      body,
      { headers: { 'Content-Type': 'application/json' } }
    );

    const updatedData = response.data;

    setSchedule(prevSchedule => 
      prevSchedule.map(session => 
        session.id === updatedData.id ? updatedData : session
      )
    );

    setIsModalOpen(false);
    fetchSchedule();
    toast("Карточка успешно обновлена!", {
      autoClose: 3000,
      progressClassName: "custom-progress",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  } catch (error) {
    console.error('Ошибка при обновлении сессии:', error);
    toast("Ошибка при обновлении карточки! (" + error.message + ")", {
      autoClose: 3000,
      progressClassName: "custom-progress",
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    })
  }
    

    console.log('Сохраняем:', updatedSession);
    handleCloseModal();
  };


    
  const [groupname, setGroupname] = useState("");
  const [groupid, setGroupid] = useState(0);
  const [groups, setGroups] = useState([]);
  const [userrole, setUserRole] = useState("");
  const session_id = Cookies.get("session_id");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [schedule, setSchedule] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Все группы");
  const [weekStartDate, setWeekStartDate] = useState(() => {
        const today = new Date();
        const day = today.getDay();
        const diffToMonday = (day + 6) % 7;
        const monday = new Date(today);
        monday.setDate(today.getDate() - diffToMonday);
        monday.setHours(0, 0, 0, 0);
        return monday;
      });

  const [grouplist, setGroupList] = useState([]);


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

  const formatLocalDate = (date) => {
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы от 0 до 11
          const day = String(date.getDate()).padStart(2, '0');
          return `${year}-${month}-${day}`;
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

  const fetchSchedule = (role, groupId) => {
  axios.get('api/Schedule/getweeklyschedule')
    .then(response => {
      const allSessions = response.data;
      const mondayStr = formatLocalDate(weekStartDate);
      const weekDates = generateWeekDates(mondayStr);

      let filtered = [];

      if (userrole === "admin" || userrole === "dispatch") {
          // для админа или диспетчера — выбор группы вручную
          filtered = allSessions.filter(session => {
            const matchDate = weekDates.includes(session.date);
            const matchGroup = selectedOption === "Все группы" || session.group.groupname === selectedOption;
            return matchDate && matchGroup;
          });
        } else if (userrole === "coach" || userrole === "athlete") {
          // для тренера или атлета — фиксированная группа
          filtered = allSessions.filter(session => {
            const matchDate = weekDates.includes(session.date);
            const matchGroup = session.group.groupid === groupid;
            return matchDate && matchGroup;
          });
        }

      const grouped = groupWeekSessions(filtered, weekDates);
      setSchedule(grouped);
    })
    .catch(error => {
      console.error('Ошибка при загрузке расписания:', error);
      toast("Что-то пошло не так при загрузке расписания! " + "(" + (error.message) + ")", {
        autoClose: 3000,
        progressClassName: "custom-progress",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
      });
    });
};




  useEffect(() => {
    if (session_id != null) {
      setIsLoggedIn(true);

    axios.get("api/Group/getGroups")
    .then(response => {
      const data = response.data;
      setGroups(data);
    })
    .catch(error => {
      console.error('Ошибка при загрузке списка групп: ', error)
      toast("Ошибка при загрузке групп  " + "(" + (error.message) + ")", {
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

    axios.get("api/Users/getUserProfile?session_id=" + getSessionCookie())
    .then(response => {
      const groupname = response.data.groupName;
      const groupid = response.data.groupId;
      const userrole = response.data.role;
      setUserRole(userrole);
      setGroupname(groupname);
      setGroupid(groupid);
      
      axios.get('api/Schedule/getweeklyschedule')
      .then(response => {


      const allSessions = response.data;
      const mondayStr = formatLocalDate(weekStartDate);
      const weekDates = generateWeekDates(mondayStr);


      let filtered = [];

        if (userrole === "admin" || userrole === "dispatch") {
          // для админа или диспетчера — выбор группы вручную
          filtered = allSessions.filter(session => {
            const matchDate = weekDates.includes(session.date);
            const matchGroup = selectedOption === "Все группы" || session.group.groupname === selectedOption;
            return matchDate && matchGroup;
          });
        } else if (userrole === "coach" || userrole === "athlete") {
          // для тренера или атлета — фиксированная группа
          filtered = allSessions.filter(session => {
            const matchDate = weekDates.includes(session.date);
            const matchGroup = session.group.groupid === groupid;
            return matchDate && matchGroup;
          });
        }
        
        
        const grouped = groupWeekSessions(filtered, weekDates);
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
    })
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
    
    
  }, [weekStartDate, selectedOption]);

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


      if (userrole === "dispatch" || userrole === "admin")
      {
              return (

          <div className="max-w-full px-4 py-3">
              {/* Заголовок и кнопки — в одном flex-контейнере */}
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-2xl font-bold text-left">Расписание</h1>
              {/* Группа Dropdown */}

              <div className="relative inline-block text-left ml-4">
                      <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 
                        bg-white text-xs font-medium text-gray-700 hover:bg-gray-50"
                      >
                        {selectedOption} <ArrowDown className="w-4 h-4 ml-1" />
                      </button>


                        {isOpen && (
                      <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          {/* Опция "Все группы" */}
                          <button
                            onClick={() => {
                              setSelectedOption("Все группы");
                              setIsOpen(false);
                            }}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            Все группы
                          </button>

                          {/* Список групп из API */}
                          {groups.map((group) => (
                            <button
                              key={group.groupid}
                              onClick={() => {
                                setSelectedOption(group.groupname);
                                setIsOpen(false);
                                 // передаем выбранный id группы наверх
                              }}
                              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                              {group.groupname}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const prev = new Date(weekStartDate);
                      prev.setDate(prev.getDate() - 7);
                      setWeekStartDate(prev);
                    }}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <ChevronLeftIcon size={20} />
                  </button>
                  <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                    <CalendarIcon size={18} className="text-blue-600 mr-2" />
                    <span className="text-sm font-medium">
                      <span className="text-sm font-medium">
                       {formatDate(formatLocalDate(weekStartDate))} - {
                          formatDate(formatLocalDate(new Date(
                            new Date(weekStartDate).setDate(weekStartDate.getDate() + 6)
                          )))
                        }
                    </span>
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const next = new Date(weekStartDate);
                      next.setDate(next.getDate() + 7);
                      setWeekStartDate(next);
                    }}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <ChevronRightIcon size={20} />
                  </button>
                </div>

          </div>

              {/* Расписание по дням */}
              <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
                {schedule.map(day => (
                  <div key={day.date} className="bg-white rounded shadow p-3 min-h-[200px]">
                    <h2 className="text-center font-semibold text-blue-500 capitalize">
                      {formatDate(day.date)}
                    </h2>

                    {Array.from({ length: 4 }).map((_, index) => {
                      const session = day.sessions[index];
                      return session ? (
                        <div
                          key={index}
                          className="border p-2 mb-2 rounded bg-blue-50 text-sm"
                        >
                          <div className='flex-col'>
                          <EditIcon
                            size={16}
                            className="-mb-5 ml-auto hover:text-blue-500 cursor-pointer"
                            onClick={() => handleEditSession(session)}
                          />
                          <SquareX
                            size={16}
                            className="hover:text-red-500 cursor-pointer mt-1"
                            onClick={() => {
                              setSessionToDelete(session); // сохранить выбранную сессию
                              setIsDeleteConfirmOpen(true); // открыть модалку
                            }}
                          />
                          </div>
                          <p>
                            <strong>{session.className}</strong>
                          </p>
                          <p>
                            {session.startTime} - {session.endTime}
                          </p>
                          <p>{session.group.groupname}</p>
                          <p className="text-xs text-gray-600">
                            {session.group.coach.fullname}
                          </p>
                        </div>
                      ) : (
                        <div
                          key={index}
                          className="border border-dashed p-2 mb-2 rounded text-gray-400 text-sm text-center hover:text-blue-500"
                        >
                          Добавить...
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
              {isModalOpen && selectedSession && (
                <EditSessionModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  session={selectedSession}
                  onSave={handleSaveChanges}
                  groups={groups}
                />
                )}
                {isDeleteConfirmOpen && sessionToDelete && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
                      <h2 className="text-lg font-semibold mb-4 text-center">Удалить занятие?</h2>
                      <p className="mb-4 text-sm text-gray-600">
                        Вы уверены, что хотите удалить занятие <strong>{sessionToDelete.className}</strong>?
                      </p>
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => setIsDeleteConfirmOpen(false)}
                          className="px-4 py-2 bg-gray-200 rounded"
                        >
                          Отмена
                        </button>
                        <button
                          onClick={async () => {
                            try {
                            await axios.delete(`api/ClassSessions/deleteClassSessionById?id=${sessionToDelete.id}`);
                            // Обнови расписание, если нужно — через props или повторный fetch
                            fetchSchedule();
                            toast("Занятие с наименованием - " + sessionToDelete.className + " удалено." , {
                            autoClose: 3000,
                            progressClassName: "custom-progress",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                              })
                            } catch (error) {
                              console.error('Ошибка при удалении:', error);
                              toast("Ошибка удаления занятия - " + sessionToDelete.className + " (" + error.message + ")"   , {
                            autoClose: 3000,
                            progressClassName: "custom-progress",
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                              })
                            } finally {
                              setIsDeleteConfirmOpen(false);
                              setSessionToDelete(null);
                            }
                          }}
                          className="px-4 py-2 bg-red-600 text-white rounded"
                        >
                          Удалить
                        </button>
                      </div>
                    </div>
                  </div>
                )}


            </div>
            
        );
      }

      else {
        return (
              <div className="max-w-full px-4 py-3">
              {/* Заголовок и кнопки — в одном flex-контейнере */}
            <div className="flex justify-between items-center mb-5">
              <h1 className="text-2xl font-bold text-left">Расписание</h1>
              {/* Кнопки переключения недель */}
              <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const prev = new Date(weekStartDate);
                      prev.setDate(prev.getDate() - 7);
                      setWeekStartDate(prev);
                    }}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <ChevronLeftIcon size={20} />
                  </button>
                  <div className="flex items-center bg-white px-4 py-2 rounded-lg shadow-sm">
                    <CalendarIcon size={18} className="text-blue-600 mr-2" />
                    <span className="text-sm font-medium">
                       {formatDate(formatLocalDate(weekStartDate))} - {
                          formatDate(formatLocalDate(new Date(
                            new Date(weekStartDate).setDate(weekStartDate.getDate() + 6)
                          )))
                        }
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      const next = new Date(weekStartDate);
                      next.setDate(next.getDate() + 7);
                      setWeekStartDate(next);
                    }}
                    className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"
                  >
                    <ChevronRightIcon size={20} />
                  </button>
                </div>
          </div>

            {/* Расписание по дням */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {schedule.map(day => (
                <div key={day.date} className="bg-white rounded shadow p-3 min-h-[200px]">
                  <h2 className="text-center font-semibold text-blue-500 capitalize">
                    {formatDate(day.date)}
                  </h2>

                  {Array.from({ length: 4 }).map((_, index) => {
                    const session = day.sessions[index];
                    return session ? (
                      <div
                        key={index}
                        className="border p-2 mb-2 rounded bg-blue-50 text-sm"
                      >
                        <p>
                          <strong>{session.className}</strong>
                        </p>
                        <p>
                          {session.startTime} - {session.endTime}
                        </p>
                        <p>{session.group.groupname}</p>
                        <p className="text-xs text-gray-600">
                          {session.group.coach.fullname}
                        </p>
                      </div>
                    ) : (
                      <div
                        key={index}
                        className="border border-dashed p-2 mb-2 rounded text-gray-400 text-sm text-center"
                      >
                        Пусто
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        )
      }


      
          
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
