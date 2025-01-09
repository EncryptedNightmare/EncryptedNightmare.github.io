import React, {useState} from 'react';
import DroneImage from './drone.png';

const ImageWithPOI = () => {
    const [tooltip, setTooltip] = useState("");
  
    return (
      <div className="relative w-full h-full bg-black flex justify-center items-center">
        <img
          img src={Image}
          alt="Drone View"
          className="w-3/4 h-auto object-cover"
        />
        <div
          className="absolute top-1/4 left-1/3 w-8 h-8 bg-blue-500 rounded-full cursor-pointer"
          aria-label="Target Point"
          onMouseEnter={() => setTooltip("Target Point")}
          onMouseLeave={() => setTooltip("")}
        />
        {tooltip && (
          <div className="absolute top-1/4 left-1/2 bg-white text-black px-4 py-2 rounded shadow-lg">
            {tooltip}
          </div>
        )}
      </div>
    );
  };

  export default ImageWithPOI;