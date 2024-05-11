import { Button, DialogActions } from "@mui/material";
import React from "react";

export const ModalFooter = ({  onClose ,buttonLabel}) => {
  return (
    <DialogActions>
       <Button type="button" onClick={onClose} variant="contained" className="background-button">
        Cancel
      </Button>
      <Button type="submit"  variant="outlined" className="border-button">
        {buttonLabel==""?"Save":buttonLabel}
      </Button>
     
    </DialogActions>
  );
};
