import React, { useRef, useEffect, useState } from 'react';
import typingEffect from '../../utils/typingEffect';

const ProjectTitle = ({ project, index, hoveredIndex, setHoveredIndex, observe, titleRef, isVisible }) => {
  const localTitleRef = useRef(null);
  const [displayText, setDisplayText] = useState(project.title);

  useEffect(() => {
    if (localTitleRef.current) {
      observe(localTitleRef.current);
      if (titleRef) {
        titleRef(localTitleRef.current);
      }
    }
  }, [observe, titleRef]);

  useEffect(() => {
    if (isVisible) {
      typingEffect(project.title, setDisplayText); // refactored typingEffect to set state instead of DOM
    }
  }, [isVisible, project.title]);

  return (
    <div
      ref={localTitleRef}
      className="project-title"
      data-index={index}
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {hoveredIndex === index && Array.isArray(project.skills) && (
        <div className="project-skills">
          {project.skills.map((skill, skillIndex) => (
            <span key={skillIndex} className="project-skill">
              {skill}
            </span>
          ))}
        </div>
      )}
      {displayText}
    </div>
  );
};

export default ProjectTitle;
