import React from 'react'
import { MenuItem } from '../menu-item'

export const NavMenu = ({items = []  }) => {
  return (
	<div className='flex flex-col px-4 bg-white drop-shadow rouded-lg absolute top-10  space-y-2 z-30 w-36'> 
	{items.map(({text, icon}) => <MenuItem key={text} text = {text} icon = {icon}/> ) }</div>
  )
}
