import React from 'react';
import projects from './project';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  return (
    <section id="projects" className="flex justify-center items-center py-16 bg-gray-80">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-left mb-8">Projects</h2>
        <div className="space-y-10">
          {projects.map((project, index) => (
            <div key={index} className="mb-60">
              <ProjectCard project={project} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

