//frontend/src/components/Home.js

import React from 'react';

function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-10 offset-lg-1">
          <h1 className="mt-5 mb-3 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>Fish Detection and Species Recognition</h1>
          <p className="lead text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Welcome to our platform for fish detection and species recognition. We utilize advanced machine learning algorithms to analyze underwater images and identify various fish species accurately.
          </p>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-8 offset-lg-2 text-center">
          <div className="ratio ratio-16x9">
            <iframe className="embed-responsive-item" src="https://www.youtube.com/embed/6QSUTjsHU6s?si=E4Kv_Hyp4ngZyuAQ&controls=0&autoplay=1&&showinfo=0" title="Fish 4K Title Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
          </div>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-10 offset-lg-1">
          <h2 className="text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>How It Works</h2>
          <p style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Our platform employs state-of-the-art object detection models trained on large datasets of underwater images. These models are capable of accurately detecting fish in various environmental conditions.
          </p>
          <p style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Additionally, we utilize deep learning techniques for species recognition. By analyzing the unique features and patterns of each fish species, our system can identify them with high precision.
          </p>
          <p style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Our platform also offers real-time fish detection and species recognition capabilities, allowing users to analyze live video streams or uploaded images instantly.
          </p>
          <p style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Furthermore, we provide detailed insights and statistics on fish populations, distribution patterns, and behavior, aiding researchers and environmentalists in conservation efforts.
          </p>
        </div>
      </div>
      {/* Add more rows and columns for additional content */}
    </div>
  );
}

export default Home;
