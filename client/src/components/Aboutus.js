import React from 'react';
import './Aboutus.css';
import necklaceImage from './img/aimg.jpg'; // Adjusted to your image path

const Aboutus = () => {
  return (
    <div className="about-us-container">
      <h1 className="about-us-heading">About Us</h1>
      <div className="about-us-content">
        <div className="about-us-image">
          <img src={necklaceImage} alt="Jewelry" className="jewelry-image" />
        </div>
        <div className="about-us-text">
          <p>
            Featuring an impressive array of exquisite, one-of-a-kind pieces, Gold City Jewels proudly specializes in 24k Gold and Diamond jewelry.
          </p>
          <p>
            We have been a tradition of trusted and crafted excellence for generations and guarantee the finest pieces with some of the most unique gemstones in the world.
          </p>
          <p>
            Coming from the lush heritage of excellence in the fine jewelry industry, we are dedicated to preserving the blend of craftsmanship and technology.
          </p>
          <p>
            Our fine jewelry is built with great attention to detail, offering you an experience like no other. We have created the perfect balance between timeless traditions and contemporary style.
          </p>
          <p>
            Visit our showroom to explore a world of breathtaking jewelry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Aboutus;
