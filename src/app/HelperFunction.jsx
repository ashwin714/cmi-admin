import moment from "moment";

export const LettersRegex = "^[A-Za-z]{1}[A-Za-z ]*$";
export const PercentileRegex = "^[0-9.]*$";
export const AllForamtText = "/^[a-zA-Z0-9!@#$%^&*)(+=._-]{6,}$/g";
export const maxLenghtRegex = 100;

export const LettersErrMsg =
  "It should contain only letters with space character. First character must be letter.";
export const PercentileErrMsg =
  "It should contain only digits with dot ( '.' ) character.";

// Get Formatted date in any Format
export const GetFormattedDate = (dateString, formatString = "DD-MM-YYYY") => {
  if (dateString) {
    return moment(dateString).format(formatString);
  } else {
    return null;
  }
};

export const ConnectorStyleProps = {
  disabledColor: "#bdbdbd",
  activeColor: "#ed1d24",
  completedColor: "#a10308",
  size: 1,
  stepSize: "2em",
  style: "solid",
};

export const StepStyleDTO = {
  activeBgColor: "#ed1d24",
  activeTextColor: "#ffffff",
  completedBgColor: "#a10308",
  completedTextColor: "#ffffff",
  inactiveBgColor: "#e0e0e0",
  inactiveTextColor: "#ffffff",
  size: "2em",
  circleFontSize: "1rem",
  labelFontSize: "0.875rem",
  borderRadius: "50%",
  fontWeight: 500,
};

export const arrayToObject = (item) => {
  item?.map((feilds) => {
   return feilds;
  });
};

export const convertArryToObject = (obj) => {
  //debugger;
  var str = [];
  for (var p in obj)
    if (obj.hasOwnProperty(p)) {
      str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    }
  return str.join("&");
};
export const convertSingleObject = (data) => {
  let finalObj = {};

  for (let i = 0; i < data.length; i++) {
    Object.assign(finalObj, data[i]);
  }
  return finalObj;
};

export const splitAndGet = (textToSplit, spliter, getIndex) => {
 if(textToSplit && spliter && (getIndex >= 0)){
  return textToSplit.split(spliter)[getIndex];
 }
 return '';
}

export const replace = (data, replace, replaceWith) => {
  if(data && replace && replaceWith){
   return data.replaceAll(replace, replaceWith);
  }
  return '';
 }

export const joinObject = (obj, stringToJoin) => {
  var result = Object.values(obj).join(stringToJoin);
  return result;
}

export const sort = (data, key) => {
  if(data && key){
    return data.sort((a, b) => (a[key] < b[key]) ? 1 : -1);
  }
  return [];
}

export const replaceAll = (data, key) =>{
  if(data && key){
    return data.replace(/,@,|_/g, key)
  }
  return '';
}

/**
 * @param {array} data - Array to check if
 * @param {String} key -  Key to lookup in data
 * This function is use to check if array of string contains provided String
 */
export const contains = (data, key) =>{
  if(data && key){

    return data.indexOf(key) !== -1
  }
  return false;
}

export const ifUserHasPermission = (permission) => {
  const userDetailsJson = localStorage.getItem("userDetail");
  const userDetails = JSON.parse(userDetailsJson);
  if(userDetails && permission){
    return userDetails?.permissions.indexOf(permission) !== -1
  }
  return false;
}

export const ifUserHasPermissions = (permissions) => {
  const userDetailsJson = localStorage.getItem("userDetail");
  const userDetails = JSON.parse(userDetailsJson);
  if(userDetails && permissions){
    return findCommonElement(userDetails.permissions, permissions);
  }
  return false;
}

// export const ifUserHasAppRight = (appRight) => {
  
//   const userDetailsJson = localStorage.getItem("userDetail");
//   const userDetails = JSON.parse(userDetailsJson);
//   if(userDetails && appRight){
//     return userDetails?.appRight === appRight;
//   }
//   return false;
// }

export const findCommonElement = (array1, array2) => {
  for(let i = 0; i < array1.length; i++) {
      for(let j = 0; j < array2.length; j++) {
          if(array1[i] === array2[j]) {
              return true;
          }
      }
  }
  return false;
}



// Date utils -----------------------------------

export const getNextDateRange = (days) => {
  var currentDate = new Date();
  var toDate = new Date();
  toDate.setDate(currentDate.getDate() + parseInt(days));
  return [GetFormattedDate(currentDate), GetFormattedDate(toDate)];
}


export const getPreviousDateRange = (days) => {
  var currentDate = new Date();
  var toDate = new Date();
  toDate.setDate(currentDate.getDate() - parseInt(days));
  return [GetFormattedDate(currentDate), GetFormattedDate(toDate)];
}