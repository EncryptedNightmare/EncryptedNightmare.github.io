import { useEffect, useRef } from 'react';

const useIntersectionObserver = (callback, options = { threshold: 0.5, rootMargin: "0px" }) => {
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback([entry], observer);
        }
      });
    }, options);

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [callback, options]);

  const observe = (element) => {
    if (observer.current && element) {
      observer.current.observe(element);
    }
  };

  const unobserve = (element) => {
    if (observer.current && element) {
      observer.current.unobserve(element);
    }
  };

  return { observe, unobserve };
};

export default useIntersectionObserver;