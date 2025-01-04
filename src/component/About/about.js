// AboutSection.js

import React from 'react';
import image from '../../Assets/Images/Peter.jpg'

const AboutSection = () => {
  return (
    <section id="about" className="py-16 bg-white flex items-center justify-center">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left">
        
        {/* Left Side: Image with white border and L-shaped corners */}
        <div className="relative mb-8 md:mb-0 md:mr-12 p-4 bg-white border-2 border-transparent w-64 h-64 flex items-center justify-center">
          
          {/* L-shaped borders */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-black"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-black"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-black"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-black"></div>

          {/* Image with padding for the white border effect */}
          <img 
            src={image} 
            alt="Your Description" 
            className="object-cover w-full h-full"
          />
        </div>
        
        {/* Right Side: Text and Button */}
        <div className="max-w-lg text-gray-700 flex flex-col items-center md:items-start">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="mb-6">
            I am a passionate software engineer with a focus on creating innovative solutions. My expertise lies in [mention your key skills or fields].
          </p>
          
          {/* Button */}
          <a 
            href="/about" 
            className="inline-block px-8 py-3 bg-white text-black border-2 border-black font-semibold transition duration-300 hover:bg-black hover:text-white hover:scale-105"
          >
            Learn More About Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
