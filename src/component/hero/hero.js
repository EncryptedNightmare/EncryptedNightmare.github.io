import React from 'react';
import PeterImage from '../../Assets/Images/Peter.jpg'

const HeroSection = () => {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center justify-center bg-gray-50 overflow-hidden">
      {/* Left Side - Text Section */}
      <div className="text-center md:text-left max-w-lg px-4 md:px-0">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Hi, I'm Peter: A software developer and electronics engineer from Denmark.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-6">
          I make innovative software solutions come to life.
        </p>
      </div>

      {/* Right Side - Image Section */}
      <div className="mt-8 md:mt-0 md:ml-12">
        <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shadow-lg">
          <img
            src={PeterImage} // Use the uploaded image path here
            alt="Peter's Portrait"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;