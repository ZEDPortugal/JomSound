import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FaSun, FaMoon } from 'react-icons/fa';

function Navbar({ isLight, handleToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleNav = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Smooth and slow scroll to section
  const scrollToSection = (id) => {
    const section = document.querySelector(id);
    if (section) {
      const top = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: top - (window.innerHeight / 1.2 - section.offsetHeight / 4), // Center the section vertically
        behavior: 'smooth',
      });
      setMenuOpen(false); // Close the mobile menu after navigation
    }
  };

  return (
    <nav className={`animate-fade-down animate-once animate-duration-[200ms] flex w-full h-20 shadow-xl fixed top-0 left-0 z-10 opacity-50 ${isLight ? 'bg-white' : 'bg-black'}`}>
      <div className={`flex justify-between items-center h-full w-full px-4 2xl:px-16 opacity-80 hover:opacity-100 ease-in-out duration-200 ${isLight ? 'bg-white' : 'bg-black'}`}>
        <div onClick={() => scrollToSection('#home')} className={`${isLight ? 'text-black' : 'text-white'} ease-in-out hover:text-red-500 duration-1000 font-michroma font-bold text-3xl`}>JomSound</div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex font-michroma text-base mr-6">
          <ul className={`flex ${isLight ? 'text-black' : 'text-white'}`}>
            <li
              onClick={() => scrollToSection('#home')}
              className="ml-10 uppercase hover:text-[#ff2020] ease-in-out duration-200 cursor-pointer"
            >
              Home
            </li>
            <li
              onClick={() => scrollToSection('#about')}
              className="ml-10 uppercase hover:text-[#ff2020] ease-in-out duration-200  cursor-pointer"
            >
              About
            </li>
            <li
              onClick={() => scrollToSection('#projects')}
              className="ml-10 uppercase hover:text-[#ff2020] ease-in-out duration-200  cursor-pointer"
            >
              Projects
            </li>

            
          </ul>


          
        </div>

        <div className="day-night hidden md:flex">
          <button
            onClick={handleToggle}
            className={`p-2 rounded-full font-semibold hover:text-[#ff2020] duration-500 ${
              isLight ? "bg-[#ffffff] text-black" : "bg-[#060606] text-white"
            }`}
          >
            {isLight ? (
              <FaSun className="text-2xl" />
            ) : (
              <FaMoon className="text-2xl" />
            )}
          </button>
        </div>




        {/* Mobile Menu Icon */}
        <div onClick={handleNav} className={`md:hidden cursor-pointer ${isLight ? 'text-black' : 'text-white'}`} aria-label="Toggle menu">
          <AiOutlineMenu size={25} />
        </div>
        
        {/* Mobile Navigation */}
        <div
          ref={menuRef}
          className={
            menuOpen
              ? `fixed left-0 top-0 w-[70%] md:hidden h-screen ${isLight ? 'bg-[#ffffff]' : 'bg-[#000000]'} p-10 ease-in duration-500`
              : 'fixed left-[-100%] top-0 p-10 h-screen ease-out duration-500'
          }
        >
          <div className={`flex w-full items-center justify-end ${isLight ? 'text-black' : 'text-white'}`}>
            <div onClick={handleNav} className="cursor-pointer" aria-label="Close menu">
              <AiOutlineClose size={25} />
            </div>
          </div>
          <div className={`py-4 flex flex-col ${isLight ? 'text-black' : 'text-white'} font-michroma text-lg`}>

            <ul>
              <li
                onClick={() => scrollToSection('#home')}
                className="py-4 uppercase hover:text-[#ff2020] ease-in-out duration-200 cursor-pointer"
              >
                Home
              </li>
              <li
                onClick={() => scrollToSection('#about')}
                className="py-4 uppercase hover:text-[#ff2020] ease-in-out duration-200 cursor-pointer"
              >
                About
              </li>
              <li
                onClick={() => scrollToSection('#projects')}
                className="py-4 uppercase hover:text-[#ff2020] ease-in-out duration-200 cursor-pointer"
              >
                Projects
              </li>
              <li className="py-4 uppercase cursor-pointer">
              </li>

              <div className="day-night">
          <button
            onClick={handleToggle}
            className={`p-2 rounded-full font-semibold hover:text-[#ff2020] duration-500 ${
              isLight ? "bg-[#ffffff] text-black" : "bg-[#060606] text-white"
            }`}
          >
            {isLight ? (
              <FaSun className="text-2xl" />
            ) : (
              <FaMoon className="text-2xl" />
            )}
          </button>
        </div>

            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;