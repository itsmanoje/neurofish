//frontend/src/components/About.js

import React from 'react';

const About = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8 offset-lg-2">
          <h2 className="text-center mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>About Fish Detection and Species Recognition</h2>
          <p style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Fish detection and species recognition is an important field of study in computer vision and machine learning. It involves the development of algorithms and models to automatically detect and classify fish species from images or videos.
          </p>
          <p style={{ fontFamily: 'Open Sans, sans-serif' }}>
            The application of fish detection and species recognition has various practical applications, including:
          </p>
          <ul>
            <li style={{ fontFamily: 'Open Sans, sans-serif' }}>Monitoring and management of fish populations in natural habitats</li>
            <li style={{ fontFamily: 'Open Sans, sans-serif' }}>Assessment of fish stocks for sustainable fisheries management</li>
            <li style={{ fontFamily: 'Open Sans, sans-serif' }}>Surveillance of marine environments for ecological conservation</li>
            <li style={{ fontFamily: 'Open Sans, sans-serif' }}>Identification of invasive species and their impact on ecosystems</li>
          </ul>
          <p style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Fish recognition systems typically utilize techniques such as deep learning, image processing, and computer vision to analyze visual features of fish images and classify them into different species categories. These systems can be trained on large datasets of annotated fish images to learn patterns and characteristics unique to each species.
          </p>
          <p style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Challenges in fish detection and species recognition include variations in fish appearance due to factors like illumination, occlusion, and background clutter, as well as the diversity of fish species with subtle differences in morphology and coloration.
          </p>
          <p style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Overall, fish detection and species recognition technologies hold great potential for enhancing our understanding of aquatic ecosystems and supporting conservation efforts for marine biodiversity.
          </p>
          <div className="text-center mt-5">
            <img src="https://unsplash.com/photos/sotrQtj-fF0/download?force=true&w=800" alt="Fish Detection" className="img-fluid rounded" />
          </div>
          <p className="text-center mt-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Aquatic Environment
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
