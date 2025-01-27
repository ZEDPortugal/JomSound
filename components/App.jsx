import React, { useState } from 'react';
import Navbar from './Navbar';

import About from './About';
import Projects from './Projects';
import ChatBot from './ChatBot';
import Contacts from './Contacts';


const App = () => {
  const [isLight, setIsLight] = useState(false);

  const handleToggle = () => {
    setIsLight(!isLight);
  };

  return (
    <div className="font-consolas">
      <Navbar isLight={isLight} handleToggle={handleToggle} />
      <About isLight={isLight} />
      <Projects isLight={isLight} />
      <ChatBot isLight={isLight} />
      <Contacts isLight={isLight}/>
    </div>
  );
};

export default App;