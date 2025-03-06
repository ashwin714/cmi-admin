import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GetCategoryData, GetProductByIdData, GetUnitData, ProductData } from './ProductSlice';
import InputTextField from '../../Component/InputTextField/InputTextField';
import { LettersRegex } from '../../app/HelperFunction';
import ImageUploaderWithCrop from '../../Component/ImageUpload/ImageCropAndUpload';
import AutoCompleteDropdown from '../../Component/Dropdown/AutoCompleteDropdown';
import InputNumberField from '../../Component/InputNumberField/InputNumberField';
import ToastAlert from '../../Component/Alert/ToastAlert';
import Loader from '../../Component/Loader/Loader';

const apiUrl = process.env.REACT_APP_URL;

function dataURLtoFile(dataUrl, fileName) {
  try {
    if (!dataUrl || typeof dataUrl !== 'string') throw new Error('Invalid data URL');
    const arr = dataUrl.split(',');
    if (arr.length !== 2) throw new Error('Invalid data URL format');
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch || !mimeMatch[1]) throw new Error('Invalid MIME type in data URL');
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], fileName, { type: mime });
  } catch (error) {
    console.error('Error converting data URL to file:', error.message);
    return null;
  }
}

const AddProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const lastIdNumber = id?.match(/\d+$/)?.[0];
  const catList = useSelector(ProductData)?.getCategory;
  const unitList = useSelector(ProductData)?.getUnit;
  const productDetails = useSelector(ProductData)?.getDataById;
  const categoryList = catList?.map((item, index) => ({ name: item, id: index }));
  const accessToken = localStorage?.getItem('accessToken');
  const accessTokenJson = JSON?.parse(accessToken);

  const [productName, setProductName] = useState('');
  const [fileImage, setFileImage] = useState([]);
  const [thumbnail, setThumbnail] = useState([]);
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [size, setSize] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('');
  const [piecePerKarton, setPiecePerKarton] = useState('');
  const [category, setCategory] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [clearImage, setClearImage] = useState(false);
  const [packingQty, setPackingQty] =useState('')

  useEffect(() => {
    console.log('File Images:', fileImage);
    console.log('Thumbnail:', thumbnail);
  }, [fileImage, thumbnail]);

  useEffect(() => {
    dispatch(GetCategoryData());
    dispatch(GetUnitData());
  }, [dispatch]);

  useEffect(() => {
    if (lastIdNumber) {
      dispatch(GetProductByIdData(lastIdNumber));
    }
  }, [dispatch, lastIdNumber]);

  useEffect(() => {
    if (productDetails) {
      setProductName(productDetails?.name || '');
      setThumbnail(
        productDetails?.attachment?.slice(0, 1).map((attachment) => ({ src: attachment.url })) || []
      );
      setFileImage(
        productDetails?.attachment?.slice(1).map((attachment) => ({ src: attachment.url })) || []
      );
      setDescription(productDetails?.description || '');
      setMaterial(productDetails?.material || '');
      setColor(productDetails?.color || '');
      setSize(productDetails?.size || '');
      setQuantity(productDetails?.minOrder || '');
      setUnit(productDetails?.minOrderUnit || '');
      setCategory(productDetails?.category || '');
      setPiecePerKarton(productDetails?.piecePerKarton || '');
      setPackingQty(productDetails?.packingQty || '')
      setClearImage(false);
    }
  }, [productDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setClearImage(true);

    const formData = new FormData();
    formData.append(
      'productData',
      JSON.stringify({
        name: productName,
        description,
        material,
        color,
        size,
        minOrder: quantity,
        minOrderUnit: unit,
        category,
        piecePerKarton,
        packingQty:packingQty,
        id: lastIdNumber,
      })
    );

    // Append new and existing images separately
    fileImage.forEach((image) => {
      if (image.src.startsWith('data:image')) {
        const file = dataURLtoFile(image.src, `image_${image.id}.jpg`);
        if (file) formData.append('file', file);
      }
    });

    thumbnail.forEach((image) => {
      if (image.src.startsWith('data:image')) {
        const file = dataURLtoFile(image.src, `thumbnail_${image.id}.jpg`);
        if (file) formData.append('thumbnail', file);
      } else {
        formData.append('thumbnailUrl', image.src);
      }
    });

    try {
      const config = {
        method: lastIdNumber ? 'put' : 'post',
        url: `${apiUrl}/product/`, // Replace with your API endpoint
        headers: {
          Authorization: `Bearer ${accessTokenJson}`,
        },
        data: formData,
      };
      await axios.request(config);
      setIsLoading(false);
      ToastAlert('Product Added/Updated Successfully', 'success');
      clearForm();
      setClearImage(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsLoading(false);
      ToastAlert('Something went wrong', 'error');
      setClearImage(false);
    }
  };

  const clearForm = () => {
    setProductName('');
    setDescription('');
    setMaterial('');
    setColor('');
    setSize('');
    setQuantity('');
    setUnit('');
    setCategory('');
    setPiecePerKarton('');
    setFileImage([]);
    setThumbnail([]);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Typography className="pageHeader">Add Product</Typography>
      <Card>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} sx={{ pl: 2, pr: 2, pt: 1 }}>
            <Grid item xs={12} sm={6}>
              <label>Add Thumbnail</label>           
              <ImageUploaderWithCrop
                setImage={setThumbnail}
                attachment={thumbnail}
                clearImage={clearImage}
                aspectWidth={0.7}
                aspectHeight={1}
                multiple={false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Add Images</label>
              <ImageUploaderWithCrop
                setImage={setFileImage}
                attachment={fileImage}
                clearImage={clearImage}
                aspectWidth={0.7}
                aspectHeight={1}
                multiple={true}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputTextField
                label="Product Name"
                value={productName}
                onChange={setProductName}
                maxLength={LettersRegex}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputTextField
                label="Description"
                value={description}
                onChange={setDescription}
                maxLength={LettersRegex}
                isRequired={true}
                multiLine
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputTextField
                label="Material"
                value={material}
                onChange={setMaterial}
                maxLength={LettersRegex}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputTextField
                label="Color"
                value={color}
                onChange={setColor}
                maxLength={LettersRegex}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputTextField
                label="Size"
                value={size}
                onChange={setSize}
                maxLength={LettersRegex}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputNumberField
                label="Quantity"
                value={quantity}
                onChange={setQuantity}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <AutoCompleteDropdown
                label="Unit"
                dataSet={unitList}
                getOptionLabel="name"
                selectedValue={unit}
                getOptionValue="name"
                onChange={setUnit}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputNumberField
                label="Piece Per Karton"
                value={piecePerKarton}
                onChange={setPiecePerKarton}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputTextField
                label="Packing Quantity"
                value={packingQty}
                onChange={setPackingQty}
                isRequired={true}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <AutoCompleteDropdown
                label="Category"
                dataSet={categoryList}
                getOptionLabel="name"
                selectedValue={category}
                getOptionValue="name"
                isRequired={true}
                onChange={setCategory}
              />
            </Grid>
            <Grid item xs={12} sx={{ mb:2,textAlign: 'center' }}>
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                className="border-button"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Card>
    </>
  );
};

export default AddProduct;
