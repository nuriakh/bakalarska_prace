import React from 'react'
import { useState } from 'react';

export const ToDo = () => {
	const [tasks, setTasks] = useState([]);
	const [input, setInput] = useState('');
	
	const addTask = () => {
		if (input.trim() === '') return;
		const newTask = {id: Date.now(), text :input, status: 'todo'}
		setTasks([...tasks, newTask]);
		setInput('');
	}
	const todoTasks = tasks.filter((task) => task.status === 'todo');
	const inProgressTasks = tasks.filter((task) => task.status === 'inprogress');
	const doneTasks = tasks.filter((task) => task.status === 'done');
	
	const clearDone = () => {
		const updated = tasks.filter(task => task.status !== 'done');
		setTasks(updated);
	  };

	return (
    <div>
		<div className='flex gap-6'>
{/*/////////////////////////////////////////////////////////////////////////////////// /// */}
			<div className='bg-yellow-100 p-4 rounded-lg min-h-screen max-w-md w-full'>
			<h1 className="text-xl font-bold mb-4">ToDo</h1>
				<div className='flex gap-2 mb-4'>
					<input
					className="border px-3 py-2 w-full rounded"
					value={input} 
					onChange={(e) => setInput(e.target.value)}
					placeholder='Add a new task...'
					maxLength={100}
					/>
					<button
					className='bg-black text-white px-4 py-2 rounded'
					onClick={addTask}>Add</button>
				</div>
				<ul className='space-y-3'>
					{todoTasks.map((task) => (
						<li
						key={task.id}
						className="bg-white p-4 rounded shadow w-full min-h-[100px] flex items-center justify-between"
					  >
						<div className="break-words text-left w-[calc(100%-80px)] text-sm leading-snug">
						  {task.text}
						</div>
						<button
						  className="bg-green-600 text-white px-3 py-1 rounded text-sm shrink-0"
						  onClick={() => {
							const updated = tasks.map(t =>
							  t.id === task.id ? { ...t, status: 'inprogress'} : t
							);
							setTasks(updated);
						  }}
						>
						  Start
						</button>
					  </li>
					  
					))}
				</ul>
			</div>
{/*/////////////////////////////////////////////////////////////////////////////////// /// */}
			<div className="bg-blue-100 p-4 rounded-lg min-h-screen max-w-md w-full">
                <h2 className="text-xl font-bold mb-4">In Progress</h2>
                 <ul className="space-y-3">
				{inProgressTasks.map((task) => (
                    <li
					key={task.id}
					className="bg-white p-4 rounded shadow w-full min-h-[100px] flex items-center justify-between"
				  >
					<div className="break-words text-left w-[calc(100%-80px)] text-sm leading-snug">
					  {task.text}
					</div>
					<button
					  className="bg-green-600 text-white px-3 py-1 rounded text-sm shrink-0"
					  onClick={() => {
						const updated = tasks.map(t =>
						  t.id === task.id ? { ...t, status: 'done'} : t
						);
						setTasks(updated);
					  }}
					>
					  Done
					</button>
				  </li>
                 ))}
                </ul>
			</div>
{/*/////////////////////////////////////////////////////////////////////////////////// /// */}
			<div className="bg-green-100 p-4 rounded-lg min-h-screen max-w-md w-full">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-xl font-bold">Done</h2>
				<button
					className="bg-red-600 text-white px-4 py-2 rounded"
					onClick={clearDone}
				>
					Clear
				</button>
			</div>
			  <ul className="space-y-3">
			    {doneTasks.map((task) => (
			      <li
			        key={task.id}
			        className="bg-white p-4 rounded shadow h-24 w-full flex items-center justify-center text-center"
			      >
			        <div className="break-words w-full px-2">
			          {task.text}
			        </div>
			      </li>
			    ))}
			  </ul>
			</div>

		</div>
	</div>
  )
}
