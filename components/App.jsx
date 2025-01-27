import React, { useState } from 'react';
import Navbar from './Navbar';

import About from './About';
import Projects from './Projects';
import ChatBot from './ChatBot';

const App = () => {
  const [isLight, setIsLight] = useState(false);

  const handleToggle = () => {
    setIsLight(!isLight);
  };

  return (
    <div>
      <Navbar isLight={isLight} handleToggle={handleToggle} />
      <About isLight={isLight} />
      <Projects isLight={isLight} />
      <ChatBot isLight={isLight} />
    </div>
  );
};

export default App;