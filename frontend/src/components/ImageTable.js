//frontend/src/components/ImageTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

function ImageTable() {
  const [images, setImages] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [computedResponse, setComputedResponse] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await axios.get('https://neurofish-187-285ac.web.app/api/images');
        setImages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    }

    fetchImages();
  }, []);

  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`https://neurofish.onrender.com/images/${fileName}`);
      setImages(images.filter(image => image.fileName !== fileName));
      alert('File deleted successfully');
    } catch (error) {
      console.error('Error deleting file:', error);
      alert('Error deleting file');
    }
  };

  const handleCompute = async (fileName) => {
    try {
      // Assuming you have an endpoint for computing with the image file name
      const computedResponse = await axios.get(`https://neurofish.onrender.com/compute/${fileName}`);
      setComputedResponse(computedResponse.data);
      console.log('At Image Table',computedResponse.data);
      // Pass additional data along with navigation using state
      navigate('/fish-detail', { state: { computedResponse: computedResponse.data } }); 
    } catch (error) {
      console.error('Error computing:', error);
      alert('Error computing');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>Uploaded Images</h1>
      <div className="row row-cols-1 row-cols-md-5 g-4">
        {images.map((image, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow-sm">
              <img
                src={image.imageUrl}
                className="card-img-top img-fluid"
                alt={image.fileName}
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className="card-body">
                <h5 className="card-title">{image.fileName}</h5>
                <p className="card-text">Upload Date: {image.uploadDateTime}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-primary btn-sm" onClick={() => handleCompute(image.fileName)}>Compute</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(image.fileName)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageTable;
