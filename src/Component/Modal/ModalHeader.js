import { Close } from '@mui/icons-material';
import { DialogTitle } from '@mui/material'
import React from 'react'

export const ModalHeader = ({ title, subTitle,onClose }) => {
  let closeImg = {cursor:'pointer', float:'right', marginTop: '5px', width: '20px'};
  return (
    <DialogTitle>{title}
      <span style={{ fontSize: "14px" }}>{subTitle}</span>
      <Close color='red[500]' style={closeImg} onClick={onClose}/>
      </DialogTitle>
  )
}
