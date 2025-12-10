import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { NAV_ITEMS } from '../constants';

// Throttle utility for scroll performance
const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

const Logo = ({ onClick }) => (
  <motion.div
    onClick={onClick}
    className="cursor-pointer"
    role="button"
    tabIndex={0}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <span className="font-grotesk text-lg font-bold text-white tracking-[0.15em] uppercase">
      JOM<span className="text-gold">SOUND</span>
    </span>
  </motion.div>
);

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visible, setVisible] = useState(false);
  const menuRef = useRef(null);

  const handleNav = useCallback(() => setMenuOpen(prev => !prev), []);
  const handleCloseMenu = useCallback(() => setMenuOpen(false), []);

  const scrollToSection = useCallback((sectionId) => {
    const section = document.querySelector(sectionId);
    if (section) {
      const top = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: top - 80, behavior: 'smooth' });
      setActiveSection(sectionId.replace('#', ''));
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = throttle(() => {
      const heroHeight = window.innerHeight;
      setVisible(window.scrollY > heroHeight - 100);
      const sections = NAV_ITEMS.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 150;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(NAV_ITEMS[i].id);
          break;
        }
      }
    }, 100); // Throttle to 100ms
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  const navVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };

  const menuItemVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
  };

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.nav 
            className="fixed top-0 left-0 w-full z-50 py-4 bg-dark-bg/90 backdrop-blur-lg border-b border-white/5"
            variants={navVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
              <Logo onClick={() => scrollToSection('#home')} />
              <div className="hidden md:flex items-center gap-8">
                {NAV_ITEMS.map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => scrollToSection('#' + item.id)}
                    className="relative font-grotesk text-xs tracking-[0.2em] uppercase transition-colors duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className={`${activeSection === item.id ? 'text-white' : 'text-gray-500 hover:text-white'}`}>
                      {item.label}
                    </span>
                    {activeSection === item.id && (
                      <motion.span 
                        className="absolute -bottom-1 left-0 right-0 h-px bg-gold"
                        layoutId="activeSection"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => scrollToSection('#contacts')}
                  className="ml-4 px-5 py-2 bg-gold text-dark-bg font-grotesk text-xs tracking-[0.15em] uppercase font-semibold transition-all duration-300 hover:bg-gold/90"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Contact
                </motion.button>
              </div>
              <motion.div
                onClick={handleNav}
                className="md:hidden cursor-pointer p-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <AiOutlineMenu size={20} className="text-white" />
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div 
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseMenu}
            />
            <motion.div
              ref={menuRef}
              className="fixed top-0 right-0 w-[80%] max-w-sm md:hidden h-screen z-50"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <div className="h-full bg-dark-bg border-l border-white/10 p-8">
                <div className="flex items-center justify-between mb-12">
                  <Logo onClick={() => scrollToSection('#home')} />
                  <motion.button 
                    onClick={handleCloseMenu} 
                    className="p-2"
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <AiOutlineClose size={20} className="text-white" />
                  </motion.button>
                </div>
                <motion.ul 
                  className="space-y-1"
                  variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
                  initial="hidden"
                  animate="visible"
                >
                  {NAV_ITEMS.map((item) => (
                    <motion.li
                      key={item.id}
                      variants={menuItemVariants}
                    onClick={() => scrollToSection('#' + item.id)}
                    className={`py-4 px-4 cursor-pointer transition-all duration-300 font-grotesk text-sm tracking-[0.2em] uppercase border-l-2 ${
                        activeSection === item.id 
                          ? 'border-gold text-white bg-white/5' 
                          : 'border-transparent text-gray-500 hover:text-white hover:border-gray-500'
                      }`}
                      whileHover={{ x: 10 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item.label}
                    </motion.li>
                  ))}
                </motion.ul>
                <motion.div
                  className="mt-8 px-4"
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.button
                    onClick={() => scrollToSection('#contacts')}
                    className="w-full py-4 bg-gold text-dark-bg font-grotesk text-sm tracking-[0.2em] uppercase font-semibold transition-all duration-300 hover:bg-gold/90"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Contact
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
