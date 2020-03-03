import React from "react";
import { Redirect } from "react-router-dom";
// import RegisterForm from "../../../components/Admin/RegisterForm";
import LoginForm from "../../../components/Admin/LoginForm";
import { getAccessTokenApi } from "../../../api/auth";
import "./SignIn.scss";

class SignIn extends React.Component {
  render() {
    if (getAccessTokenApi()) {
      return <Redirect to="/admin" />;
    }
    return (
      <div className="sign__in">
        <LoginForm></LoginForm>
      </div>
    );
  }
}

export default SignIn;
