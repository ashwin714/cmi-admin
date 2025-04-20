import React, { useEffect, useState } from "react";
import {
  Card,
  Divider,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import Loader from "../../Component/Loader/Loader";
import AutoCompleteDropdown from "../../Component/Dropdown/AutoCompleteDropdown";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetProductData, ProductData } from "./ProductSlice";

const ProductList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector(ProductData)?.getData;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(GetProductData());
  }, []);

  useEffect(() => {
    if (productList) setIsLoading(false);
  }, [productList]);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleView = (productId) => {
    navigate(`/cmi/productDetails/${productId}`);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Typography className="pageHeader">Product List</Typography>
      <Card>
        <Grid container sx={{ p: 2 }} spacing={2}>
          <Grid item sm={7}></Grid>
          <Grid item sm={5}>
            <Paper
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              {/* Optional dropdown or search filter can be added here */}
              <Box flexGrow={1}></Box>
              <Tooltip title="Refresh Products">
                <IconButton
                  color="primary"
                  sx={{ p: "10px" }}
                  onClick={handleRefresh}
                >
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
            </Paper>
          </Grid>

          <Grid item sm={12}>
            <Paper>
              <TableContainer sx={{ maxHeight: "65vh" }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}
                      >
                        Product ID
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}
                        align="center"
                      >
                        Minimum Order
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}
                        align="center"
                      >
                        Status
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {productList?.map((product) => (
                      <TableRow
                        key={product.id}
                        hover
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleView(product.id)}
                      >
                        <TableCell>{product.id}</TableCell>
                        <TableCell>{product.name}</TableCell>
                        <TableCell align="center">
                          {product.minimum_order}
                        </TableCell>
                        <TableCell align="center">{product.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default ProductList;
