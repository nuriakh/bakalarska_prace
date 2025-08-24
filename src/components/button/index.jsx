import React from 'react'

const borderStyles = ' border-2 border-black rounded-lg';
const filledStyles = 'text-white bg-black rounded-lg font-bold y-4 px-6 mx-0 hover:bg-transparent hover:text-black border-2 border-black';

export const Button  = ({
	children = '',
	hasBorder = false,
	isFilled = false,
}) => {
	
	
  return (
	<button className={`text-gray-600 px-5 py-2 ${hasBorder && borderStyles} ${isFilled && filledStyles}`}>{children}</button>
)
}
