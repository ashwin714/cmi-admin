import { Typography } from "@mui/material";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.css";
export default function imageSlider(data) {
  return (
    <Carousel autoPlay  className="imageSlider">
      {data?.data?.map((item) => {
        return (
          <>
          <img key={item?.id} alt="" src={item?.url} />
          {item?.docName&&<Typography
                    variant="body2"
                    sx={{ mt: 1 }}
                    color="text.secondary"
                  >
                    Document Name : {item?.docName}
                  </Typography>}
                 {item?.number&& <Typography
                    variant="body2"
                    sx={{ mt: 1 }}
                    color="text.secondary"
                  >
                    Document Number : {item?.number}
                    
                  </Typography>}
          </>
          )
        ;
      })}
    </Carousel>
  );
}
