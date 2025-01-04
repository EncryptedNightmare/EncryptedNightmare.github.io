import React, { useRef, useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import Typewriter from 'react-typewriter-effect';

const ProjectCard = ({ project, index }) => {
    const ref = useRef();
    const [isInView, setIsInView] = useState(false);

    // Define spring values for position and opacity
    const [{ x, opacity, borderOpacity }, set] = useSpring(() => ({
        x: index % 2 === 0 ? -80 : 80,
        opacity: 0,
        borderOpacity: 0,
        config: { tension: 120, friction: 25 },
    }));

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                if (entry.isIntersecting) {
                    // When in view, set x and opacity to center and full opacity
                    set({ x: 0, opacity: 1, borderOpacity: 1 });
                } else {
                    // When out of view, reset x and opacity
                    set({ x: index % 2 === 0 ? -80 : 80, opacity: 0, borderOpacity: 0 });
                }
            },
            { threshold: 0.5 } // Adjust threshold to trigger when the component is 50% in view
        );

        const current = ref.current;
        if (current) observer.observe(current);
        return () => {
            if (current) observer.unobserve(current);
        };
    }, [index, set]);

    return (
        <div ref={ref} className={`flex items-center justify-center ${index < 2 ? 'mb-60' : 'mb-40'} relative`}>
            {index % 2 === 0 ? (
                <>
                    {/* L-shaped borders with fade-in effect */}
                    <animated.div
                        className="absolute bottom-0 right-0 border-b-4 border-r-4 border-gray-900"
                        style={{ width: '30px', height: '30px', margin: '3px', opacity: borderOpacity }}
                    />
                    <animated.div
                        className="absolute top-0 left-0 border-t-4 border-l-4 border-gray-900"
                        style={{ width: '30px', height: '30px', margin: '3px', opacity: borderOpacity }}
                    />
                    <animated.div
                        className="absolute top-0 right-0 border-t-4 border-r-4 border-gray-900"
                        style={{ width: '30px', height: '30px', margin: '3px', opacity: borderOpacity }}
                    />
                    <animated.div
                        className="absolute bottom-0 left-0 border-b-4 border-l-4 border-gray-900"
                        style={{ width: '30px', height: '30px', margin: '3px', opacity: borderOpacity }}
                    />

                    <animated.div
                        style={{ transform: x.to((x) => `translateX(${x}%)`), opacity }}
                        className="flex-1 p-4 project-card"
                    >
                        <a
                            href={project.link}
                            className="relative block w-full overflow-hidden transition-transform duration-300 hover:scale-105"
                        >
                            <div className="aspect-w-16 aspect-h-9 relative z-10">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="object-cover w-full h-full transition-transform duration-700"
                                />
                                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                                    Learn More
                                </span>
                            </div>
                        </a>
                    </animated.div>

                    <div className="flex-1 p-4 text-left">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="text-gray-700">
                            <Typewriter text={project.description} cursorColor="black" typeSpeed={20} startDelay={600} />
                        </p>
                    </div>
                </>
            ) : (
                <>
                    <div className="flex-1 p-4 text-left">
                        <h3 className="text-xl font-semibold">{project.title}</h3>
                        <p className="text-gray-700">
                            <Typewriter text={project.description} cursorColor="black" typeSpeed={20} startDelay={600} />
                        </p>
                    </div>
                    
                    <animated.div
                        style={{ transform: x.to((x) => `translateX(${x}%)`), opacity }}
                        className="flex-1 p-4 project-card"
                    >
                        <a
                            href={project.link}
                            className="relative block w-full overflow-hidden transition-transform duration-300 hover:scale-105"
                        >
                            <div className="aspect-w-16 aspect-h-9 relative z-10">
                                <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="object-cover w-full h-full transition-transform duration-700"
                                />
                                <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 transition-opacity duration-300 hover:opacity-100">
                                    Learn More
                                </span>
                            </div>
                        </a>
                    </animated.div>

                    {/* L-shaped borders with fade-in effect */}
                    <animated.div
                        className="absolute bottom-0 right-0 border-b-4 border-r-4 border-gray-900"
                        style={{ width: '30px', height: '30px', margin: '3px', opacity: borderOpacity }}
                    />
                    <animated.div
                        className="absolute top-0 left-0 border-t-4 border-l-4 border-gray-900"
                        style={{ width: '30px', height: '30px', margin: '3px', opacity: borderOpacity }}
                    />
                    <animated.div
                        className="absolute top-0 right-0 border-t-4 border-r-4 border-gray-900"
                        style={{ width: '30px', height: '30px', margin: '3px', opacity: borderOpacity }}
                    />
                    <animated.div
                        className="absolute bottom-0 left-0 border-b-4 border-l-4 border-gray-900"
                        style={{ width: '30px', height: '30px', margin: '3px', opacity: borderOpacity }}
                    />
                </>
            )}
        </div>
    );
};

export default ProjectCard;
