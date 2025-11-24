import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/navbar/navbar';
import Hero from './component/hero/hero';
import Project from './component/Project/projectSection';
import About from './component/About/about';
import Contact from './component/Contact/contact';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Project />
              <Contact />
            </>
          } />
          <Route path="*" element={<div>Path: {window.location.pathname}</div>} />
        </Routes>
      </> 
    </Router>
  );
}


export default App;
