import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import { useDispatch, useSelector } from "react-redux";
import { GetOrderDataById, OrderData } from './OrderSlice';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import { ShoppingCart } from '@mui/icons-material';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import { Card, Chip, Divider, Grid, Typography ,Button} from '@mui/material';
import { useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4',
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18,
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor',
  },
}));

function QontoStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
}

QontoStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#4caf50', // Change the color to indicate success
      height: 3,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: '#4caf50', // Change the color to indicate success
      height: 3,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    backgroundColor: '#4caf50', // Change the color to indicate success
    color: '#fff', // Change the color of the icon to white
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
  }),
  ...(ownerState.completed && {
    backgroundColor: '#4caf50', // Change the color to indicate success
  }),
}));



function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ShoppingCart />,
    2: <AddShoppingCartIcon />,
    3: <LocalShippingIcon />,
    4: <DeliveryDiningIcon />
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

const steps = ['Order Placed', 'Order Accepted', 'Dispatched', 'Delivered'];

export default function OrderDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  //const orderId = id.match(/\d+$/)[0];
  // Function to group orders by creation date
  const ordersDetails = useSelector(OrderData)?.getOrderDataById;
  const [orderActive, setOrderACtive] = useState(0);
  useEffect(() => {
    dispatch(GetOrderDataById(id))
  }, []);
  useEffect(() => {
    if (ordersDetails) {
      if (ordersDetails?.status === "Order Placed") {
        setOrderACtive(0)
      } else if (ordersDetails?.status === "ORDER ACCEPTED") {
        setOrderACtive(1)
      } else if (ordersDetails?.status === "DISPATCHED") {
        setOrderACtive(2)
      } else if (ordersDetails?.status === "DELIVERED") {
        setOrderACtive(3)
      }
      console.log(ordersDetails, "ordersDetails")
    }
  }, [ordersDetails])
  const handleViewProduct = (id) => {
    window.location.assign(`/cmi/productDetails/${id}`)
  }
  return (
    <>
      <Typography className="pageHeader" style={{padding:"0px 10px"}}>
      <Button onClick={()=>window.location.assign('/cmi/order')} variant="text"><ArrowBackIcon/></Button>
      Order Details</Typography>
      <Card sx={{ pt: 2 }}>
        <Stack sx={{ width: '100%' }} spacing={4}>
          {/* <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper> */}
          <Stepper alternativeLabel activeStep={orderActive} connector={<ColorlibConnector />}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            <div style={{ width: "80%", margin: "0px auto", marginBottom: "20px" }}>
              <Divider><Chip label={`Products ${ordersDetails?.products.length}`} size="small" /></Divider>
              {ordersDetails?.products?.map((item) =>
                <div className='orderList' onClick={() => handleViewProduct(item?.id)}>
                  <Grid container >
                    <Grid item sm={2}>
                      <img src={item?.thumbnailPath} alt="product" style={{ height: "75px", width:"75px" }} />
                    </Grid>
                    <Grid item sm={10}>
                      <div style={{ widh: "100%", fontSize: "20px" }}><b>{item?.name}</b></div>
                      <div style={{ width: "40%", float: "left" }}><b>Color </b>: {item?.color}</div>
                      <div style={{ width: "60%", float: "left" }}><b>Size </b>: {item?.size}</div>
                      <div style={{ width: "40%", float: "left" }}><b>Material </b>: {item?.material}</div>
                      <div style={{ width: "60%", float: "left" }}><b>Qty </b>: {item?.orderQuantity}</div>
                    </Grid>
                  </Grid>
                </div>)}
            </div>
          </div>
        </Stack>
      </Card>
    </>
  );
}
