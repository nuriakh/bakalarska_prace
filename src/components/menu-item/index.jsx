import React from 'react'

export const MenuItem = ({text = '', icon}) => {
  return (
	<div className='flex items-center w-full space-x-4'>
		{icon}
		<span className='text-gray-600 hover:text-slate-900 cursor-pointer'>{text}</span>
	</div>
  )
}
 