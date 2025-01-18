import React, { useState, useRef } from 'react';
import projects from './project';
import LineSVG from './lineSVG';

const ProjectsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const titleRefs = useRef([]);
  const boxRef = useRef(null);

  return (
    <section
      id="projects"
      style={{
        height: '100vh',
        display: 'flex',
        backgroundColor: '#fff',
        color: '#000',
        position: 'relative',
      }}
    >
      <LineSVG
        projects={projects}
        hoveredIndex={hoveredIndex}
        titleRefs={titleRefs}
        boxRef={boxRef}
      />

      {/* Left side: Project names with skills */}
      <div
        style={{
          width: '30%',
          padding: '40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {projects.map((project, index) => (
          <div
            key={index}
            ref={(el) => (titleRefs.current[index] = el)}
            className="project-title"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            style={{
              position: 'relative',
              fontSize: '40px',
              fontWeight: 'Lighter',
              marginBottom: '40px',
              cursor: 'pointer',
              color: hoveredIndex === index ? '#ccc' : '#000',
              transition: 'color 0.3s ease',
            }}
          >
            {hoveredIndex === index && (
              <div
                style={{
                  position: 'absolute',
                  top: '-20px',
                  left: '0',
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '8px',
                  marginBottom: '8px',
                }}
              >
                {project.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    style={{
                      padding: '4px 8px',
                      backgroundColor: '#FF0',
                      color: '#fff',
                      fontSize: '12px',
                      fontWeight: 'bold',
                    }}
                  >
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
      <div
        style={{
          width: '70%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden', // Ensure the image does not overflow the box
        }}
      >
        <div
          ref={boxRef}
          className="project-box"
          style={{
            width: '70%',
            height: '70%',
            backgroundColor: '#FFF',
            borderRadius: '10px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s ease',
            overflow: 'hidden', // Ensure the image does not overflow the box
          }}
        >
          {hoveredIndex !== null && (
            <img
              src={projects[hoveredIndex].image}
              alt={projects[hoveredIndex].title}
              style={{
                maxWidth: '100%',
                maxHeight: '100%',
                borderRadius: '10px',
                transition: 'transform 0.5s ease',
                transform: hoveredIndex !== null ? 'scale(1.05)' : 'scale(1)',
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;