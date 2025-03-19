import React, { useRef, useEffect, useState } from 'react';
import typingEffect from '../../utils/typingEffect';

const ProjectTitle = ({ project, index, hoveredIndex, setHoveredIndex, observe, titleRef }) => {
  const localTitleRef = useRef(null);
  const [effectApplied, setEffectApplied] = useState(false);

  useEffect(() => {
    if (localTitleRef.current) {
      observe(localTitleRef.current);
      if (titleRef) {
        titleRef(localTitleRef.current);
      }
    }
  }, [observe, titleRef]);

  useEffect(() => {
    if (localTitleRef.current) {
      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !effectApplied) {
            typingEffect(entry.target, project.title);
            setEffectApplied(true);
          } else if (!entry.isIntersecting && effectApplied) {
            setEffectApplied(false);
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, { threshold: 0.1 });
      observer.observe(localTitleRef.current);

      return () => {
        observer.disconnect();
      };
    }
  }, [effectApplied, project.title]);

  return (
    <div
      ref={localTitleRef}
      className="project-title"
      data-index={index}
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
  );
};

export default ProjectTitle;
