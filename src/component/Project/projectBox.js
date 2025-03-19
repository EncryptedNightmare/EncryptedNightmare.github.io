import React, { useEffect, useState } from 'react';
import './projectBox.css';

const ProjectBox = ({ projects, hoveredIndex, boxRef }) => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('Loading...');
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const fakeLoadingDuration = 3000;

    const timer = setTimeout(() => {
      setLoading(false);
      setText('Select a project...');
    }, fakeLoadingDuration);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hoveredIndex !== null) {
      setText(`Project selected: ${projects[hoveredIndex].title}`);
      setShowImage(false);
      const timer = setTimeout(() => {
        setShowImage(true);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (!loading) {
      setText('Select a project:');
      setShowImage(false);
    }
  }, [hoveredIndex, loading, projects]);

  useEffect(() => {
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
      typingText.style.animation = 'none';
      typingText.style.width = '0';
      void typingText.offsetHeight;
      typingText.style.width = `${typingText.textContent.length}ch`;
      typingText.style.animation = 'typing 1.5s steps(30, end) forwards, blink 1s step-end infinite 1.5s';
    }
  }, [text]);

  return (
    <div className="project-box-container">
      <div ref={boxRef} className="project-box">
        <div className="loading-container">
          {loading && (
            <>
              <div className="loading-box">
                <div className="loading-bar"></div>
              </div>
              <span className="loading-text">
                Loading<span className="dots"></span>
              </span>
            </>
          )}
          {!loading && <div className={`typing-text ${!loading ? 'blink' : ''}`}>{text}</div>}
        </div>
        {showImage && hoveredIndex !== null && (
          <img
            src={projects[hoveredIndex].image}
            alt={projects[hoveredIndex].title}
            className="project-image"
          />
        )}
      </div>
    </div>
  );
};

export default ProjectBox;
