import React, { useState, useRef } from 'react';
import projects from './project';
import LineSVG from './lineSVG';
import ProjectBox from './projectBox';
import './ProjectSection.css'; // Import the styles

const ProjectsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const titleRefs = useRef([]);
  const boxRef = useRef(null);

  return (
    <section id="projects">
      <LineSVG
        projects={projects}
        hoveredIndex={hoveredIndex}
        titleRefs={titleRefs}
        boxRef={boxRef}
      />

      {/* Left side: Project names with skills */}
      <div className="project-names">
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

      {/* Right side: ONE big placeholder box */}
      <ProjectBox projects={projects} hoveredIndex={hoveredIndex} boxRef={boxRef} />
    </section>
  );
};

export default ProjectsSection;