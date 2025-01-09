import React, { useState, useEffect } from "react";
import LensZoom from "./LensZoom";
import ImageToTablet from "./Tablet";
import ImageWithPOI from "./ImagePoi";
import DroneSection from "./DronePoi";

const ProjectIntro = () => {
  const [tooltip, setTooltip] = useState("");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full h-[400vh] bg-gray-900">
      <section className="h-screen">
        <DroneSection setTooltip={setTooltip} />
      </section>
      <section className="h-screen">
        <LensZoom scrollY={scrollY} />
      </section>
      <section className="h-screen">
        <ImageWithPOI />
      </section>
      <section className="h-screen">
        <ImageToTablet />
      </section>
    </div>
  );
};

export default ProjectIntro;