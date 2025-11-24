import React, { useState, useRef, useEffect } from 'react';
import projects from './project';
import LineSVG from './lineSVG';
import ProjectBox from './projectBox';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import ProjectsList from './ProjectsList';
import './ProjectSection.css';

const ProjectsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [visibleTitles, setVisibleTitles] = useState([]);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const titleRefs = useRef([]);
  const boxRef = useRef(null);

  const { observe } = useIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = parseInt(entry.target.dataset.index, 10);
        setVisibleTitles((prev) => [...new Set([...prev, index])]);
      }
    });
  });

  // Track cursor movement
  const handleMouseMove = (e) => {
    setCursorPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="projects">
      <LineSVG
        projects={projects}
        hoveredIndex={hoveredIndex}
        titleRefs={titleRefs}
        boxRef={boxRef}
      />

      <div className="project-names">
        <ProjectsList
          projects={projects}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          observe={observe}
          titleRefs={titleRefs}
          visibleTitles={visibleTitles}
          setActive={setActive} // you can trigger active on hover here if needed
        />
      </div>

      <ProjectBox
        projects={projects}
        hoveredIndex={hoveredIndex}
        boxRef={boxRef}
      />

      {active && (
        <div
          className="lightning-wrapper active"
          style={{ left: cursorPos.x, top: cursorPos.y }}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
