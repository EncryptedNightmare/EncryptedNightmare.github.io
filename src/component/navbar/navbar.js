import React, { useState, useEffect, useRef } from "react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [active, setActive] = useState("projects");
  const freezeRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (freezeRef.current) return; // ignore updates while frozen
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: null, threshold: 0.5 }
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    freezeRef.current = true; // freeze reordering

    const rect = el.getBoundingClientRect();
    const scrollTop = window.scrollY;
    const elementCenter = rect.top + scrollTop + rect.height / 2;
    const viewportCenter = window.innerHeight / 2;

    window.scrollTo({
      top: elementCenter - viewportCenter,
      behavior: "smooth",
    });

    // after scroll ends, unfreeze and set active manually
    setTimeout(() => {
      setActive(id);
      freezeRef.current = false;
    }, 600); // match smooth scroll duration
  };

  const getOrder = () => {
    const idx = sections.findIndex((s) => s.id === active);
    if (idx === -1) return sections;
    return [
      sections[(idx - 1 + sections.length) % sections.length],
      sections[idx],
      sections[(idx + 1) % sections.length],
    ];
  };

  const ordered = getOrder();

  return (
    <nav className="fixed top-0 right-0 h-full w-28 flex flex-col justify-center items-center z-50 space-y-6">
      {ordered.map((s, i) => (
        <React.Fragment key={s.id}>
          <a
            href={`#${s.id}`}
            onClick={(e) => handleSmoothScroll(e, s.id)}
            className={`transition duration-300 text-center ${
              s.id === active ? "font-bold text-lg text-black" : "text-gray-500 hover:text-black"
            }`}
          >
            {s.label}
          </a>
          {i < ordered.length - 1 && <div className="w-8 border-t border-gray-300" />}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Navbar;
