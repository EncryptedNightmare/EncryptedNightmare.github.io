import React, { useState, useEffect, useRef } from 'react';
import projects from './project';

const ProjectsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const svgRef = useRef(null);
  const titleRefs = useRef([]);
  const boxRef = useRef(null);

  useEffect(() => {
    const updateLines = () => {
      if (svgRef.current && boxRef.current) {
        const svg = svgRef.current;
        const boxRect = boxRef.current.getBoundingClientRect();

        titleRefs.current.forEach((title, index) => {
          if (title) {
            const titleRect = title.getBoundingClientRect();
            const line = svg.querySelectorAll('line')[index];
            const startX = titleRect.left + titleRect.width / 2 + window.scrollX;
            const startY = titleRect.top + titleRect.height / 2 + window.scrollY;
            const endX = boxRect.left + boxRect.width / 2 + window.scrollX;
            const endY = boxRect.top + boxRect.height / 2 + window.scrollY;

            line.setAttribute('x1', startX);
            line.setAttribute('y1', startY);
            line.setAttribute('x2', endX);
            line.setAttribute('y2', endY);
          }
        });
      }
    };

    updateLines();
    window.addEventListener('resize', updateLines);
    window.addEventListener('scroll', updateLines);

    return () => {
      window.removeEventListener('resize', updateLines);
      window.removeEventListener('scroll', updateLines);
    };
  }, [hoveredIndex]);

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
      {/* SVG for the lines */}
      <svg
        ref={svgRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 10,
        }}
      >
        {projects.map((_, index) => (
          <line
            key={index}
            stroke="#888"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
            style={{
              transition: 'stroke 0.3s ease',
              stroke: hoveredIndex === index ? '#FFB200' : '#888',
            }}
          />
        ))}
      </svg>

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
              fontSize: '70px',
              fontWeight: 'Lighter',
              marginBottom: '40px',
              cursor: 'pointer',
              color: hoveredIndex === index ? '#888' : '#000',
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
                      backgroundColor: '#FFB200',
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
        }}
      >
        <div
          ref={boxRef}
          className="project-box"
          style={{
            width: '70%',
            height: '70%',
            backgroundColor: '#888',
            borderRadius: '10px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.3s ease',
          }}
        >
          {hoveredIndex !== null && (
            <img
              src={projects[hoveredIndex].image}
              alt={projects[hoveredIndex].title}
              style={{
                maxWidth: '100%',
                height: '100%',
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