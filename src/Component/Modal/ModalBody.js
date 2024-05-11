import { DialogContent, DialogContentText } from "@mui/material";
import React from "react";

export const ModalBody = ({contents}) => {
  return (
    <>
      <DialogContent dividers>
        <DialogContentText>
          {contents}
        </DialogContentText>
      </DialogContent>
    </>
  );
};
