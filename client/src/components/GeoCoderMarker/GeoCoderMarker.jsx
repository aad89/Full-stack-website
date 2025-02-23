import React, { useState } from 'react';
import { Marker } from 'pigeon-maps'; // No Popup import

const GeoCoderMarker = ({ position }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <Marker anchor={position} onClick={togglePopup}>
        {showPopup && (
          <div
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              padding: '5px',
              borderRadius: '5px',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
              top: '-20px', // Adjust position above the marker
              left: '10px', // Adjust the left position
              zIndex: 9999,
            }}
          >
            Location: {position[0]}, {position[1]}
          </div>
        )}
      </Marker>
    </>
  );
};

export default GeoCoderMarker;
