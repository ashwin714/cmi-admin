import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

const ResizeAndUploadMultipleImages = ({ setImage, clearImage, aspectWidth, aspectHeight }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImage(images);
  }, [images]);

  useEffect(() => {
    if (clearImage) {
      setImages([]);
    }
  }, [clearImage]);

  const resizeImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          const targetAspectRatio = aspectWidth / aspectHeight;
          const originalAspectRatio = width / height;

          if (originalAspectRatio > targetAspectRatio) {
            width = Math.min(width, aspectWidth);
            height = width / originalAspectRatio;
          } else {
            height = Math.min(height, aspectHeight);
            width = height * originalAspectRatio;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob((blob) => {
            resolve(blob);
          }, file.type);
        };
      };
    });
  };

  const onDrop = async (acceptedFiles) => {
    const resizedImages = [];
    for (const file of acceptedFiles) {
      const resizedBlob = await resizeImage(file);
      const resizedFile = new File([resizedBlob], file.name, { type: resizedBlob.type });
      resizedImages.push({ file: resizedFile, src: URL.createObjectURL(resizedFile) });
    }
    setImages((prevImages) => [...prevImages, ...resizedImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true,
  });

  return (
    <div>
      <div
        {...getRootProps()}
        style={{ border: '2px dashed #ccc', padding: '20px', textAlign: 'center' }}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop images here, or click to select images</p>
      </div>
      {images.map((image, index) => (
        <div key={index} style={{ width: '150px', float: 'left', marginTop: '10px' }}>
          <img src={image.src} alt={`Image ${index}`} style={{ height: '100px' }} />
        </div>
      ))}
    </div>
  );
};

export default ResizeAndUploadMultipleImages;
