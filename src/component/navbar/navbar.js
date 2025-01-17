import React from 'react';

const Navbar = () => {
  const handleSmoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute("href");
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className="bg-white fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/">Peter Schultz-Johansen</a>
        </div>
        <div className="space-x-4">
          <a href="#projects" onClick={handleSmoothScroll} className="hover:text-black hover:font-bold hover:text-lg transition duration-300">Projects</a>
          <a href="#skills" onClick={handleSmoothScroll} className="hover:text-black hover:font-bold hover:text-lg transition duration-300">Skills</a>
          <a href="#about" onClick={handleSmoothScroll} className="hover:text-black hover:font-bold hover:text-lg transition duration-300">About</a>
          <a href="#contact" onClick={handleSmoothScroll} className="hover:text-black hover:font-bold hover:text-lg transition duration-300">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

