import React, { useRef, useEffect, useState } from 'react';
import { useSpring, animated, config } from 'react-spring';
import HomePageVideo from './HomePageVideo.mp4';
import CopyDiv from '../../hooks/useCopyDiv';

const ContactSection = () => {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        setOffset(sectionCenter - viewportCenter);
      }
    };

    handleScroll(); // initial position
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const videoParallax = useSpring({
    transform: `translateY(${offset * 0.05}px) scale(${1 + offset * 0.0005})`,
    config: config.slow,
  });

  const textParallax = useSpring({
    transform: `translateY(${offset * 0.15}px)`,
    config: config.slow,
  });

  return (
    <section
      id="contact"
      ref={ref}
      className="flex justify-center items-center min-h-screen bg-white text-black relative overflow-hidden"
    >
      {/* Video */}
      <animated.div style={videoParallax} className="flex-1 flex justify-center">
        <video
          src={HomePageVideo}
          autoPlay
          muted
          loop
          className="rounded-2xl w-[300px] shadow-xl"
        />
      </animated.div>

      {/* Text box */}
      <animated.div style={textParallax} className="flex-1 flex justify-center">
        <div className="relative p-8 h-[400px] text-gray-800 text-lg">
          {/* Frame corners */}
          <span className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-black"></span>
          <span className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-black"></span>
          <span className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-black"></span>
          <span className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-black"></span>

          <div className="flex items-center text-center justify-center gap-4 mb-6"></div>

          <CopyDiv />

          <div className="flex justify-center text-center mt-8">
            <a
              href="https://www.linkedin.com/in/peter-schultz-johansen/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-16 h-16 flex items-center text-center justify-center rounded-full hover:scale-110 transition border-0 text-2xl font-bold"
              style={{ backgroundColor: '#FFB200', color: 'white' }}
            >
              in
            </a>
          </div>
        </div>
      </animated.div>
    </section>
  );
};

export default ContactSection;
