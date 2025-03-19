import React, { useState, useRef, useEffect } from 'react';
import projects from './project';
import LineSVG from './lineSVG';
import ProjectBox from './projectBox';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';
import ProjectsList from './ProjectsList';
import typingEffect from '../../utils/typingEffect';
import './ProjectSection.css';

const ProjectsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const titleRefs = useRef([]);
  const boxRef = useRef(null);

  const { observe } = useIntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = entry.target.dataset.index;
        typingEffect(entry.target, projects[index].title);
      }
    });
  });

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
        />
      </div>
      <ProjectBox projects={projects} hoveredIndex={hoveredIndex} boxRef={boxRef} />
    </section>
  );
};

export default ProjectsSection;
