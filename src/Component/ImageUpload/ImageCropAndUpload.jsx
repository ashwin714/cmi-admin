import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Slider,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import Cropper from "react-easy-crop";
import { v4 as uuidv4 } from "uuid";

const ImageUploaderWithCrop = ({
  setImage,
  attachment = [],
  clearImage,
  aspectWidth = 4,
  aspectHeight = 3,
  multiple = false,
}) => {
  const [images, setImages] = useState([]);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  // Format and load attachments on component mount
  useEffect(() => {
    if (attachment && attachment.length) {
      const formattedImages = attachment.map((item) => ({
        id: uuidv4(),
        src: item.src || item.url, // Ensure compatibility with API format
      }));
      setImages(formattedImages);
    }
  }, [attachment]);

  // Handle adding a new image
  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentImage({ id: uuidv4(), src: reader.result });
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cropped area
  const onCropComplete = (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  // Save cropped image
  const saveCroppedImage = () => {
    if (currentImage && croppedAreaPixels) {
      const newImage = { ...currentImage, croppedArea: croppedAreaPixels };
      const updatedImages = multiple ? [...images, newImage] : [newImage];
      setImages(updatedImages);
      setImage(updatedImages);
      setCropModalOpen(false);
      setCurrentImage(null);
      setZoom(1); // Reset zoom
    }
  };

  // Handle removing an image
  const handleRemoveImage = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
    setImage(updatedImages);
  };

  // Handle clearing images when the flag is set
  useEffect(() => {
    if (clearImage) {
      setImages([]);
      setImage([]);
    }
  }, [clearImage, setImage]);

  return (
    <Box>
      <ImageList cols={4} rowHeight={120} gap={8}>
        {images.map((image) => (
          <ImageListItem key={image.id}>
            <img src={image.src} alt="Uploaded" style={{ objectFit: "cover" }} />
            <ImageListItemBar
              position="top"
              actionIcon={
                <IconButton
                  aria-label="delete"
                  sx={{ color: "white" }}
                  onClick={() => handleRemoveImage(image.id)}
                >
                  <Delete />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
        <ImageListItem>
          <Button
            component="label"
            sx={{ width: "100%", height: "100%", border: "1px dashed grey" }}
          >
            <Add fontSize="large" />
            <input
              type="file"
              accept="image/*"
              onChange={handleAddImage}
              hidden
            />
          </Button>
        </ImageListItem>
      </ImageList>

      {/* Crop Modal */}
      <Dialog open={cropModalOpen} onClose={() => setCropModalOpen(false)} fullWidth>
        <DialogTitle>Crop Image</DialogTitle>
        <DialogContent sx={{ position: "relative", height: 400 }}>
          {currentImage && (
            <Cropper
              image={currentImage.src}
              crop={crop}
              zoom={zoom}
              aspect={aspectWidth / aspectHeight}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          )}
          {/* Zoom Slider */}
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-label="Zoom"
            onChange={(e, value) => setZoom(value)}
            sx={{ position: "absolute", bottom: 20, left: 20, right: 20 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCropModalOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={saveCroppedImage}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ImageUploaderWithCrop;
