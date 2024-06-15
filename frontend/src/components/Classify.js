//frontend/src/components/Classify.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Classify = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    if (!selectedFile.type.match('image/jpeg') && !selectedFile.type.match('image/png')) {
      alert('Please select a JPEG, JPG, or PNG image file');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('https://neurofish.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert(response.data);
      navigate('/table');
    } catch (error) {
      console.error('Error uploading file: ', error);
      alert('Error uploading file');
    }
  };

  const details = [
    'Anthias anthias',
    'Atherinomorus lacunosus',
    'Belone belone',
    'Black Sea Sprat',
    'Boops boops',
    'Chlorophthalmus agassizi',
    'Coris julis',
    'Gilt-head bream',
    'Gobius niger',
    'Hourse Mackerel',
    'Red Mullet',
    'Red Sea Bream',
    'Rhinobatos cemiculus',
    'Sea Bass',
    'Shrimp',
    'Solea solea',
    'Striped Red Mullet',
    'Trachinus draco',
    'Trigloporus lastoviza',
    'Trout'
  ];

  return (
    <div className="container-fluid d-flex align-items-center justify-content-center flex-column" style={{ minHeight: '100vh' }}>
      <div className="col-md-6 mb-3 mt-5">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Upload Image</h2>
            <input type="file" accept=".jpg,.jpeg,.png" onChange={handleFileChange} className="form-control mb-3" />
            <button className="btn btn-primary btn-block" onClick={handleUpload}>Upload</button>
          </div>
        </div>
      </div>
      <div className="col-md-10 mb-3">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Classification Available For:</h2>
            <div className="row">
              {details.map((detail, index) => (
                <div key={index} className="col-md-3 mb-1">
                  <div className="card">
                    <div className="card-body">
                      <p className="font-italic">{detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Classify;
