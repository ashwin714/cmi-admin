import moment from "moment";

export const LettersRegex = "^[A-Za-z]{1}[A-Za-z ]*$";
export const PercentileRegex = "^[0-9.]*$";
export const AllForamtText="/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g"
export const maxLenghtRegex = 100;

export const LettersErrMsg = "It should contain only letters with space character. First character must be letter.";
export const PercentileErrMsg = "It should contain only digits with dot ( '.' ) character.";

// Get Formatted date in any Format
export const GetFormattedDate = (
  dateString,
  formatString = "DD-MM-YYYY"
) => {
  if (dateString) {
    return moment(dateString).format(formatString);
  } else {
    return null;
  }
};
export const ConvertDate = (
  dateString,
  formatString = "YYYY-MM-DD"
) => {
  if (dateString) {
    return moment(dateString).format(formatString);
  } else {
    return null;
  }
};
export const truncateText=(source, size)=> {
  return source?.length > size ? source?.slice(0, size - 1) + "." : source;
}
export const ConnectorStyleProps = {
  disabledColor: "#bdbdbd",
  activeColor: "#ed1d24",
  completedColor: "#a10308",
  size: 1,
  stepSize: "2em",
  style: "solid"
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
  fontWeight: 500
};