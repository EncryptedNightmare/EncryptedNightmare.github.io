import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const ImageToTablet = () => {
    const [progress, setProgress] = useState(0);
  
    useEffect(() => {
      const handleScroll = () => {
        const offset = window.scrollY - document.body.offsetHeight * 0.75;
        setProgress(Math.max(0, Math.min(1, offset / 500)));
      };
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }, []);
  
    return (
      <div className="relative w-full h-full flex justify-center items-center">
        <animated.div
          style={{
            transform: `scale(${1 - progress * 0.5})`,
            opacity: 1 - progress,
          }}
          className="absolute w-3/4"
        >
          <img src="/path-to-image.jpg" alt="Drone View" />
        </animated.div>
        <animated.div
          style={{
            transform: `scale(${0.5 + progress * 0.5})`,
            opacity: progress,
          }}
          className="absolute w-1/2 bg-gray-800 rounded-lg shadow-lg"
        >
          <img src="/path-to-tablet-image.jpg" alt="Tablet" />
        </animated.div>
      </div>
    );
  };

export default ImageToTablet;