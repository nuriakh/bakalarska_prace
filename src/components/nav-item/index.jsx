import React from 'react'
import { useState } from 'react';
import {ReactComponent as ArrowDown} from '../../images/arrowDown.svg';
import {ReactComponent as ArrowUp} from '../../images/ArrowUp.svg';


export const NavItem = ({text = '', children}) => {
	const [selected, setSelected] = useState('');
  return (
    <div className='relative inline-block'>
		<div className="flex items-center space-x-2 cursor-pointer">
	      <span className="text-gray-600 hover:text-slate-900" 
		    onClick={() => children && setSelected(text !== selected ? text : '')}
		  >{text}</span>
		  {children && selected !== text && <ArrowDown className="w-4 h-4"/>}
		  {children && selected === text && <ArrowUp className="w-4 h-4"/>}
	    </div>
	    {selected && children}
	</div>
  )
}
