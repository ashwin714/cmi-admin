import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Modal, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageUploaderWithCrop = ({ multiple = true, setImage ,attachment}) => {
  const [images, setImages] = useState([attachment]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [crop, setCrop] = useState(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages(multiple ? [...images, ...newImages] : newImages);
    setImage(multiple ? [...images, ...newImages] : newImages)
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    maxFiles: multiple ? undefined : 1,
    disabled: !multiple && images.length >= 1,
  });

  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    setImage(updatedImages);
  };

  const handleOpenModal = (image) => {
    setSelectedImage(image);
    setCrop(makeAspectCrop(centerCrop({ width: 80, height: 80, unit: '%' }), 1, 500, 500));
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setCrop(null);
    setCompletedCrop(null);
    setCroppedImageUrl(null);
    setIsModalOpen(false);
  };

  const handleCropSave = () => {
    if (croppedImageUrl) {
      const updatedImages = images.map((img) =>
        img.preview === selectedImage ? { ...img, preview: croppedImageUrl } : img
      );
      setImages(updatedImages);
      setImage(updatedImages);
    }
    handleCloseModal();
  };

  const onImageLoaded = useCallback((image) => {
    setSelectedImage((prev) => ({ ...prev, image }));
  }, []);

  const handleCropComplete = useCallback(
    (crop) => {
      if (crop && selectedImage?.image) {
        const canvas = document.createElement('canvas');
        const scaleX = selectedImage.image.naturalWidth / selectedImage.image.width;
        const scaleY = selectedImage.image.naturalHeight / selectedImage.image.height;
        canvas.width = crop.width;
        canvas.height = crop.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(
          selectedImage.image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );
        canvas.toBlob((blob) => {
          const croppedUrl = URL.createObjectURL(blob);
          setCroppedImageUrl(croppedUrl);
        });
      }
    },
    [selectedImage]
  );

  return (
    <Box sx={{ p: 2 }}>
      <Box
        {...getRootProps()}
        sx={{
          border: '2px dashed gray',
          padding: '20px',
          textAlign: 'center',
          cursor: 'pointer',
          borderRadius: '10px',
          background: isDragActive ? '#f0f0f0' : 'transparent',
        }}
      >
        <input {...getInputProps()} />
        <Typography>
          {isDragActive ? 'Drop your files here...' : 'Drag & drop files here or click to upload'}
        </Typography>
        {!multiple && images.length >= 1 && (
          <Typography color="error" sx={{ mt: 1 }}>
            Upload limit reached.
          </Typography>
        )}
      </Box>

      <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        {images.map((file, index) => (
          <Box
            key={file.preview}
            sx={{
              position: 'relative',
              width: '120px',
              height: '120px',
              borderRadius: '10px',
              overflow: 'hidden',
              border: '1px solid #ccc',
            }}
          >
            <img
              src={file.preview}
              alt="Preview"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              onClick={() => handleOpenModal(file.preview)}
            />
            <CloseIcon
              sx={{
                position: 'absolute',
                top: 5,
                right: 5,
                cursor: 'pointer',
                background: '#fff',
                borderRadius: '50%',
              }}
              onClick={() => handleRemoveImage(index)}
            />
          </Box>
        ))}
      </Box>

      {/* Modal for cropping */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            p: 2,
            boxShadow: 24,
            borderRadius: '10px',
            maxWidth: '90%',
            maxHeight: '90%',
            overflow: 'auto',
          }}
        >
          {selectedImage && (
            <>
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={1}
              >
                <img
                  src={selectedImage}
                  alt="To Crop"
                  onLoad={(e) => onImageLoaded(e.target)}
                  style={{ maxWidth: '100%' }}
                />
              </ReactCrop>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                fullWidth
                onClick={handleCropSave}
              >
                Save Crop
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ImageUploaderWithCrop;
