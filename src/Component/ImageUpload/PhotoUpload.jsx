import React, { useState } from "react";
import ImgLogo from '../../Assets/Images/logo.png'
//import { UploadDocument,DocumentData } from "../../CommonApp/Document/features/DocumentSlice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
//import { apiUrl } from "../../../features/Network/ApiCall";

var apiUrl="";
const fileTypes = ["JPEG", "JPG", "PNG", ];
export default function PhotoUpload() {
  const dispatch = useDispatch();
  //const uploadDocumentData = useSelector(DocumentData)?.uploadDocumentData;
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [isApi, setIsApi]=useState(false);

  useEffect(()=>{
    console.log(image,"imageimage");
  },[image]);
  // useEffect(()=>{
    
  //   if(profilePreview?.length){
  //     setImage({
  //       preview:profilePreview,
  //       raw: profilePreview
  //     });   
  //   }
    
  // },[profilePreview,image]);
  

  const handleChange = e => {
      var FormData = require('form-data');
      var fileData = new FormData();
      fileData.append("file", e?.target?.files[0])
      var data={
        fileData:fileData,
        id:11
      }
      //setProfileImage(e.target.files[0]);
      setImage({
        preview: URL.createObjectURL(e?.target?.files[0]),
        raw: e?.target?.files[0]
      });
      //dispatch(UploadDocument(data));
  };

 

  return (
    <div style={{textAlign:"center"}}>
      <label htmlFor="upload-button">
        {image?.preview ? (
          <><img target src={`${apiUrl}/scholarship/viewimage?fileName=${image?.preview}&documentType=11`} style={{borderRadius:"50%", boxShadow:"0px 1px 5px", cursor:"pointer" }} alt="P" width="100" height="100" className="" /><br/>
          <label style={{fontWeight:"bold"}}>Profile Image</label>
          </>
        ) : (
          <>
            
            <img src={ImgLogo} alt="Upload Profile Photo" width="100" height="100" className=""/><br/>
            <label style={{fontWeight:"bold"}}>Upload Profile Image</label>
          </>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        accept="image/png, image/gif, image/jpeg"
        onChange={handleChange}
        multiple
      />      
    </div>
  );
}