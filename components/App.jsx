import React from 'react';
import Navbar from './Navbar';
import About from './About';
import Projects from './Projects';
import Contacts from './Contacts';

const App = () => {
  return (
    <div className="font-golos bg-dark-bg">
      <Navbar />
      <About />
      <Projects />
      <Contacts />
    </div>
  );
};

export default App;
