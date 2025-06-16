import { useEffect, useState } from 'react';


const EditSessionModal = ({ isOpen, onClose, session, onSave, groups }) => {
  const [formData, setFormData] = useState({
    id: session?.id || 0,
    className: session?.className || '',
    date: session?.date || '',
    startTime: session?.startTime || '',
    endTime: session?.endTime || '',
    groupName: session?.group?.groupname || '',
  });

  useEffect(() => {
    if (session) {
      setFormData({
        id: session.id,
        className: session.className,
        date: session.date,
        startTime: session.startTime,
        endTime: session.endTime,
        groupName: session.group?.groupname,
      });
    }
  }, [session]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Редактировать карточку занятия...</h2>

        <div className="space-y-2">
          <input
            name="className"
            value={formData.className}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Название занятия"
          />
          <input
            name="date"
            type="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="startTime"
            type="time"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
          <input
            name="endTime"
            type="time"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full p-2 border rounded "
          />
          <select
            name="groupName"
            value={formData.groupName}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="" disabled>Выберите группу</option>
            {groups.map(group => (
              <option key={group.groupid} value={group.groupname}>
                {group.groupname}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Отмена</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500">Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default EditSessionModal;