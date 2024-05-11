import React, { useEffect, useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import { resizeFile } from 'react-image-file-resizer';

const ImageUploader = ({ setImage, clearImage, aspectWidth, aspectHeight }) => {
  const [images, setImages] = useState([]);

  useEffect(()=>{
    setImage(images);
  },[images])
  const handleImageUpload = async (files) => {
    const resizedImages = [];
    for (const file of files) {
      try {
        const resizedImage = await resizeImage(file);
        resizedImages.push(resizedImage);
      } catch (error) {
        console.error('Error resizing image:', error);
      }
    }
    setImages(resizedImages);
  };

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      resizeFile(file, 300, 300, 'JPEG', 100, 0, (resizedFile) => {
        resolve(resizedFile);
      }, 'blob');
    });
  };

  return (
    <div>
      <DropzoneArea
        acceptedFiles={['image/*']}
        dropzoneText="Drag and drop an image here or click"
        onChange={handleImageUpload}
        maxFileSize={5000000} // Example: 5MB
        filesLimit={10} // Example: Up to 10 images
      />
      {images.map((image, index) => (
        <img key={index} src={URL.createObjectURL(image)} alt={`Image ${index}`} />
      ))}
    </div>
  );
};

export default ImageUploader;
