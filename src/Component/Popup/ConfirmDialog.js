import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning"; // You can use other icons
import CloseIcon from "@mui/icons-material/Close";

const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onCancel}
      maxWidth="xs" // Small box size
      PaperProps={{
        style: {
          borderRadius: 8, // even more rounded corners for modern look
          padding: "10px", // reduced padding
          backgroundColor: "#fff5e5", // background color for the dialog
        },
      }}
    >
      {/* <DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="body2"
            style={{ fontWeight: "bold", color: "#f57c00", fontSize: "14px" }}
          >
            {title}
          </Typography>
          <IconButton onClick={onCancel} size="small">
            <CloseIcon fontSize="small" />
          </IconButton>
        </div>
      </DialogTitle> */}

      <DialogContent
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", padding: "10px" }}>
          <WarningIcon
            style={{ fontSize: "30px", color: "#f57c00", marginBottom: "8px" }}
          />
          <Typography
            variant="body2"
            style={{ fontSize: "12px", color: "#333" }}
          >
            {message}
          </Typography>
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onCancel}
          variant="outlined"
          style={{ color: "#f57c00", fontSize: "12px", padding: "6px 12px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          style={{ fontSize: "12px", padding: "6px 12px" }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
