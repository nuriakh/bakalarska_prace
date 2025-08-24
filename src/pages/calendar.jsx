import React, { useState } from 'react';
import {
  format,
  startOfWeek,
  addDays,
  isToday,
} from 'date-fns';

export const Calendar = () => {
  const [weekOffset, setWeekOffset] = useState(0);
  const [events, setEvents] = useState([]);
  const [expandedEventDate, setExpandedEventDate] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalDate, setModalDate] = useState('');
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventDesc, setNewEventDesc] = useState('');
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');

  const today = new Date();
  const startOfCurrentWeek = startOfWeek(addDays(today, weekOffset * 7), { weekStartsOn: 1 });
  const calendarDays = [...Array(14)].map((_, index) => addDays(startOfCurrentWeek, index));

  const goToPreviousWeek = () => setWeekOffset(weekOffset - 1);
  const goToNextWeek = () => setWeekOffset(weekOffset + 1);

  const toggleExpand = (date) => {
    setExpandedEventDate((prev) => (prev === date ? null : date));
  };

  const openModal = (dateStr) => {
    setModalDate(dateStr);
    setModalOpen(true);
    setNewEventTitle('');
    setNewEventDesc('');
    setNewStartTime('');
    setNewEndTime('');
  };

  const saveEvent = () => {
    if (!newEventTitle.trim() || !newStartTime || !newEndTime) return;

    setEvents([
      ...events,
      {
        date: modalDate,
        title: newEventTitle.trim(),
        description: newEventDesc.trim(),
        startTime: newStartTime,
        endTime: newEndTime,
      },
    ]);
    setModalOpen(false);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <button onClick={goToPreviousWeek} className="text-2xl text-gray-700 hover:text-black">&lt;</button>
        <h1 className="text-3xl font-bold">
          {format(startOfCurrentWeek, 'MMMM yyyy')} – {format(addDays(startOfCurrentWeek, 13), 'MMMM yyyy')}
        </h1>
        <button onClick={goToNextWeek} className="text-2xl text-gray-700 hover:text-black">&gt;</button>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-6">
        {calendarDays.map((day, index) => {
          const dayStr = format(day, 'yyyy-MM-dd');
          const dayEvents = events.filter(event => event.date === dayStr);
          const isCurrentDay = isToday(day);

          return (
            <div
			  key={index}
			  className={`p-3 rounded h-64 flex flex-col justify-between 
			    ${isToday(day)
			      ? 'bg-green-100 text-orange-600 border-orange-200 '
			      : 'bg-yellow-50 text-white border-none'}`}
			>

              {/* Day Header */}
              <div className="mb-2">
                <div className={`text-xs uppercase font-medium tracking-wide ${isCurrentDay ? 'text-black' : 'text-gray-400'}`}>
                    {format(day, 'EEE')}
                </div>
            <div className={`text-2xl font-bold ${isCurrentDay ? 'text-black' : 'text-black'}`}>
                 {format(day, 'dd')}
            </div>
                <hr className={`mt-1 border-t ${isCurrentDay ? 'border-black' : 'border-gray-300'}`} />
			</div>

              {/* Events */}
              <div className="flex-grow overflow-y-auto space-y-2">
                {dayEvents.map((event, idx) => (
                  <div
                    key={idx}
                    onClick={() => toggleExpand(dayStr)}
                    className="text-sm cursor-pointer text-gray-800 hover:underline"
                  >
                    <div className="font-medium">{event.title}</div>
                    {expandedEventDate === dayStr && (
                      <div className="text-xs text-gray-500">
                        {event.startTime} – {event.endTime}<br />
                        {event.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Event Button */}
              <button
                onClick={() => openModal(dayStr)}
                className="text-xs text-blue-600 hover:underline mt-2"
              >
                + Add event
              </button>
            </div>
          );
        })}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-80 animate-fade-in">
            <h2 className="text-lg font-bold mb-2">Add Event</h2>
            <p className="text-xs text-gray-500 mb-2">{modalDate}</p>
            <input
              value={newEventTitle}
              onChange={(e) => setNewEventTitle(e.target.value)}
              placeholder="Title"
              className="border px-3 py-2 rounded w-full mb-2 text-sm"
              maxLength={19}
            />
            <textarea
              value={newEventDesc}
              onChange={(e) => setNewEventDesc(e.target.value)}
              placeholder="Description"
              rows="2"
              className="border px-3 py-2 rounded w-full mb-2 text-sm resize-none"
              maxLength={25}
            />
            <div className="flex space-x-2 mb-2">
              <input
                type="time"
                value={newStartTime}
                onChange={(e) => setNewStartTime(e.target.value)}
                className="border px-3 py-2 rounded text-sm w-1/2"
              />
              <input
                type="time"
                value={newEndTime}
                onChange={(e) => setNewEndTime(e.target.value)}
                className="border px-3 py-2 rounded text-sm w-1/2"
              />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={() => setModalOpen(false)} className="text-sm px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
              <button onClick={saveEvent} className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
