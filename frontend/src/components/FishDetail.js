//frontend/src/components/FishDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function FishDetail() {
  const location = useLocation();
  const { computedResponse } = location.state;
  const { detections } = computedResponse;
  const [fishInfo, setFishInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFishInfo = async () => {
          
      try {
        console.log('Detections:', detections);
        const commonNames = [detections.SpeciesName];
        const fishInfoPromises = commonNames.map(async (name) => {
          try {
            const response = await axios.get(`https://api.gbif.org/v1/species/search?q=${name}&limit=1`);
            const species = response.data.results[0]; // Get the first result from the search

            if (species) {
              // Fetch additional information from Wikipedia
              const wikiResponse = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${species.canonicalName}`);
              const { extract, thumbnail } = wikiResponse.data;

              return {
                CommonName: name,
                ScientificName: species.canonicalName || 'Unknown',
                Kingdom: species.kingdom || 'Metazoa',
                Phylum: species.phylum || 'Chordata',
                Order: species.order || 'Labriformes',
                Family: species.family || 'Labridae',
                Genus: species.genus || 'Unknown',
                Species: species.species || 'Unknown',
                Description: extract || 'No description available',
                Thumbnail: thumbnail ? thumbnail.source : null
              };
            } else {
              return null;
            }
          } catch (error) {
            console.error(`Error fetching fish information for ${name}:`, error);
            return null;
          }
        });

        const fishInfoData = await Promise.all(fishInfoPromises);
        setFishInfo(fishInfoData.filter(info => info !== null));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fish information:', error);
        setLoading(false);
      }
    };

    if (detections && detections.SpeciesName) {
      fetchFishInfo();
    }
  }, [detections]);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Fish Details</h1>
      {loading ? (
        <div className="text-center">Loading fish information...</div>
      ) : (
        <div>
          {fishInfo && fishInfo.length > 0 ? (
            <div>
              {fishInfo.map((fish, index) => (
                <div key={index} className="card mb-3">
                  <div className="card-body">
                    <h2 className="card-title text-center mb-3">Fish Information:</h2>
                    <div className="row">
                      <div className="col-md-6">
                        <p className="card-text"><strong>Common Name:</strong> {fish.CommonName}</p>
                        <p className="card-text"><strong>Scientific Name:</strong> {fish.ScientificName}</p>
                        <p className="card-text"><strong>Kingdom:</strong> {fish.Kingdom}</p>
                        <p className="card-text"><strong>Phylum:</strong> {fish.Phylum}</p>
                        <p className="card-text"><strong>Order:</strong> {fish.Order}</p>
                        <p className="card-text"><strong>Family:</strong> {fish.Family}</p>
                        <p className="card-text"><strong>Genus:</strong> {fish.Genus}</p>
                        <p className="card-text"><strong>Species:</strong> {fish.Species}</p>
                      </div>
                      <div className="col-md-6">
                        <p className="card-text"><strong>Description:</strong> {fish.Description}</p>
                        
                        
                          <div className="text-center border p-3 shadow">
                            <img src={fish.Thumbnail} className="img-fluid" alt="Fish Thumbnail" style={{ maxHeight: '200px' }} />
                          </div>
                          <p className="card-text"><strong>Accuracy of Result:</strong> {detections.accuracy}</p>
                        {/*<img
                          src={`../output/${detections.PredictPath}`}
                          className="card-img-top img-fluid"
                          alt={detections.SpeciesName}
                          style={{ objectFit: 'cover', height: '200px' }}
                        />
                      */}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">No information available for the detected fish species.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default FishDetail;
