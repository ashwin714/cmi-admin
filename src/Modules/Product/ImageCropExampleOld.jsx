import React, { useState } from "react";
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
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import Cropper from "react-easy-crop";
import { v4 as uuidv4 } from "uuid";

// Helper function to convert base64 to file
const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

const ImageUploaderWithCrop = ({
  setImage,   // Function to update the images in the parent component
  attachment = [],  // Existing image attachments to pre-populate the uploader
  clearImage,  // Flag to clear images when necessary
  aspectWidth = 4,   // Aspect width for cropping
  aspectHeight = 3,  // Aspect height for cropping
  multiple = false,  // Flag to handle multiple or single image upload
}) => {
  const [images, setImages] = useState(attachment);  // Local state to hold images
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  // Open crop modal with selected image
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
      const updatedImages = multiple ? [...images, newImage] : [newImage]; // Handle multiple or single image upload
      setImages(updatedImages);
      setImage(updatedImages); // Pass the updated image list to the parent component
      setCropModalOpen(false);
      setCurrentImage(null);
    }
  };

  // Remove image
  const handleRemoveImage = (id) => {
    const updatedImages = images.filter((image) => image.id !== id);
    setImages(updatedImages);
    setImage(updatedImages); // Pass the updated image list to the parent component
  };

  // Clear images when clearImage is set to true
  React.useEffect(() => {
    if (clearImage) {
      setImages([]);
      setImage([]);
    }
  }, [clearImage, setImage]);

  return (
    <Box>
      <ImageList cols={3} rowHeight={160} gap={8}>
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
              crop={{ x: 0, y: 0 }}
              zoom={1}
              aspect={aspectWidth / aspectHeight}
              onCropChange={() => {}}
              onCropComplete={onCropComplete}
            />
          )}
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
