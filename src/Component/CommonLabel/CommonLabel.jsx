import React from "react";
import "./CommonLabel.css";

const CommonLabel = ({ label, mandatory }) => {
  return (
    <span className="labelInsideField">
      {label}
      {mandatory && <span className="mandatory">*</span>}
    </span>
  );
};

export default CommonLabel;
