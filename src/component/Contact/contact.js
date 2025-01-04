// ContactSection.js

import React from 'react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-16 bg-gray-100">
      <h2 className="text-3xl font-bold text-center mb-4">Get in Touch</h2>
      <p className="max-w-md mx-auto text-center text-gray-600">
        I'm always open to discussing new projects or opportunities. Feel free to reach out!
      </p>
      <div className="text-center mt-6">
        <a href="/contact" className="inline-block px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-300">
          Contact Me
        </a>
      </div>
    </section>
  );
};

export default ContactSection;
