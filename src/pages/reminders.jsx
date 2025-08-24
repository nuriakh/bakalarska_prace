import React, { useState, useEffect } from 'react';

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [text, setText] = useState("");
  const [interval, setIntervalMinutes] = useState(60);
  const [start, setStart] = useState("09:00");
  const [end, setEnd] = useState("18:00");
  const [selectedDays, setSelectedDays] = useState(["Mon", "Tue", "Wed", "Thu", "Fri"]);
  const [popup, setPopup] = useState(null);

  // Helper to get current time in minutes
  const getCurrentMinutes = () => {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
  };

  // const getCurrentDay = () => {
  //   return daysOfWeek[new Date().getDay() - 1];
  // };
  const getCurrentDay = () => {
    const d = new Date().getDay(); // 0 = Sunday, 1 = Monday ... 6 = Saturday
    return daysOfWeek[(d + 6) % 7]; 
    // 0 (Sunday) → 6 ("Sun")
    // 1 (Monday) → 0 ("Mon")
  };

  // Time string to minutes
  const parseTime = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  // Reminder checker
  useEffect(() => {
    const timer = setInterval(() => {
      const nowMin = getCurrentMinutes();
      const nowDay = getCurrentDay();

      setReminders((prev) =>
        prev.map((reminder) => {
          const startMin = parseTime(reminder.start);
          const endMin = parseTime(reminder.end);
          const lastTrig = reminder.lastTriggered ?? -Infinity;

          const shouldShow =
            reminder.days.includes(nowDay) &&
            nowMin >= startMin &&
            nowMin <= endMin &&
            nowMin - lastTrig >= reminder.interval;

          if (shouldShow) {
            setPopup(reminder.text);
            setTimeout(() => setPopup(null), 5000);

            return { ...reminder, lastTriggered: nowMin };
          }

          return reminder;
        })
      );
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Add new reminder
  const handleAdd = () => {
    if (!text.trim()) return;
    setReminders([
      ...reminders,
      {
        id: Date.now(),
        text,
        interval: Number(interval),
        start,
        end,
        days: selectedDays,
        lastTriggered: null,
      },
    ]);
    setText("");
  };

  const toggleDay = (day) => {
    setSelectedDays((prev) =>
      prev.includes(day)
        ? prev.filter((d) => d !== day)
        : [...prev, day]
    );
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((r) => r.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Reminders</h1>

      {/* Add Reminder Form */}
      <div className="bg-gray-100 p-4 rounded mb-6 shadow">
        <h2 className="text-xl font-semibold mb-3">Create Reminder</h2>
        <input
          type="text"
          placeholder="Reminder message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />
        <div className="flex gap-4 mb-3">
          <div>
            <label className="block text-sm font-medium">Interval (min)</label>
            <input
              type="number"
              value={interval}
              onChange={(e) => setIntervalMinutes(e.target.value)}
              className="p-2 border rounded w-24"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Start</label>
            <input
              type="time"
              value={start}
              onChange={(e) => setStart(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">End</label>
            <input
              type="time"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
              className="p-2 border rounded"
            />
          </div>
        </div>

        {/* Days */}
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Days</label>
          <div className="flex gap-2 flex-wrap">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`px-3 py-1 rounded border ${
                  selectedDays.includes(day)
                    ? "bg-blue-500 text-white"
                    : "bg-white"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Add Reminder
        </button>
      </div>

      {/* Active Reminders */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Active Reminders</h2>
        <ul className="space-y-4">
          {reminders.map((r) => (
            <li
              key={r.id}
              className="p-4 border rounded shadow-sm bg-white flex justify-between items-center"
            >
              <div>
                <div className="font-medium">{r.text}</div>
                <div className="text-sm text-gray-500">
                  Every {r.interval} min — {r.start} to {r.end} on {r.days.join(", ")}
                </div>
              </div>
              <button
                onClick={() => deleteReminder(r.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Popup */}
      {popup && (
        <div className="fixed bottom-6 right-6 bg-blue-100 border border-blue-400 text-blue-800 px-6 py-4 rounded shadow-md z-50">
          <strong>Reminder:</strong> {popup}
        </div>
      )}
    </div>
  );
};
