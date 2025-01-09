import React, { useState} from 'react';
import DroneImage from './drone.png';


const DroneSection = () => {
    const [tooltip, setTooltip] = useState(""); // Define tooltip with useState
  
    return (
      <div className="relative w-full h-full flex justify-center items-center">
        <div className="relative">
          <svg className="w-3/4 h-auto">
            {<img src={DroneImage} alt="Drone" className="w-3/4 h-auto" />}
          </svg>
          <div
            className="absolute top-20 left-40 w-8 h-8 bg-red-500 rounded-full cursor-pointer"
            onMouseEnter={() => setTooltip("Gimbal Stabilization")}
            onMouseLeave={() => setTooltip("")}
          />
          {tooltip && (
            <div className="absolute top-10 left-52 bg-white text-black px-4 py-2 rounded shadow-lg">
              {tooltip}
            </div>
          )}                    
        </div>
      </div>
    );
  };

  export default DroneSection;
  