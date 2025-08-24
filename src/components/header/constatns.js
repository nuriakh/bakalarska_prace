import {ReactComponent as Todo} from '../../images/todo.svg';
import {ReactComponent as Calendar} from '../../images/calendar.svg';
import {ReactComponent as Routin} from '../../images/routins.svg';
import {ReactComponent as Time} from '../../images/time.svg';
import {ReactComponent as Reminder} from '../../images/reminder.svg';
import { Link } from 'react-router-dom';

export const FEATURES = [
		{text: <Link to={"/todo"} className='flex items-center gap-2'>ToDo List</Link>, icon : <Todo className="w-4 h-4" />},
		{text: <Link to={"/calendar"} className='flex items-center gap-2'>Calendar</Link>, icon : <Calendar className="w-4 h-4" />},
		{text: <Link to={"/routines"} className='flex items-center gap-2'>Routines</Link>, icon : <Routin className="w-4 h-4"/>},
		{text: <Link to={"/time_manager"} className='flex items-center gap-2'>Time Mngr</Link>, icon : <Time className="w-4 h-4"/>},
		{text: <Link to={"/reminders"} className='flex items-center gap-2'>Reminders</Link>, icon : <Reminder className="w-4 h-4"/>}
]