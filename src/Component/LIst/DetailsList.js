import React, { useEffect, useState } from "react";
import { pink } from "@mui/material/colors";
import { FaCheck, FaTimes, FaUserAlt, FaRegListAlt } from "react-icons/fa";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Avatar, CardHeader, CardMedia, Grid, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Close, Done } from "@mui/icons-material";
import { ReadData } from "../../Features/CommonFunction/ReadData";
const buttonIcons = {
  Done,
  Close,
};

const DetailsList = ({ data, meta }) => {
  const [cardDef, setCardDef] = useState({
    variant: "Primary", //props.variant; //['Primary','Secondary',  'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark']
    header: "Header",
    title: "Title",
    image: "Image",
    body: { rows: [] },
    footer: { rows: [] },
    style: {},
    redirectUrl: "",
  });

  useEffect(() => {
    console.log(data, meta, "data meta");
    if (data) {
      setCardDef({
        variant: meta.variant,
        title: data[meta?.title?.key],
        image: data[meta?.image?.key],
        header: data[meta?.header?.key],
        data: data,
        body: meta?.body,
        footer: meta?.footer,
        style: meta?.style,
        redirectUrl: meta?.redirectUrl,
      });
    }
  }, [data, meta]);

  const onDetailsView = (url) => {
    window.location.assign(`${url}/${data?.id}`);
  };
  return (
    <>
      {/* <Grid container spacing={1}>         */}
      <Grid item sm={6}>
        {cardDef?.body?.rows1?.map((item) => {
          return (
            <Grid container spacing={1}>
              <Grid item sm={item?.sm} style={item?.style} >
                {item?.label}
              </Grid>
              <Grid item sm={item?.sm} style={item?.style} >
                {cardDef?.data[item?.key]}
              </Grid>
            </Grid>
          );
        })}
        </Grid>
        <Grid item sm={6}>
        {cardDef?.body?.rows2?.map((item) => {
          return (
            <Grid container spacing={1}>
              <Grid item sm={item?.sm} style={item?.style} >
                {item?.label}
              </Grid>
              <Grid item sm={item?.sm} style={item?.style} >
                {/* {cardDef?.data[item?.key]} */}
                {ReadData(data, item)}
              </Grid>
            </Grid>
          );
        })} 
         </Grid> 
       
    </>
  );
};

export default DetailsList;
