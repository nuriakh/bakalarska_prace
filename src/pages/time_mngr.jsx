import React, { useState, useEffect, useRef } from 'react';


export const TimeMngr = () => {
  const [mode, setMode] = useState('pomodoro'); // 'pomodoro' | 'custom' | 'customRunning'
  const [customWork, setCustomWork] = useState(25);
  const [customBreak, setCustomBreak] = useState(5);
  const [currentPhase, setCurrentPhase] = useState('work'); // 'work' | 'break'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handlePhaseSwitch();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handlePhaseSwitch = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);

    if (currentPhase === 'work') {
      setCurrentPhase('break');
      const next = mode === 'pomodoro' ? 5 * 60 : customBreak * 60;
      setTimeLeft(next);
    } else {
      setCurrentPhase('work');
      const next = mode === 'pomodoro' ? 25 * 60 : customWork * 60;
      setTimeLeft(next);
    }

    setIsRunning(true);
  };

  const formatTime = (seconds) =>
    `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  const startTimer = () => {
    if (timeLeft > 0) setIsRunning(true);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    if (mode === 'pomodoro') {
      setTimeLeft(25 * 60);
    } else {
      setTimeLeft(customWork * 60);
    }
    setCurrentPhase('work');
  };

  const saveCustomMethod = () => {
    const work = parseInt(customWork);
    const rest = parseInt(customBreak);
    if (work > 0 && rest > 0) {
      setMode('customRunning');
      setCurrentPhase('work');
      setTimeLeft(work * 60);
    }
  };

  return (
    <div className="flex h-screen font-sans">
      {/* Left Menu */}
      <div className="w-1/4 bg-gray-100 p-4">
        <h2 className="text-lg font-semibold mb-4">Select Method</h2>
        <button
          className={`block w-full text-left px-4 py-2 mb-2 rounded ${
            mode === 'pomodoro' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={() => {
            stopTimer();
            setMode('pomodoro');
            setTimeLeft(25 * 60);
            setCurrentPhase('work');
          }}
        >
          Pomodoro Method
        </button>
        <button
          className={`block w-full text-left px-4 py-2 rounded ${
            mode === 'custom' ? 'bg-blue-500 text-white' : 'bg-white'
          }`}
          onClick={() => {
            stopTimer();
            setMode('custom');
          }}
        >
          Create Custom Method
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10 flex flex-col items-center justify-center">
        {(mode === 'pomodoro' || mode === 'customRunning') && (
          <>
            <h1 className="text-2xl mb-4 font-bold">
              {currentPhase === 'work' ? 'Focus Time' : 'Break Time'}
            </h1>
            <div className="text-6xl font-mono mb-6">{formatTime(timeLeft)}</div>
            <div className="space-x-4">
              <button
                onClick={startTimer}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Start
              </button>
              <button
                onClick={stopTimer}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Pause
              </button>
              <button
                onClick={resetTimer}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Reset
              </button>
            </div>
          </>
        )}

        {mode === 'custom' && (
          <div className="w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4">Create Your Method</h2>
            <label className="block mb-2">
              Focus Time (minutes):
              <input
                type="number"
                value={customWork}
                onChange={(e) => setCustomWork(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </label>
            <label className="block mb-4">
              Break Time (minutes):
              <input
                type="number"
                value={customBreak}
                onChange={(e) => setCustomBreak(e.target.value)}
                className="w-full p-2 border rounded mt-1"
              />
            </label>
            <button
              onClick={saveCustomMethod}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              Save Method
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

