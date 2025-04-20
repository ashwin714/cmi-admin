import React, { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { GetCustomerData, GetOrderData, OrderData } from "./OrderSlice";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import AutoCompleteDropdown from "../../Component/Dropdown/AutoCompleteDropdown";
import Loader from "../../Component/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { ShoppingCart } from "@mui/icons-material"; // You can choose any icon

const OrderList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orders = useSelector(OrderData)?.getData;
  const customerList = useSelector(OrderData)?.getCustomer;
  const [customer, setCustomer] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    dispatch(GetOrderData());
    dispatch(GetCustomerData());
  }, []);

  useEffect(() => {
    if (orders) setIsLoading(false);
  }, [orders]);

  const handleSearch = () => {
    dispatch(GetOrderData(customer));
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleView = (order) => {
    //navigate(`/order-details/${order.id}`);
    window.location.assign(`/cmi/orderDetails/${order.orderId}`);
  };

  const groupOrdersByDate = (orders) => {
    const grouped = {};
    orders?.forEach((order) => {
      const date = order.createdOn.split("T")[0];
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(order);
    });
    return Object.entries(grouped); // [ [date, [orders]], ... ]
  };

  const groupedOrders = groupOrdersByDate(orders);

  return (
    <>
      {isLoading && <Loader />}

      <Typography
        className="pageHeader"
        variant="h4"
        sx={{
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "16px",
        }}
      >
        <ShoppingCart sx={{ mr: 1 }} /> {/* Icon with right margin */}
        Order List
      </Typography>
      <Card>
        <Grid container sx={{ p: 2 }} spacing={2}>
          <Grid item sm={4}></Grid>
          <Grid item sm={3}></Grid>
          <Grid item sm={5}>
            <Paper
              component="form"
              sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
            >
              <AutoCompleteDropdown
                sx={{ ml: 1, flex: 1 }}
                width="250px"
                label="Customer"
                dataSet={customerList}
                getOptionLabel="name"
                selectedValue={customer}
                getOptionValue="id"
                onChange={setCustomer}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton sx={{ p: "10px" }} onClick={handleSearch}>
                <SearchIcon />
              </IconButton>
              <Tooltip title="Refresh Search and Filter">
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

          {/* Table Container with sticky header */}
          <Grid item sm={12}>
            <Paper elevation={3}>
              <TableContainer >
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}
                      >
                        Order ID
                      </TableCell>
                      <TableCell
                        sx={{ backgroundColor: "#f0f0f0", fontWeight: "bold" }}
                      >
                        Customer
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
                    {groupedOrders.map(([date, orders]) => (
                      <React.Fragment key={date}>
                        {/* Group Header Row */}
                        <TableRow>
                          <TableCell
                            colSpan={3}
                            sx={{
                              backgroundColor: "#e0e0e0",
                              fontWeight: 600,
                              py: 1.5,
                            }}
                          >
                            <Typography variant="subtitle2">
                              {new Date(date).toDateString()}
                            </Typography>
                          </TableCell>
                        </TableRow>

                        {/* Grouped Orders */}
                        {orders.map((order) => (
                          <TableRow
                            key={order.id}
                            hover
                            sx={{ cursor: "pointer" }}
                            onClick={() => handleView(order)}
                          >
                            <TableCell>{order.orderId}</TableCell>
                            <TableCell>{order.customerName}</TableCell>
                            <TableCell align="center">{order.status}</TableCell>
                          </TableRow>
                        ))}
                      </React.Fragment>
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

export default OrderList;
