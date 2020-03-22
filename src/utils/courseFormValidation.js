export function courseFormValidation(item, property) {
  let validIpunt = false;
  let validFullForm = {};
  switch (property) {
    case "fullForm":
      const error =
        item.title === "" ||
        item.content === "" ||
        item.duration_value === "" ||
        item.duration_value === null;
      validFullForm = {
        inputs: {
          title: item.title === "" ? "error__input-textarea" : "",
          content: item.content === "" ? "error__input-textarea" : "",
          duration_value:
            item.duration_value === "" || item.duration_value === null
              ? "error__input-textarea"
              : ""
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
