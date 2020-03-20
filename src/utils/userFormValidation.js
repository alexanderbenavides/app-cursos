export function userFormValidation(item, property) {
  let validIpunt = false;
  let validFullForm = {};
  const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

  switch (property) {
    case "password":
      validIpunt = item === "" ? false : true;
      break;
    case "email":
      validIpunt = emailValid.test(item);
      break;
    case "fullForm":
      let lastname = validatorStringOnly(item, "", "lastname");
      let name = validatorStringOnly(item, "", "name");
      const error =
        !/^[a-zA-Z]+$/.test(name) ||
        !/^[a-zA-Z]+$/.test(lastname) ||
        !emailValid.test(item.email) ||
        item.password === "";
      validFullForm = {
        inputs: {
          name: !/^[a-zA-Z]+$/.test(name) ? "error__input" : "",
          lastname: !/^[a-zA-Z]+$/.test(lastname) ? "error__input" : "",
          email: !emailValid.test(item.email) ? "error__input" : "",
          password: item.password === "" ? "error__input" : ""
        },
        error
      };
      break;
    default:
      let res = "";
      item.split(" ").map(obj => {
        return (res += obj);
      });
      validIpunt = /^[a-zA-Z]+$/.test(res);
      break;
  }

  if (property !== "fullForm") {
    const errorInput = {
      error: "error__input"
    };
    const sucessfullInput = {
      error: ""
    };
    return validIpunt ? sucessfullInput : errorInput;
  }
  return validFullForm;
}

function validatorStringOnly(item, name, property) {
  item[property].split(" ").map(obj => {
    return (name += obj);
  });

  return name;
}
