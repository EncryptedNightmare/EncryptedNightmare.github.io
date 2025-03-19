import React from 'react';
import ProjectTitle from './ProjectTitle';

const ProjectsList = ({ projects, hoveredIndex, setHoveredIndex, observe, titleRefs }) => {
  return (
    <div className="projects-list">
      {projects.map((project, index) => (
        <ProjectTitle
          key={project.id || index}
          project={project}
          index={index}
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
          observe={observe}
          titleRef={el => titleRefs.current[index] = el}
        />
      ))}
    </div>
  );
};

export default ProjectsList;