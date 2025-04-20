import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  Divider,
} from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "./ConfirmDialog";

const AttachmentPopup = ({
  open,
  onClose,
  attachments = [],
  textKey = "name",
  urlKey = "url",
  idKey = "id",
  onDelete,
}) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState(null);

  const handleDeleteClick = (attachment) => {
    setSelectedAttachment(attachment);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log("selectedAttachment", selectedAttachment);
    if (onDelete && selectedAttachment) {
      onDelete(selectedAttachment);
    }
    setConfirmOpen(false);
    setSelectedAttachment(null);
  };

  return (
    <>
      <ConfirmDialog
        isOpen={confirmOpen}
        title="Delete Attachment"
        message="Are you sure you want to delete this file? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />

      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle
          sx={{
            backgroundColor: "#003952",
            color: "white",
            padding: "16px 24px",
          }}
        >
          Attachments
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent
          sx={{
            minHeight: "400px",
            maxHeight: "400px",
            overflowY: "auto",
            padding: "16px",
          }}
        >
          <List sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto" }}>
            {attachments.map((attachment, index) => (
              <React.Fragment key={attachment[idKey] || index}>
                <ListItem
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
                      <DeleteIcon />
                    </IconButton>
                  }
                  sx={{
                    borderBottom: "1px solid #ddd",
                    padding: "8px 16px",
                  }}
                >
                  <a
                    href={attachment[urlKey]}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#003952",
                      textDecoration: "none",
                      flexGrow: 1,
                    }}
                  >
                    <ListItemIcon>
                      <AttachFileIcon sx={{ color: "#f57c00" }} />
                    </ListItemIcon>
                    <ListItemText primary={attachment[textKey]} />
                  </a>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AttachmentPopup;
