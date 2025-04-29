import React from 'react'
import Button from './Button';
import SlideImage from './Slideimage';
import { HeroHighlightDemo } from './Headertext';



const Header = () => {
  return (
    <div className='h-[100vh] bg-black '>

      <div>
        <HeroHighlightDemo />
        {/* <a className='text-white text-[50px] font-[700] mt-10 flex justify-center items-center text-center tracking-widest bg-black'>
          From your Vision to stunning Creations <br /> crafted by WildMind
        </a> */}
      </div>


      <SlideImage />
      <Button />

    </div>
  )
}

export default Header;