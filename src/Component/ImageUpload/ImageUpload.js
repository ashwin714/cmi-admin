import { Close, Delete, InsertPhoto, PhotoCamera } from "@mui/icons-material";
import { Button, Card, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const ImageUpload = ({ attachments, setImage, image, thumbnail, aspectWidth, aspectHeight }) => {
  const [file, setFile] = useState([]);
  const [fileArr, setFileArr] = useState([]);
  const [crop, setCrop] = useState({ aspect: aspectWidth / aspectHeight }); // Set aspect ratio to 840x1200
  const [croppedImage, setCroppedImage] = useState(null);
  const [isCropped, setIsCropped] = useState(false); // State to track if image is cropped

  function handleUpload(e) {
    const uploadedFiles = Array.from(e.target.files); // Convert FileList to an array
    setFileArr(uploadedFiles);
  
    // Process uploaded files
    const imagesArray = uploadedFiles.map((file) => URL.createObjectURL(file));
    setFile((prevFiles) => [...prevFiles, ...imagesArray]);
  }
  

  useEffect(() => {
    setImage(fileArr)
  }, [fileArr]);

  useEffect(() => {
    if (image?.length === 0 && thumbnail?.length === 0) {
      setFile([]);
    }
  }, [image, thumbnail]);

  useEffect(() => {
    if (attachments !== undefined) {
      var attachArr = attachments?.map((item) => {
        return item?.url
      });
      setFile(attachArr);
    }
  }, [attachments]);

  useEffect(() => {
    console.log(file, "file22222222222")
  }, [file]);

  function deleteFile(e) {
    const s = file.filter((item, index) => index !== e);
    setFile(s);
    const f = fileArr.filter((item, index) => index !== e);
    setFileArr(f);
    // Reset cropped image and isCropped state when deleting a file
    setCroppedImage(null);
    setIsCropped(false);
  }

  const onCropComplete = (crop, pixelCrop) => {
    console.log(pixelCrop.width , pixelCrop.height,"pixelCrop.width && pixelCrop.height")
    if (pixelCrop.width && pixelCrop.height) {
      const canvas = document.createElement('canvas');
      const image = document.createElement('img');
      image.src = file[0]; // Assuming you are cropping the first image in the file array
  
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
  
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
  
      const ctx = canvas.getContext('2d');
  
      ctx.drawImage(
        image,
        pixelCrop.x * scaleX,
        pixelCrop.y * scaleY,
        pixelCrop.width * scaleX,
        pixelCrop.height * scaleY,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );
  
      const croppedImageUrl = canvas.toDataURL('image/jpeg');
  
      setCroppedImage(croppedImageUrl);
      setIsCropped(true); // Set isCropped to true when cropping is completed
    }
  };
  

  return (
    <form>
      <div className="form-group preview">
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {file.length > 0 &&
            file.map((item, index) => {
              return (
                <Grid item sm={2} key={item} style={{ height: "100px", width: "100%", position: "relative" }}>
                  <Card>
                    <img src={item} alt="" style={{ height: "100px", width: "100%", }} />
                    <Button type="button" onClick={() => deleteFile(index)} style={{
                      position: "absolute",
                      color: "red", right: "-15px", top: "10px"
                    }}>
                      <Delete />
                    </Button>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </div>

      <Grid container sx={{ mt: 2 }}>
        <Grid item>
          <ReactCrop
            src={croppedImage}
            crop={crop}
            onChange={(newCrop) => setCrop(newCrop)}
            onComplete={onCropComplete}
          />
        </Grid>
        <Grid item>
          <Button variant="contained" component="label" className="background-button">
            Add <InsertPhoto sx={{ ml: 2 }} />
            <input hidden accept="image/*" multiple type="file" onChange={handleUpload} />
          </Button>
        </Grid>
      </Grid>
      {isCropped && <p>Cropped image saved!</p>}
    </form>
  );
};

export default ImageUpload;
