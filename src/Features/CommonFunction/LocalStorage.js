//import { apiUrl } from "../../features/Network/ApiCall";
export const clearLocalStorage=()=>{
    // const accessToken = localStorage.getItem("accessToken");
    // const accessTokenJson = JSON.parse(accessToken);  
    // var axios = require('axios'); 
    //   var config = {
    //     method: 'post',
    //     url: `${apiUrl}/scholarship/logout`,
    //     headers: { 
    //       'Content-Type': 'application/json',
    //       'Authorization': "Bearer " + accessTokenJson
    //     }
    //   };
    // axios(config)
    // .then(function (response) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("projectId");
        localStorage.removeItem("employeeId")
        localStorage.removeItem("appRight");
        sessionStorage.removeItem("isSession");
        window.location.assign('/')  
    // })
    // .catch(function (error) {
    //   console.log(error.response);
    //   if(error.response.status==401 || error.response.status==409){
    //     window.location.href="/"
    //   }
    // });
}