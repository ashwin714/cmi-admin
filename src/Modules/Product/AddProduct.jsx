import { Box, Button, Card, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import InputTextField from '../../Component/InputTextField/InputTextField'
import { LettersRegex } from '../../app/HelperFunction'
import ImageUpload from "../../Component/ImageUpload/ImageUpload";
import AutoCompleteDropdown from "../../Component/Dropdown/AutoCompleteDropdown";
import axios from 'axios';
import { GetCategoryData, GetProductByIdData, GetUnitData, ProductData } from './ProductSlice';
import { useDispatch, useSelector } from "react-redux";
import InputNumberField from '../../Component/InputNumberField/InputNumberField';
import ToastAlert from '../../Component/Alert/ToastAlert';
import CropAndUploadMultipleImages from '../../Component/ImageUpload/ImageCropAndUpload';
import Loader from '../../Component/Loader/Loader';
import { useParams } from 'react-router-dom';
export const apiUrl = process.env.REACT_APP_URL;
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
    const accessToken = localStorage?.getItem("accessToken");
    const accessTokenJson = JSON?.parse(accessToken);
    const [productName, setProductName] = useState("");
    const [fileImage, setFileImage] = useState([]);
    const [thumbnail, setThumbnail] = useState([]);
    const [description, setDescription] = useState("");
    const [material, setMaterial] = useState("");
    const [color, setColor] = useState("");
    const [size, setSize] = useState("");
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState([]);
    const [category, setCategory] = useState([]);
    const [isLoading, setIsLoading]=useState(false)
    const [claerImage, setClaerImage]=useState(false);

    useEffect(() => {
       console.log(fileImage)
       console.log(thumbnail)
    }, [fileImage,thumbnail]);
    useEffect(() => {
        dispatch(GetCategoryData());
        dispatch(GetUnitData());
    }, []);
    useEffect(() => {
        if (lastIdNumber) {
          dispatch(GetProductByIdData(lastIdNumber))
        }
      }, []);
      useEffect(()=>{
        if(productDetails){
            setProductName(productDetails?.name);
            setFileImage(productDetails?.attachment?.map(attachment => {
                const { url, ...rest } = attachment;
                return { src: url, ...rest };
              }));
            setThumbnail(productDetails?.attachment?.map(attachment => {
                const { url, ...rest } = attachment;
                return { src: url, ...rest };
              }));
            setDescription(productDetails?.description)
            setMaterial(productDetails?.material)
            setColor(productDetails?.color)
            setSize(productDetails?.size)
            setQuantity(productDetails?.minOrder);
            setUnit(productDetails?.minOrderUnit);
            setCategory(productDetails?.category);
            setClaerImage(false);
        }
      },[productDetails]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setClaerImage(true)
        const FormData = require('form-data');
        let data = new FormData();
        data.append('productData', JSON.stringify({
            name: productName,
            description: description,
            material: material,
            color: color,
            size: size,
            minOrder: quantity,
            minOrderUnit: unit,
            category: category
        }));
        //const imagFfiles = image ? [...image] : [];
        fileImage.forEach((file, i) => {
            console.log(`file`, file);
            data.append(`file`, file);
        });
        //const thumbFiles = thumbnail ? [...thumbnail] : [];
        thumbnail.forEach((file, i) => {
            console.log(`thumbnail`, file)
            data.append(`thumbnail`, file);
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${apiUrl}/`,
            headers: {
                'Authorization': `Bearer ${accessTokenJson}`,
                //...data.getHeaders()
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                setIsLoading(false);
                ToastAlert("Product Added Successfully", "success");
                clearForm();
                setClaerImage(false)
            })
            .catch((error) => {
                setIsLoading(false);
                ToastAlert("Somthing went wrong", "error");
                setClaerImage(false)
            });

    };
    const clearForm = () => {
        setProductName("");
        setDescription("");
        setMaterial("");
        setColor("");
        setSize("");
        setQuantity("");
        setUnit("");
        setCategory("");
        setFileImage([]);
        setThumbnail([]);
    }


    return (
        <>
        {isLoading&&<Loader/>}
            <Typography className="pageHeader">Add Product</Typography>
            <Card>
                <form onSubmit={handleSubmit} >
                    <Grid container spacing={1} sx={{ pl: 2, pr: 2, pt: 1 }}>
                        <Grid item sx={6}>
                        <label>Add Thumbnail</label>
                        <CropAndUploadMultipleImages setImage={setThumbnail} attachment={fileImage} clearImage={claerImage} 
                            aspectWidth={840} aspectHeight={1200} multiple={false}/>
                        </Grid>
                        <Grid item sx={6}>
                        <label>Add Images</label>
                        <CropAndUploadMultipleImages setImage={setFileImage} attachment={thumbnail} clearImage={claerImage} 
                            aspectWidth={480} aspectHeight={576} multiple={true}/>
                        </Grid>
                        {/* <Grid sm={6} item>
                            <label>Add Thumbnail</label>
                            <ImageUpload setImage={setImage} image={image} thumbnail={thumbnail} 
                            aspectWidth={7} aspectHeight={10}/>
                        </Grid> */}
                        {/* <Grid sm={6} item>
                            <label>Add Images</label>
                            <ImageUpload setImage={setThumbnail} image={image} thumbnail={thumbnail} aspectWidth={480} aspectHeight={576} />
                        </Grid> */}
                        <Grid sm={4} item >
                            <InputTextField
                                label="Product Name"
                                value={productName}
                                onChange={setProductName}
                                maxLength={LettersRegex}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={12} item >
                            <InputTextField
                                label="Description"
                                value={description}
                                onChange={setDescription}
                                maxLength={LettersRegex}
                                //isRequired
                                rows={3}
                                multiLine
                            />
                        </Grid>
                        <Grid sm={4} item >
                            <InputTextField
                                label="Material"
                                value={material}
                                onChange={setMaterial}
                                maxLength={LettersRegex}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={4} item >
                            <InputTextField
                                label="Color"
                                value={color}
                                onChange={setColor}
                                maxLength={LettersRegex}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={4} item >
                            <InputTextField
                                label="Size"
                                value={size}
                                onChange={setSize}
                                maxLength={LettersRegex}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={4} item >
                            <InputNumberField
                                label="Quantity"
                                value={quantity}
                                onChange={setQuantity}
                                maxLength={LettersRegex}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={4} item >
                            <AutoCompleteDropdown
                                label="Unit"
                                dataSet={unitList}
                                getOptionLabel="name"
                                selectedValue={unit}
                                getOptionValue="name"
                                onChange={setUnit}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={4} item >
                            <AutoCompleteDropdown
                                label="Category"
                                dataSet={categoryList}
                                getOptionLabel="name"
                                selectedValue={category}
                                getOptionValue="name"
                                onChange={setCategory}
                            //isRequired
                            />
                        </Grid>
                        <Grid sm={12} item sx={{ mb: 2 }} style={{ textAlign: "center" }}>
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
    )
}

export default AddProduct