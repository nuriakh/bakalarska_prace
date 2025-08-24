import React, { useState } from 'react';
import { FaEdit, FaTrash, FaForward, FaPlus } from 'react-icons/fa';

const defaultRoutines = [
  { id: 1, name: 'Wash your face', done: false, skipped: false },
  { id: 2, name: 'Make your bed', done: false, skipped: false },
  { id: 3, name: 'Do morning exercise', done: false, skipped: false },
  { id: 4, name: 'Drink a glass of water', done: false, skipped: false },
  { id: 5, name: 'Meditate', done: false, skipped: false },
];

export const Routines = () => {
  const [routines, setRoutines] = useState(defaultRoutines);
  const [eveningRoutines, setEveningRoutines] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newRoutineText, setNewRoutineText] = useState('');
  const [newEveningText, setNewEveningText] = useState('');
  const [message, setMessage] = useState('');

  const showMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 3000);
  };

  const toggleDone = (id) => {
    setRoutines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done, skipped: false } : r))
    );
  };

  const skipRoutine = (id) => {
    setRoutines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, skipped: !r.skipped, done: false } : r))
    );
  };

  const deleteRoutine = (id) => {
    setRoutines((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddRoutine = () => {
    const trimmed = newRoutineText.trim();
    if (trimmed === '') return;
    const newRoutine = {
      id: Date.now(),
      name: trimmed,
      done: false,
      skipped: false,
    };
    setRoutines([...routines, newRoutine]);
    setNewRoutineText('');
  };

  const toggleEveningDone = (id) => {
    setEveningRoutines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done, skipped: false } : r))
    );
  };

  const skipEvening = (id) => {
    setEveningRoutines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, skipped: !r.skipped, done: false } : r))
    );
  };

  const deleteEvening = (id) => {
    setEveningRoutines((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddEveningRoutine = () => {
    const trimmed = newEveningText.trim();
    if (trimmed === '') return;
    const newRoutine = {
      id: Date.now(),
      name: trimmed,
      done: false,
      skipped: false,
    };
    setEveningRoutines([...eveningRoutines, newRoutine]);
    setNewEveningText('');
  };

  const renderRoutineSection = (title, routinesList, toggle, skip, del, inputValue, setInput, onAdd) => (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-semibold">{title}</h1>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className="flex items-center text-sm text-blue-600 hover:underline"
        >
          <FaEdit className="mr-2" />
          {isEditing ? 'Done Editing' : 'Edit'}
        </button>
      </div>

      <div className="flex mb-6 max-w-4xl mx-auto space-x-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add new routine..."
          className="flex-grow px-4 py-2 border rounded shadow-sm"
        />
        <button
          onClick={onAdd}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <FaPlus className="mr-2" /> Add
        </button>
      </div>

      <div className="space-y-4 max-w-4xl mx-auto">
        {routinesList.map((routine) => (
          <div
            key={routine.id}
            className={`flex items-center justify-between bg-white px-6 py-4 rounded shadow border-l-4 transition ${
              routine.done
                ? 'border-green-400 bg-green-50'
                : routine.skipped
                ? 'border-yellow-400 bg-yellow-50'
                : 'border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={routine.done}
                onChange={() => toggle(routine.id)}
                className="h-5 w-5"
              />
              <span
                className={`text-lg ${
                  routine.done ? 'line-through text-gray-400' : ''
                }`}
              >
                {routine.name}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              {!routine.done && (
                <button
                  onClick={() => skip(routine.id)}
                  className="text-sm text-yellow-500 hover:underline flex items-center"
                >
                  <FaForward className="mr-1" /> Skip
                </button>
              )}
              {isEditing && (
                <button
                  onClick={() => del(routine.id)}
                  className="text-sm text-red-500 hover:underline flex items-center"
                >
                  <FaTrash className="mr-1" /> Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => showMessage(`${title} complete! Great job!`)}
          className="px-10 py-3 bg-blue-600 text-white text-lg rounded hover:bg-blue-700 shadow"
        >
          Done
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen px-20 py-10 bg-gray-100 text-gray-800 font-sans relative">
      {message && (
        <div className="fixed top-6 right-6 bg-green-600 text-white px-4 py-2 rounded shadow-lg z-50">
          {message}
        </div>
      )}

      {renderRoutineSection(
        'Morning Routine',
        routines,
        toggleDone,
        skipRoutine,
        deleteRoutine,
        newRoutineText,
        setNewRoutineText,
        handleAddRoutine
      )}

      {renderRoutineSection(
        'Evening Routine',
        eveningRoutines,
        toggleEveningDone,
        skipEvening,
        deleteEvening,
        newEveningText,
        setNewEveningText,
        handleAddEveningRoutine
      )}
    </div>
  );
};









