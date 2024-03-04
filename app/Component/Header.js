'use client'
import React, { useState, useEffect } from 'react';
import { TbMenu2 } from 'react-icons/tb';
import {GrClose} from 'react-icons/gr';
import Link from 'next/link';
const Header = () => {
  const [toggle, setToggle] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  const closePopup = () => {
    setToggle(false);
  };


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
      console.log('Scrolling');
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 ${isSticky ? 'bg-[#f9f9f9]' : 'bg-[#fff]'}`}>
      
      <div class="site_header w-[1140px] max-w-[100%] mx-auto px-3 sm:px-4 py-4 flex justify-between text-[#222] items-center">
        <div className=''>
          <a href='/'>
            <img src="../images/Logo.svg" alt="House Health" />
          </a>
        </div>
        <div className='menu flex flex-inline space-x-2 md:space-x-8 cursor-pointer'>
            {
              toggle ?
                <GrClose onClick = {()=>setToggle(!toggle)} className="text-3xl text-[#6e2feb] md:hidden block" />:
                <TbMenu2 onClick = {()=>setToggle(!toggle)} className="text-3xl text-[#6e2feb] md:hidden block" />              
            }
            <div className='hidden md:flex gap-10'>
              <Link href='/Home' className='cursor-pointer hover:text-[#6e2feb] active:text-[#6e2feb] focus:text-[#6e2feb]'>Home</Link>
              <Link href='/Casereview' className='cursor-pointer hover:text-[#6e2feb] active:text-[#6e2feb] focus:text-[#6e2feb]'>Case Review</Link>
              <Link href='/About' className='cursor-pointer hover:text-[#6e2feb] active:text-[#6e2feb] focus:text-[#6e2feb]'>About Us</Link>
              <Link href='/Contact' className='cursor-pointer hover:text-[#6e2feb] active:text-[#6e2feb] focus:text-[#6e2feb]'>Contact Us</Link>
              
            </div>
            <div className={`flex flex-col pt-20 duration-500 
            md:hidden w-full max-w-[100%] h-[100vh] px-0 py-2 sm:px-0 sm:py-5 z-40 items-center fixed 
            gap-10 bg-gradient-to-r from-[#8E4AE6] to-[#3C1FAF] text-white top-[55px] 
            ${ toggle ? 'top-[70px] right-[0]' : 'right-[100%] top-[70px]'}`}>
                  <Link href="/Home" onClick={closePopup}
                  className='flex-col cursor-pointer hover:text-[#fff] active:text-[#6e2feb] focus:text-[#6e2feb]'>Home</Link>
                  <Link href='/Casereview' onClick={closePopup}
                  className='cursor-pointer hover:text-[#fff] active:text-[#6e2feb] focus:text-[#6e2feb]'>Case Review</Link>
                  <Link href='/About' onClick={closePopup}
                  className='cursor-pointer hover:text-[#fff] active:text-[#6e2feb] focus:text-[#6e2feb]'>About Us</Link>
                  <Link href='/Contact' onClick={closePopup}
                  className='cursor-pointer hover:text-[#fff] active:text-[#6e2feb] focus:text-[#6e2feb]'>Contact Us</Link>
                  
            </div>
        </div>
        
      </div>
    </header>
  )
}

export default Header