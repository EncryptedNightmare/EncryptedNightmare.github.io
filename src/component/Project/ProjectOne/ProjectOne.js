import React from 'react';
import ProjectIntro from './component/Project/ProjectOne/ProjectIntro';

const ProjectOne = () => {
  return (
    <section id="projectone" className="flex justify-center items-center py-16 bg-gray-80">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-left mb-8">Project 1</h2>
        <div className="space-y-10">
        <ProjectIntro />
        </div>
      </div>
    </section>
  );
};

export default ProjectOne;