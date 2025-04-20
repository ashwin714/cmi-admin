import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import {
  Card,
  Grid,
  Typography,
  Button,
  Chip,
  Stack,
  Stepper,
  Step,
  StepLabel,
  Divider,
  Avatar,
  Paper,
  Tooltip,
  Box,
  Link,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Check from "@mui/icons-material/Check";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DeliveryDiningIcon from "@mui/icons-material/DeliveryDining";
import { ShoppingCart } from "@mui/icons-material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../Component/Loader/Loader";
import ToastAlert from "../../Component/Alert/ToastAlert";
import AttachmentPopup from "../../Component/Popup/AttachmentsPopup";
import DeleteIcon from "@mui/icons-material/Delete";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import {
  DeleteAttachmentById,
  GetAttachmentsById,
  GetOrderDataById,
  OrderData,
  UpdateStatus,
  UploadAttachments,
} from "./OrderSlice";
import ConfirmDialog from "../../Component/Popup/ConfirmDialog";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#4caf50",
      height: 2,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#4caf50",
      height: 2,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 2,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 30,
  height: 30,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#4caf50",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#4caf50",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className, icon } = props;
  const icons = {
    1: <ShoppingCart />,
    2: <AddShoppingCartIcon />,
    3: <LocalShippingIcon />,
    4: <DeliveryDiningIcon />,
  };
  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(icon)]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  active: PropTypes.bool,
  className: PropTypes.string,
  completed: PropTypes.bool,
  icon: PropTypes.node,
};

const steps = ["Order Placed", "Order Accepted", "Dispatched", "Delivered"];

export default function OrderDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const ordersDetails = useSelector(OrderData)?.getOrderDataById;
  const attachments = useSelector(OrderData)?.attachments;

  const [orderActive, setOrderActive] = useState(-1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    dispatch(GetOrderDataById(id));
    dispatch(GetAttachmentsById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (ordersDetails) {
      const statusMap = {
        "Order Placed": 0,
        "ORDER ACCEPTED": 1,
        DISPATCHED: 2,
        DELIVERED: 3,
      };
      setOrderActive(statusMap[ordersDetails.status] ?? -1);
      setIsLoading(false);
      setOrderStatus(ordersDetails.status);
    }
  }, [ordersDetails]);

  const handleViewProduct = (productId) => {
    window.location.assign(`/cmi/order/productDetails/${productId}/${id}`);
  };

  const handleUpdateOrderStatus = async (status, stepper) => {
    setIsLoading(true);
    await dispatch(UpdateStatus({ status, id }));
    setOrderActive(stepper);
    setOrderStatus(status);
    setIsLoading(false);
    ToastAlert(`${status} Successfully`, `success`);
  };

  const handleFileChange = async (event) => {
    setIsLoading(true);
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
    try {
      await dispatch(UploadAttachments({ data: { id, files } })).unwrap();
      dispatch(GetAttachmentsById(id));
      setOrderActive(2);
    } catch (error) {
      ToastAlert("Upload failed", "error");
    }
    setIsLoading(false);
  };

  const handleDelete = async (attachment) => {
    try {
      await dispatch(
        DeleteAttachmentById({ id: attachment.id, orderId: id })
      ).unwrap();
      dispatch(GetAttachmentsById(id));
    } catch (error) {
      ToastAlert("Failed to delete attachment", "error");
    }
  };

  const handleDeleteClick = (attachment) => {
    setSelectedAttachment(attachment);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("selectedAttachment", selectedAttachment);
    if (handleDelete && selectedAttachment) {
      handleDelete(selectedAttachment);
    }
    setConfirmOpen(false);
    setSelectedAttachment(null);
  };

  return (
    <>
      {isLoading && <Loader />}
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Attachment"
        message="Are you sure you want to delete this file? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
      <AttachmentPopup
        open={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        attachments={attachments}
        textKey="url"
        urlKey="url"
        id="id"
        onDelete={handleDelete}
      />
      <Typography className="pageHeader" style={{ padding: "0px 10px" }}>
        <Button
          onClick={() => window.location.assign("/cmi/order")}
          variant="text"
        >
          <ArrowBackIcon />
        </Button>
        Order Summary
      </Typography>

      <Grid container spacing={2} sx={{ minHeight: "100vh" }}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3, height: "100%" }}>
            <Stack spacing={2}>
              <Stepper
                alternativeLabel
                activeStep={orderActive}
                connector={<ColorlibConnector />}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel StepIconComponent={ColorlibStepIcon}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Divider sx={{ my: 1 }} />
              <Stack spacing={1}>
                <Typography variant="body2">
                  <b>Products:</b> {ordersDetails?.products?.length || 0}
                </Typography>
              </Stack>

              <Box sx={{ maxHeight: "400px", overflowY: "auto" }}>
                <Stack spacing={1}>
                  {ordersDetails?.products?.map((item) => (
                    <Tooltip
                      title="Click to view product details"
                      key={item?.id}
                      placement="top"
                    >
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 3,
                          cursor: "pointer",
                          bgcolor: "#f9f9f9",
                          border: "1px solid #eee",
                          borderRadius: 2,
                          boxShadow: 1,
                        }}
                        onClick={() => handleViewProduct(item?.id)}
                      >
                        <Avatar
                          src={item?.thumbnailPath}
                          variant="rounded"
                          sx={{ width: 60, height: 60 }}
                        />
                        <Stack spacing={0.5} sx={{ flex: 1 }}>
                          <Typography variant="body1" fontWeight={600}>
                            {item?.name}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={2}
                            sx={{ flexWrap: "wrap" }}
                          >
                            <Typography variant="caption">
                              Color: <strong>{item?.color}</strong>
                            </Typography>
                            <Typography variant="caption">
                              Size: <strong>{item?.size}</strong>
                            </Typography>
                            <Typography variant="caption">
                              Material: <strong>{item?.material}</strong>
                            </Typography>
                            <Typography variant="caption">
                              Qty: <strong>{item?.orderQuantity}</strong>
                            </Typography>
                          </Stack>
                        </Stack>
                      </Paper>
                    </Tooltip>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Card>
        </Grid>

        {/* // Right Panel starts */}

        <Grid item xs={12} md={4}>
          <Card sx={{ p: 2 }}>
            {/* Header Section */}
            <Box display="flex" alignItems="center" gap={1}>
              <Typography variant="h6">{id}</Typography>

              {ordersDetails?.orderHasInvoice && (
                <Link
                  href={ordersDetails?.orderPdfPath || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="none"
                  sx={{ display: "flex", alignItems: "center", }}
                >
                  <PictureAsPdfIcon fontSize="small" sx={{ mr: 0.5, color: "red"  }} />
                  <Typography sx={{  fontSize: 12, mr: 0.5 }}>
                    Invoice
                  </Typography>
                </Link>
              )}

              {orderActive === -1 && (
                <Chip
                  label="Cancelled"
                  size="small"
                  variant="outlined"
                  sx={{
                    backgroundColor: "pink",
                    borderColor: "red",
                    color: "red",
                    fontWeight: 600,
                  }}
                />
              )}
            </Box>

            <Divider sx={{ my: 1 }} />

            {/* Action Buttons */}
            <Stack spacing={1} sx={{ mt: 1 }}>
              {orderActive === 0 && (
                <>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleUpdateOrderStatus("ORDER ACCEPTED", 1)}
                  >
                    Accept
                  </Button>
                  <Button
                    size="small"
                    variant="outlined"
                    onClick={() => handleUpdateOrderStatus("CANCEL", -1)}
                  >
                    Cancel
                  </Button>
                </>
              )}
              {orderActive === 2 && (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleUpdateOrderStatus("DELIVERED", 3)}
                >
                  Mark as Delivered
                </Button>
              )}
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Documents</Typography>

            {/* Upload Docs */}
            {orderActive >= 1 && orderActive < 3 && (
              <>
                <label htmlFor="attach-docs">
                  <input
                    type="file"
                    id="attach-docs"
                    multiple
                    hidden
                    onChange={handleFileChange}
                  />
                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    component="span"
                  >
                    <UploadFileIcon fontSize="small" /> Upload
                  </Button>
                </label>
              </>
            )}
            {/* Documents List */}
            {attachments.length > 0 ? (
              <List dense>
                {attachments.map((attachment) => (
                  <ListItem
                    key={attachment.id}
                    disableGutters
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteClick(attachment);
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                    sx={{
                      px: 1,
                      py: 0.5,
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <ListItemText
                      primary={
                        <Link
                          href={attachment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="body2"
                          underline="hover"
                          sx={{ wordBreak: "break-all" }}
                        >
                          {attachment.fileName.length > 35
                            ? `${attachment.fileName.slice(0, 35)}...`
                            : attachment.fileName}
                        </Link>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No attachments available.
              </Typography>
            )}

            {/* Shipping Address */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Shipping Address</Typography>
            {ordersDetails?.shippingAddress ? (
              <Box
                sx={{
                  maxHeight: 200,
                  overflowY: "auto",
                  border: "1px solid #e0e0e0",
                  borderRadius: 2,
                  p: 2,
                  backgroundColor: "#fafafa",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#ccc",
                    borderRadius: "3px",
                  },
                }}
              >
                <Stack spacing={1}>
                  <Typography variant="body2">
                    <strong>Plot No:</strong>{" "}
                    {ordersDetails.shippingAddress.plotNo || "-"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Building:</strong>{" "}
                    {ordersDetails.shippingAddress.buildingPlotName || "-"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Address Line 1:</strong>{" "}
                    {ordersDetails.shippingAddress.addressLine1 || "-"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Landmark:</strong>{" "}
                    {ordersDetails.shippingAddress.landmark || "-"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>District:</strong>{" "}
                    {ordersDetails.shippingAddress.cdata?.district || "-"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>State:</strong>{" "}
                    {ordersDetails.shippingAddress.cdata?.state || "-"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Country:</strong>{" "}
                    {ordersDetails.shippingAddress.cdata?.country || "-"}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Pincode:</strong>{" "}
                    {ordersDetails.shippingAddress.cdata?.pincode || "-"}
                  </Typography>
                </Stack>
              </Box>
            ) : (
              <Typography variant="body2" color="textSecondary">
                No shipping address available.
              </Typography>
            )}

            {/* Order Info */}
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Other</Typography>
            <Box
              sx={{
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                p: 2,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Stack spacing={1}>
                <Typography variant="body2">
                  <strong>Remark:</strong> {ordersDetails?.remark || "-"}
                </Typography>
                <Typography variant="body2">
                  <strong>Contact Number:</strong>{" "}
                  {ordersDetails?.contactNumber || "-"}
                </Typography>
                <Typography variant="body2">
                  <strong>GST No:</strong> {ordersDetails?.gstNo || "-"}
                </Typography>
                <Typography variant="body2">
                  <strong>Drug License No:</strong>{" "}
                  {ordersDetails?.drugLicenseNo || "-"}
                </Typography>
                <Typography variant="body2">
                  <strong>Created On:</strong>{" "}
                  {ordersDetails?.createdOn
                    ? new Date(ordersDetails.createdOn).toLocaleString()
                    : "-"}
                </Typography>
              </Stack>
            </Box>
          </Card>
        </Grid>

        {/* RightPanel End */}
      </Grid>
    </>
  );
}
