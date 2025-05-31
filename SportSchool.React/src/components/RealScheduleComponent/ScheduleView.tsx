
import "./RealScheduleComponent.css";
import { ChevronLeftIcon, ChevronRightIcon, CalendarIcon } from "lucide-react";
import ScheduleDay from "./ScheduleDay";

const config = {
    headers: {
       "Access-Control-Allow-Origin": "*",
       "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
    }
 };

 function RealScheduleComponent ({ scheduleData }) {
    return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Расписание занятий</h1>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronLeftIcon size={20} />
          </button>
          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded border border-gray-200">
            <CalendarIcon size={18} className="text-blue-600" />
            <span className="text-sm">Текущая неделя</span>
          </div>
          <button className="p-1 hover:bg-gray-100 rounded">
            <ChevronRightIcon size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {scheduleData.days.map(day => (
          <ScheduleDay key={day.id} day={day} />
        ))}
      </div>
    </div>
  );
}

