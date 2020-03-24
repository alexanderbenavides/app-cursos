export function moduleFormValidation(item, property) {
  let validIpunt = false;
  let validFullForm = {};
  switch (property) {
    case "fullForm":
      const error = item.title === "" || item.content === "";
      validFullForm = {
        inputs: {
          title: item.title === "" ? "error__input-textarea" : "",
          content: item.content === "" ? "error__input-textarea" : ""
        },
        error
      };
      break;
    default:
      validIpunt = item === "" ? false : true;
      break;
  }
  if (property !== "fullForm") {
    const errorInput = {
      error: "error__input-textarea"
    };
    const sucessfullInput = {
      error: ""
    };
    return validIpunt ? sucessfullInput : errorInput;
  }
  return validFullForm;
}
