import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai'
import './UploadImage.css'
import { Button, Group } from '@mantine/core';

const UploadImage = ({propertyDetails, setPropertyDetails, nextStep, prevStep}) => {

  const [imageURL, setImageURL] = useState(propertyDetails.image);

  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    // Ensure Cloudinary script is loaded before initializing widget
    if (typeof window.cloudinary !== 'undefined') {
      cloudinaryRef.current = window.cloudinary;

      // Create the widget only if cloudinary.js is available
      widgetRef.current = cloudinaryRef.current.createUploadWidget(
        {
          cloudName: "dvsgqym7a",
          uploadPreset: "ugtmuvwh",
          maxFiles: 1
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading image:", error);
            return;
          }

          if (result.event === 'success') {
            setImageURL(result.info.secure_url);
          }
        }
      );
    } else {
      console.error("Cloudinary script not loaded");
    }

    // Cleanup function to ensure widget is destroyed when component unmounts
    return () => {
      if (widgetRef.current) {
        widgetRef.current.destroy();
      }
    };
  }, []);

  const handleNext = ()=>{
    setPropertyDetails((prev)=> ({...prev, image: imageURL}))
    nextStep()
  }
  return (
    <div className='flexColCenter uploadWrapper'>
      {
        !imageURL ? (
          <div className="flexColCenter uploadZone" onClick={()=> widgetRef.current?.open()}>
            <AiOutlineCloudUpload size={50} color='grey'/>
            <span>Upload Image</span>
          </div>
        ) :(
          <div className="uploadedImage" onClick={()=> widgetRef.current?.open()}>
            <img src={imageURL} />
          </div>
        )
      }
      <Group position= 'center' mt="xl">
        <Button variant='default' onClick={prevStep}>Back</Button>
        <Button  onClick={handleNext} disabled={!imageURL}>Next</Button>
      </Group>
    </div>
  )
}

export default UploadImage