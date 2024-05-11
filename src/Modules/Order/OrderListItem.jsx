import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { GetFormattedDate } from '../../app/HelperFunction';


export default function OrderListItem({ ordersList }) {
  const handleOrderDetails = (orderId) => {
    window.location.assign(`/cmi/orderDetails/${orderId}`)
  }
  return (
    <Grid container sx={{ pl: 5, pt: 5, pr: 1 }} spacing={2}>
      <Grid sm={12}>
        <Stepper orientation="vertical">
          {ordersList.map((step, index) => (
            <Step key={step.createdOn} expanded>
              <StepLabel>{GetFormattedDate(step.createdOn)}</StepLabel>
              {step.order.map(order => (<StepContent>
                <Typography>
                  <div className='orderList' onClick={() => handleOrderDetails(order.orderId)}>
                    <div><b>{order.orderId}</b></div>
                    <div>{order.customerName}</div>
                    <div>{order.status}</div>
                  </div>
                </Typography>
              </StepContent>))}
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  );
}
