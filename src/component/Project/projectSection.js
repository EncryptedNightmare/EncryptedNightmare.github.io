import React, { useState, useRef, useEffect } from 'react';
import projects from './project';
import LineSVG from './lineSVG';
import ProjectBox from './projectBox';
import './ProjectSection.css'; // Import the styles

const ProjectsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const titleRefs = useRef([]);
  const boxRef = useRef(null);
  const cursorRef = useRef(null);

  const handleMouseEnter = () => {
    document.body.classList.add('hovered');
    if (cursorRef.current) {
      cursorRef.current.style.display = 'block';
    }
  };

  const handleMouseLeave = () => {
    document.body.classList.remove('hovered');
    if (cursorRef.current) {
      cursorRef.current.style.display = 'none';
    }
  };

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (cursorRef.current) {
      cursorRef.current.style.left = `${cursorPosition.x}px`;
      cursorRef.current.style.top = `${cursorPosition.y}px`;
    }
  }, [cursorPosition]);

  return (
    <section id="projects">
      <LineSVG
        projects={projects}
        hoveredIndex={hoveredIndex}
        titleRefs={titleRefs}
        boxRef={boxRef}
      />

      {/* Left side: Project names with skills */}
      <div
        className="project-names"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => (titleRefs.current[index] = el)}
            className="project-title"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {hoveredIndex === index && (
              <div className="project-skills">
                {project.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="project-skill">
                    {skill}
                  </span>
                ))}
              </div>
            )}
            {project.title}
          </div>
        ))}
      </div>
      <div ref={cursorRef} className="custom-cursor"></div>
      <ProjectBox projects={projects} hoveredIndex={hoveredIndex} boxRef={boxRef} />
    </section>
  );
};

export default ProjectsSection;