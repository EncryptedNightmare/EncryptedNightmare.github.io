// AboutSection.js
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import image from "./060.jpg";
import aboutTxt from "./aboutTxt.js";

const AboutSection = () => {
  const ref = useRef(null);

  // tie scroll progress to this section only
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"], 
  });

  // map scroll progress (0 → 1) into pixel transforms
  const yImage = useTransform(scrollYProgress, [0, 1], [-50, 50]); // image drifts
  const yText = useTransform(scrollYProgress, [0, 1], [50, -50]);  // text opposite drift
  const opacity = useTransform(scrollYProgress, [0.1, 0.5, 0.9], [0, 1, 0]); // fade effect

  return (
    <section
      id="about"
      ref={ref}
      className="h-screen bg-white flex items-center justify-center relative overflow-hidden"
    >
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center text-center md:text-left">
        
        {/* Left Side: Image */}
        <motion.div
          style={{ y: yImage, opacity }}
          className="relative mb-8 md:mb-0 md:mr-12 p-4 bg-white border-2 border-transparent w-96 h-96 flex items-center justify-center"
        >
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-black"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-black"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-black"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-black"></div>
          <img
            src={image}
            alt="Your Description"
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Right Side: Text */}
        <motion.div
          style={{ y: yText, opacity }}
          className="max-w-lg text-gray-700 flex flex-col items-center md:items-start"
        >
          <h2 className="text-3xl font-bold mb-4">Peter Schultz-Johansen</h2>
          <p className="mb-6 whitespace-pre-line">{aboutTxt}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
