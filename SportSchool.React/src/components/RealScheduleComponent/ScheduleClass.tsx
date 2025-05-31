const ScheduleClass = ({ classItem }) => {
  return (
    <div className="p-4 text-sm text-gray-700">
      <div className="font-medium">{classItem.time} — {classItem.group}</div>
      <div className="text-gray-500">
        Тренер: {classItem.coach} <br />
        Место: {classItem.location}
      </div>
    </div>
  );
};

export default ScheduleClass;