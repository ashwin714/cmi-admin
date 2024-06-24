import React, { useEffect, useState } from 'react';
import { Button, Card, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GetCategoryData, GetProductByIdData, GetUnitData, ProductData } from './ProductSlice';
import InputTextField from '../../Component/InputTextField/InputTextField';
import { LettersRegex } from '../../app/HelperFunction';
import CropAndUploadMultipleImages from '../../Component/ImageUpload/ImageCropAndUpload';
import AutoCompleteDropdown from '../../Component/Dropdown/AutoCompleteDropdown';
import InputNumberField from '../../Component/InputNumberField/InputNumberField';
import ToastAlert from '../../Component/Alert/ToastAlert';
import Loader from '../../Component/Loader/Loader';

const apiUrl = process.env.REACT_APP_URL;

const AddProduct = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const lastIdNumber = id?.match(/\d+$/)[0];
  const catList = useSelector(ProductData)?.getCategory;
  const unitList = useSelector(ProductData)?.getUnit;
  const productDetails = useSelector(ProductData)?.getDataById;
  const categoryList = catList?.map((item, index) => ({
    name: item,
    id: index
  }));
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
      setThumbnail(productDetails?.attachment?.slice(0, 1).map(attachment => ({ src: attachment.url, ...attachment })) || []);
      setFileImage(productDetails?.attachment?.slice(1).map(attachment => ({ src: attachment.url, ...attachment })) || []);
      setDescription(productDetails?.description || '');
      setMaterial(productDetails?.material || '');
      setColor(productDetails?.color || '');
      setSize(productDetails?.size || '');
      setQuantity(productDetails?.minOrder || '');
      setUnit(productDetails?.minOrderUnit || '');
      setCategory(productDetails?.category || '');
      setPiecePerKarton(productDetails?.piecePerKarton || '');
      setClearImage(false);
    }
  }, [productDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setClearImage(true);

    const formData = new FormData();
    formData.append('productData', JSON.stringify({
      name: productName,
      description,
      material,
      color,
      size,
      minOrder: quantity,
      minOrderUnit: unit,
      category,
      piecePerKarton,
      id: lastIdNumber // Conditionally include id based on its existence
    }));

    fileImage.forEach(file => formData.append('file', file));
    thumbnail.forEach(file => formData.append('thumbnail', file));

    const config = {
      method: lastIdNumber ? 'put' : 'post',
      url: `${apiUrl}/`, // Replace with your API endpoint
      headers: {
        'Authorization': `Bearer ${accessTokenJson}`,
        // Uncomment the line below if your backend expects form-data content type
        //'Content-Type': 'multipart/form-data',
      },
      data: formData
    };

    try {
      const response = await axios.request(config);
      setIsLoading(false);
      ToastAlert('Product Added Successfully', 'success');
      clearForm();
      setClearImage(false);
    } catch (error) {
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
              <CropAndUploadMultipleImages
                setImage={setThumbnail}
                attachment={thumbnail}
                clearImage={clearImage}
                aspectWidth={840}
                aspectHeight={1200}
                multiple={false}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <label>Add Images</label>
              <CropAndUploadMultipleImages
                setImage={setFileImage}
                attachment={fileImage}
                clearImage={clearImage}
                aspectWidth={480}
                aspectHeight={576}
                multiple={true}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputTextField
                label="Product Name"
                value={productName}
                onChange={setProductName}
                maxLength={LettersRegex}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <InputTextField
                label="Description"
                value={description}
                onChange={setDescription}
                maxLength={LettersRegex}
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
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputTextField
                label="Color"
                value={color}
                onChange={setColor}
                maxLength={LettersRegex}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputTextField
                label="Size"
                value={size}
                onChange={setSize}
                maxLength={LettersRegex}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputNumberField
                label="Quantity"
                value={quantity}
                onChange={setQuantity}
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
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputNumberField
                label="Piece Per Karton"
                value={piecePerKarton}
                onChange={setPiecePerKarton}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <AutoCompleteDropdown
                label="Category"
                dataSet={categoryList}
                getOptionLabel="name"
                selectedValue={category}
                getOptionValue="name"
                onChange={setCategory}
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
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
