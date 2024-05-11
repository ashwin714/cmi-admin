import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import RoutingPath from "./RoutingPath";



const Routing = () => {
  // const styles = {
  //   contentDiv: {
  //     display: "flex",
  //   },
  //   contentMargin: {
  //     marginLeft: "0px",
  //     marginTop:"65px",
  //     width: "100%",
  //   },
  // };

  // We have designed this Component with Row, Col Layout and placed Header,
  // Side Menu and Routing as per our requirement.
  return (
    <Router>
      {/* <>       
        <Header></Header>

        <div style={styles.contentDiv}>
          <SideNavigation></SideNavigation>
          <div style={styles.contentMargin}>
          <Container maxWidth="lg" className="garyBackground" sx={{p:2, pt:1, mt:0}} > */}
            <RoutingPath></RoutingPath>            
          {/* </Container>
          </div>
        </div>
      </> */}
    </Router>
  );
};

export default Routing;