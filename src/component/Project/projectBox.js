import React, { useEffect, useState } from 'react';
import './projectBox.css'; // Import the styles

const ProjectBox = ({ projects, hoveredIndex, boxRef }) => {
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState('Loading...');
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    const fakeLoadingDuration = 3000; // Duration of the fake loading animation in milliseconds

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
      }, 2000); // Show image after 2 seconds

      return () => clearTimeout(timer);
    } else if (!loading) {
      setText('Select a project...');
      setShowImage(false);
    }
  }, [hoveredIndex, loading]);

  return (
    <div className="project-box-container">
      <div ref={boxRef} className="project-box">
        <div className="loading-container">
          {loading && (
            <>
              <div className="loading-bar"></div>
              <div className="typing-text">
                Loading<span className="dots"></span>
              </div>
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