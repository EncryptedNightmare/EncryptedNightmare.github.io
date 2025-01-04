import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/navbar/navbar';
import Hero from './component/hero/hero';
import Project from './component/Project/projectSection';
import About from './component/About/about';
import Contact from './component/Contact/contact';
import Skill from './component/skills/skillsSection';
import ProjectOne from './component/Project/ProjectOne/ProjectOne';

function App() {
  return (
    <Router>
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Project />
              <Skill />
              <About />
            </>
          } />
          <Route path="/project-one" element={<ProjectOne />} />
          <Route path="*" element={<div>Path: {window.location.pathname}</div>} />
        </Routes>
        <Contact />
      </>
    </Router>
  );
}


export default App;
