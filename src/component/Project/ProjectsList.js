import React from 'react';
import ProjectTitle from './ProjectTitle';

const ProjectsList = ({ projects, hoveredIndex, setHoveredIndex, observe, titleRefs, visibleTitles }) => {
  return (
    <div className="projects-list">
      {projects.map((project, index) => (
        <ProjectTitle
          key={index}
          project={project}
          index={index}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          observe={observe}
          titleRef={el => titleRefs.current[index] = el}
          isVisible={visibleTitles.includes(index)}
        />
      ))}
    </div>
  );
};

export default ProjectsList;