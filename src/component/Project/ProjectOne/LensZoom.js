import React from 'react';
import { useSpring, animated } from 'react-spring';

const LensZoom = ({ scrollY }) => {
    const zoomStyle = useSpring({
      transform: `scale(${1 + scrollY / 800}) translateY(${scrollY / 5}px)`,
    });
  
    return (
      <animated.div style={zoomStyle} className="w-full h-full flex justify-center items-center">
        <div className="relative w-64 h-64 bg-black rounded-full">
          <p className="text-white text-center">Zooming into the Lens...</p>
        </div>
      </animated.div>
    );
  };

  export default LensZoom;