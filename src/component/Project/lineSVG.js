import React, { useRef, useEffect, useCallback } from 'react';
import './styles.css'; // Import the styles

const LineSVG = ({ projects, hoveredIndex, titleRefs, boxRef }) => {
  const svgRef = useRef(null);
  const circleRadius = 5; // Radius of the circles
  const hoverStateRef = useRef(null); // Reference to track the current hover state

  const updateLines = useCallback(() => {
    if (svgRef.current && boxRef.current) {
      const svg = svgRef.current;
      const boxRect = boxRef.current.getBoundingClientRect();

      titleRefs.current.forEach((title, index) => {
        if (title) {
          const titleRect = title.getBoundingClientRect();
          const greyPath = svg.querySelectorAll('path.grey')[index];
          const orangePath = svg.querySelectorAll('path.orange')[index];
          const startX = titleRect.right + 10 + circleRadius - svg.getBoundingClientRect().left; // Start from the right side of the title with a margin
          const startY = titleRect.top + titleRect.height / 2 - svg.getBoundingClientRect().top;
          const endX = boxRect.left - 10 - circleRadius - svg.getBoundingClientRect().left; // End at the left side of the box with a margin
          const endY = boxRect.top + (index * 20) + 20 - svg.getBoundingClientRect().top; // Adjusted to hit the box with 10px margin between each pin

          // Create a path with a straight forward movement, a 45-degree turn, move vertically, another 45-degree turn, and then straight towards the box
          const midX1 = startX + 20 + (index * 10); // Move straight forward for 20px + 10px for each subsequent line
          const midY1 = startY;
          const midX2 = midX1 + (endX > midX1 ? 10 : -10); // 45-degree turn for 10px
          const midY2 = midY1 + (endY > midY1 ? 10 : -10);
          const midX3 = midX2; // Move straight vertically
          const midY3 = endY - (endY > midY2 ? 10 : -10); // Move vertically until 10px before the end
          const midX4 = midX3 + (endX > midX3 ? 10 : -10); // 45-degree turn for the last 10px in height
          const midY4 = endY;

          const d = `M ${startX} ${startY} L ${midX1} ${midY1} L ${midX2} ${midY2} L ${midX3} ${midY3} L ${midX4} ${midY4} L ${endX} ${endY}`;

          greyPath.setAttribute('d', d);
          orangePath.setAttribute('d', d);

          // Update the start and end circles
          const startCircle = svg.querySelectorAll('circle.start')[index];
          const endCircle = svg.querySelectorAll('circle.end')[index];
          startCircle.setAttribute('cx', startX - circleRadius);
          startCircle.setAttribute('cy', startY);
          endCircle.setAttribute('cx', endX + circleRadius);
          endCircle.setAttribute('cy', endY);

          // Update the styles dynamically based on hoveredIndex
          const isHovered = hoveredIndex === index;
          orangePath.classList.toggle('orange-active', isHovered);
          startCircle.classList.toggle('circle-active', isHovered);

          // Add drawing effect
          if (isHovered) {
            hoverStateRef.current = index; // Track the current hover state
            orangePath.style.strokeDasharray = orangePath.getTotalLength();
            orangePath.style.strokeDashoffset = orangePath.getTotalLength();
            orangePath.style.animation = 'draw 1s forwards';
            setTimeout(() => {
              if (hoverStateRef.current === index) { // Check if the hover state is still active
                endCircle.classList.add('circle-active');
              }
            }, 1000); // Delay the coloring of the end circle
          } else {
            orangePath.style.strokeDasharray = 'none';
            orangePath.style.strokeDashoffset = 'none';
            orangePath.style.animation = 'none';
            endCircle.classList.remove('circle-active');
          }
        }
      });
    }
  }, [titleRefs, boxRef, hoveredIndex]);

  useEffect(() => {
    updateLines();
    window.addEventListener('resize', updateLines);
    window.addEventListener('scroll', updateLines);

    return () => {
      window.removeEventListener('resize', updateLines);
      window.removeEventListener('scroll', updateLines);
    };
  }, [updateLines]);

  useEffect(() => {
    updateLines();
  }, [hoveredIndex, updateLines]);

  return (
    <svg
      ref={svgRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
      }}
    >
      {projects.map((_, index) => (
        <g key={index}>
          <circle className="start circle" r="5" strokeWidth="2" fill="none" />
          <path
            className="grey"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <path
            className="orange"
            strokeWidth="2"
            fill="none"
            vectorEffect="non-scaling-stroke"
          />
          <circle className="end circle" r="5" strokeWidth="2" fill="none" />
        </g>
      ))}
    </svg>
  );
};

export default LineSVG;