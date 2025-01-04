import React from 'react';

const skillsData = [
  { title: 'JavaScript', level: 90 },
  { title: 'React', level: 85 },
  { title: 'CSS', level: 80 },
  { title: 'Node.js', level: 75 },
  { title: 'Tailwind CSS', level: 70 },
  { title: 'Python', level: 60 },
  { title: 'Django', level: 55 },
  { title: 'Git', level: 80 },
  {title: 'test', level: 30},
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-4">My Skills</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {skillsData.map((skill) => (
          <div key={skill.title} className="p-4 bg-white">
            <div className="flex justify-between mb-1">
              <span className="font-medium">{skill.title}</span>
              <span className="font-medium">{skill.level}%</span>
            </div>
            <div className="bg-gray-300  h-2">
              <div
                className="bg-gray-700 h-2"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
