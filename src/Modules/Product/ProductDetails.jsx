import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Grid,
  Typography,
  Paper,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Carousel from "../../Component/Carousel/Carousel";
import { GetProductByIdData, ProductData } from "./ProductSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productDetails = useSelector(ProductData)?.getDataById;
  const { id, orderId } = useParams();
  const [images, setImages] = useState([]);
  const [navigateTo, setNavigateTo] = useState("/cmi");
  const lastIdNumber = id.match(/\d+$/)[0];

  useEffect(() => {
    if (lastIdNumber) {
      dispatch(GetProductByIdData(lastIdNumber));
      if (orderId) setNavigateTo(`/cmi/orderDetails/${orderId}`);
    }
  }, []);

  useEffect(() => {
    if (productDetails) {
      setImages(productDetails?.attachment || []);
    }
  }, [productDetails]);

  return (
    <>
      {/* Header stays as-is */}
      <Typography className="pageHeader" style={{padding:"0px 10px"}}>
      <Button onClick={()=>window.location.assign(navigateTo)} variant="text"><ArrowBackIcon/></Button>
    
        Product Details</Typography>

      {/* Details Section */}
      <Box>
        {/* PRODUCT DETAILS SECTION */}
        <Paper elevation={0} sx={{ p: 3 }}>
          <Grid container spacing={3}>
            {/* Image View */}
            <Grid item xs={12} sm={4}>
              <Card
                elevation={3}
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  bgcolor: "#fff",
                  minHeight: 300,
                }}
              >
                <Carousel data={images} />
              </Card>
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} sm={8}>
              <Card
                elevation={2}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "#fff",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={600}
                  color="primary"
                  gutterBottom
                >
                  {productDetails?.name}
                </Typography>

                <Typography variant="body2" sx={{ mb: 2 }} color="text.secondary">
                  <b>Description:</b> {productDetails?.description}
                </Typography>

                <Grid container spacing={1}>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mb: 1 }}>
                      <b>Color:</b> {productDetails?.color}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mb: 1 }}>
                      <b>Material:</b> {productDetails?.material}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mb: 1 }}>
                      <b>Piece Per Carton:</b> {productDetails?.piecePerKarton}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ mb: 1 }}>
                      <b>Minimum Order Quantity:</b> {productDetails?.minOrder}{" "}
                      {productDetails?.minOrderUnit}
                    </Typography>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default ProductDetails;
