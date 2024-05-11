import React from "react";
import ReactLoading from "react-loading";

const Loader = () => (
    <div style={{width:"100%", position:"fixed", zIndex:"99999", bottom:"0px", top:"0px", left:"0px", right:"0px", background:"rgb(255 255 255 / 87%)"}}>
        <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}>
        <ReactLoading type={"spin"} color="#0171a3" />
        </div>
    </div>
);

export default Loader;
