import ScheduleClass from "./ScheduleClass";

const ScheduleDay = ({ day }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="font-semibold text-gray-900">{day.name}</h2>
        <p className="text-sm text-gray-500">{day.date}</p>
      </div>
      <div className="divide-y">
        {day.classes.map((classItem, index) => (
          <ScheduleClass key={index} classItem={classItem} />
        ))}
      </div>
    </div>
  );
};

export default ScheduleDay;