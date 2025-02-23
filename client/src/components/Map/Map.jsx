import React, { useEffect, useState } from 'react';
import { Map as PigeonMap, Marker } from 'pigeon-maps';
import '../../pages/Property/Property.css'
import GeoCoderMarker from '../GeoCoderMarker/GeoCoderMarker';

const CustomMap = ({ address, city, country }) => {
  const [position, setPosition] = useState([53.35, 18.8]); // Default position

  useEffect(() => {
    const fullAddress = `${address} ${city} ${country}`;
    
    // Simple geocoding logic (you can replace with your own geocoding API)
    const geocodeAddress = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(fullAddress)}`
        );
        const data = await res.json();
        if (data && data[0]) {
          const { lat, lon } = data[0];
          setPosition([parseFloat(lat), parseFloat(lon)]);
        }
      } catch (error) {
        console.error('Geocoding failed:', error);
      }
    };

    geocodeAddress();
  }, [address, city, country]);

  return (
    <div className="map-container">
      <PigeonMap
        height="40vh"  // Full height relative to its container
        width="100%"   // Full width relative to its container
        center={position}  // Set dynamic center based on geocoding
          // Adjust zoom level based on your needs
      >
        <GeoCoderMarker address={`${address} ${city} ${country}`} position={position} />
        <Marker anchor={position} /> {/* Render marker at geocoded position */}
      </PigeonMap>
    </div>
  );
};

export default CustomMap;
