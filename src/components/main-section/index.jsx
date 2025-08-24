import React from 'react'
import mainImg from '../../images/mainImg.png';
import { Button } from '../button';

export const MainSection = () => {
  return (
	<section className="w-full h-screen flex items-center justify-start px-12 justify-between">
      <div className="max-w-xl text-left -ml-5">
        <h1 className="text-7xl font-black whitespace-pre-line">{`Web\nAssistant`}</h1>
        <p className="text-gray-600 text-lg my-8 whitespace-pre-line">
          {`Lorem Ipsum is simply dummy text of the printing and typesetting\nindustry. Lorem Ipsum has been the industry's standard dummy\ntext ever since the 1500s, when an unknown printer took a galley\nof type and scrambled it to make a type specimen book.`}
        </p>
        <Button isFilled={true}>Learn More</Button>
      </div>
      <div className='flex w-2/4 mt-20'>
		<img src={mainImg} alt="main"/>
	  </div>
    </section>
  )
}
