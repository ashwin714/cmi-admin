import React, { useState, useEffect } from 'react';
import { Card, Divider, Grid, IconButton, InputBase, Paper, Tooltip, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import { GetCustomerData, GetOrderData, OrderData } from './OrderSlice';
import OrderListItem from './OrderListItem';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import AutoCompleteDropdown from '../../Component/Dropdown/AutoCompleteDropdown';
import Loader from '../../Component/Loader/Loader';
const OrderList = () => {
    // State to hold your orders data
    const dispatch = useDispatch();

    // Function to group orders by creation date
    const orders = useSelector(OrderData)?.getData;
    const customerList = useSelector(OrderData)?.getCustomer;
    const [customer, setCustomer] = useState();
    const [isLoading, setIsLoading]=useState(false);

    function groupOrdersByDate(orders) {
        const groupedOrders = {};

        orders?.forEach(order => {
            const date = order.createdOn.split("T")[0]; // Extracting date part
            if (!groupedOrders[date]) {
                groupedOrders[date] = [];
            }
            groupedOrders[date].push(order);
        });

        // Convert object to array
        const result = Object.keys(groupedOrders).map(date => ({
            createdOn: date,
            order: groupedOrders[date]
        }));

        return result;
    }
    const groupedOrders = groupOrdersByDate(orders);
    // Mock data (replace with actual API call)
    useEffect(() => {
        setIsLoading(true);
        dispatch(GetOrderData());
        dispatch(GetCustomerData())
    }, []);
    useEffect(()=>{
        if(orders){
          setIsLoading(false)
        }
      },[orders])
    const handleSaerch = () => {

        dispatch(GetOrderData(customer))
    }
    const handleRefresh = () => {
        window.location.reload();
    }
    return (
        <>
         {isLoading&&<Loader/>}
            <Typography className="pageHeader">Order List</Typography>
            <Card>
                <Grid container sx={{ p: 2 }} spacing={2}>
                    <Grid item sm={4}></Grid>
                    <Grid item sm={3}></Grid>
                    <Grid item sm={5}>
                        <Paper
                            component="form"
                            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
                        >
                            <AutoCompleteDropdown

                                sx={{ ml: 1, flex: 1 }}
                                width="250px"
                                label="Category"
                                dataSet={customerList}
                                getOptionLabel="name"
                                selectedValue={customer}
                                getOptionValue="id"
                                onChange={setCustomer}
                            //isRequired
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton type="button" sx={{ p: '10px' }} aria-label="search" >
                                <SearchIcon onClick={handleSaerch} />
                            </IconButton>
                            <Tooltip title="Refresh Search and Filter">
                                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" onClick={handleRefresh} >
                                    <RefreshIcon />
                                </IconButton>
                            </Tooltip>
                        </Paper>
                    </Grid>
                    <Grid sm={12}>
                        <OrderListItem ordersList={groupedOrders} />
                    </Grid>
                </Grid>
            </Card>
        </>
    );

}

export default OrderList