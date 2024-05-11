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
const buttonIcons = {
  Done,
  Close,
};

const ApprovalCard = ({ data, meta, actions }) => {
  const [cardDef, setCardDef] = useState({
    variant: "Primary", //props.variant; //['Primary','Secondary',  'Success', 'Danger', 'Warning', 'Info', 'Light', 'Dark']
    header: "Header",
    title: "Title",
    image: "Image",
    body: { rows: [] },
    footer: { rows: [] },
    style: {},
    redirectUrl:"",
    localStorageKey:""
  });

  useEffect(() => {
    if (data) {
      setCardDef({
        variant: meta?.variant,
        title: data[meta?.title?.key],
        image: data[meta?.image?.key],
        header: data[meta?.header?.key],
        data: data,
        body: meta?.body,
        footer: meta?.footer,
        style: meta?.style,
        redirectUrl:meta?.redirectUrl,
        localStorageKey:meta?.localStorageKey
      });
    }
  }, [data, meta]);

  const onDetailsView=(url,storage)=>{
    debugger
    if(storage=="employeeId"){
      localStorage.setItem("employeeId", JSON.stringify(data?.id));
    }
    if(storage=="projectId"){
      localStorage.setItem("projectId", JSON.stringify(data?.id));
    }
    window.location.assign(`${url}/${data?.id}`);
  }
  
  return (
    <>
      <Card sx={{ mb: 3}} style={{cursor:"pointer"}}  onClick={()=>onDetailsView(cardDef?.redirectUrl, cardDef?.localStorageKey)}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: pink[500] }} aria-label="recipe">
              {cardDef?.header?.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={cardDef?.header}
          subheader="September 14, 2016"
        />
        {cardDef?.image&&<CardMedia
          component="img"
          height="150"
          width="98%"
          style={{paddingRight:"5px",paddingLeft:"5px"}}
          image={cardDef?.image}
          alt="Paella dish"
        />}
        <CardContent>
          {cardDef?.body?.rows?.map((row) => {
            return (
              <Grid container spacing={2}>
                {row?.cols?.map((col) => {
                  
                  if (col?.type === "button") {
                    return (
                      <Grid
                        item
                        sm={col?.sm ? col?.sm : ""}
                        sx={col?.style ? col?.style : ""}
                      >
                        <Button
                          className={col?.class}
                          size={col?.size}
                          color={col?.color}
                          onClick={() =>
                            actions[col.function](cardDef?.data[col.key])
                          }
                        >
                          {col?.label} {getButtonIcon(col?.icon)}
                        </Button>
                      </Grid>
                    );
                  } else {
                    return (
                      <Grid item sm={col?.sm ? col?.sm : {}} sx={col?.style}>
                        <Typography
                          variant="body2"
                          sx={{ mt: 1 }}
                          color="text.secondary"
                        >
                          <b>{col?.label} </b> :{cardDef?.data[col?.key]}
                        </Typography>
                      </Grid>
                    );
                  }
                })}
              </Grid>
            );
          })}
        </CardContent>
        {cardDef?.footer?.rows?.length > 0 ? (
          <CardActions disableSpacing>
            {cardDef?.footer?.rows?.map((row) => {
              return (
                <Grid container spacing={2}>
                  {row?.cols?.map((col) => {
                    if (col?.type === "button") {
                      return (
                        <Grid
                          item
                          sm={col.sm ? col.sm : {}}
                          sx={col.style ? col.style : {}}
                        >
                          <Button
                            className={col.class}
                            size={col.size}
                            color={col.color}
                            onClick={() =>
                              actions[col.function](cardDef.data[col.key])
                            }
                          >
                            {col.label} {getButtonIcon(col.icon)}
                          </Button>
                        </Grid>
                      );
                    } else {
                      return (
                        <Grid item sm={col.style ? col.style : {}} sx={col.sx}>
                          <Typography
                            variant="body2"
                            sx={{ mt: 1 }}
                            color="text.secondary"
                          >
                            <b>{col.label} </b> :{cardDef.data[col.key]}
                          </Typography>
                        </Grid>
                      );
                    }
                  })}
                </Grid>
              );
            })}
          </CardActions>
        ) : (
          <div></div>
        )}
      </Card>
    </>
  );
};

function getButtonIcon(type) {
  const Icon = buttonIcons[type];
  return <Icon />;
}

export default ApprovalCard;
