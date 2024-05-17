import React, { useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';

function ImageCropExample({ setImage, clearImage, aspectWidth, aspectHeight, multiple }) {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [crop, setCrop] = useState({ unit: 'px', width: 30, aspect: aspectWidth / aspectHeight }); // Set aspect ratio based on props
  const [showModal, setShowModal] = useState(false);
  const [croppedImageUrls, setCroppedImageUrls] = useState([]);

  const onDrop = acceptedFiles => {
    const newImages = acceptedFiles.map(file => ({
      file,
      src: URL.createObjectURL(file)
    }));
    setImages([...images, ...newImages]);
    setShowModal(true);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: multiple
  });

  const onCropComplete = crop => {
    makeClientCrop(crop);
  };

  const makeClientCrop = async crop => {
    const { file, src } = images[currentImageIndex];
    if (src && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(src, crop);
      const newCroppedImageUrls = [...croppedImageUrls];
      newCroppedImageUrls[currentImageIndex] = croppedImageUrl;
      setCroppedImageUrls(newCroppedImageUrls);
    }
  };

  const getCroppedImg = (src, crop) => {
    return new Promise(resolve => {
      const image = new Image();
      image.src = src;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');

        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          resolve(url);
        }, 'image/png');
      };
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCrop({ unit: '%', width: 30, aspect: aspectWidth / aspectHeight }); // Reset aspect ratio on modal close
    setCurrentImageIndex(0);
  };

  const handleSaveCrop = async () => {
    setShowModal(false);
    const croppedImageUrlsCopy = [...croppedImageUrls];
    const croppedImageUrl = croppedImageUrlsCopy[currentImageIndex];
    if (croppedImageUrl) {
      try {
        const blob = await fetch(croppedImageUrl).then(r => r.blob());
        const uniqueFileName = `cropped_image_${Date.now()}_${Math.floor(Math.random() * 100000)}.png`;
        const croppedFile = new File([blob], uniqueFileName, { type: 'image/png', lastModified: new Date().getTime() });
        setImage(prevFiles => [...prevFiles, croppedFile]);
      } catch (error) {
        console.error('Error converting cropped image URL to Blob:', error);
      }
    }
  };

  useEffect(() => {
    if (clearImage) {
      setCroppedImageUrls([]);
      setImages([]);
    }
  }, [clearImage]);

  return (
    <div>
      <div {...getRootProps()} style={{ marginBottom: '20px', border: "1px dashed", padding: "10px" }}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <Modal open={showModal} onClose={handleCloseModal}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px' }}>
          <h2>Crop Image</h2>
          {images.length > 0 && (
            <ReactCrop
              src={images[currentImageIndex].src}
              crop={crop}
              onComplete={onCropComplete}
              onChange={newCrop => setCrop(newCrop)}
              style={{ maxHeight: '70vh', maxWidth: '90vw' }}
            />
          )}
          <Button variant="contained" color="primary" onClick={handleSaveCrop}>Save Crop</Button>
          <Button variant="contained" onClick={handleCloseModal}>Close</Button>
        </div>
      </Modal>
      {croppedImageUrls.map((url, index) => (
        <div key={index}>
          <img alt={`Cropped ${index}`} src={url} style={{ maxWidth: '200px' }} />
        </div>
      ))}
    </div>
  );
}

export default ImageCropExample;
