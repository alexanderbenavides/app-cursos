import React from "react";
import { Form, Input, Button, notification } from "antd";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  NAME,
  LAST_NAME,
  ROLE
} from "../../../utils/constants";
import { signInApi } from "../../../api/user";
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.state = {
      email: "",
      password: ""
    };
  }
  handleEmailChange = e => {
    this.setState({ email: e.target.value });
  };
  handlePasswordChange = e => {
    this.setState({ password: e.target.value });
  };
  handleLogin = async e => {
    e.preventDefault();
    const inputs = {
      email: this.state.email,
      password: this.state.password
    };
    const { data } = await signInApi(inputs);
    const result = data;

    if (result.message) {
      notification["error"]({
        message: result.message
      });
    } else {
      const { accessToken, refreshToken, name, lastname, role } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      localStorage.setItem(NAME, name);
      localStorage.setItem(LAST_NAME, lastname);
      localStorage.setItem(ROLE, role);

      notification["success"]({
        message: "Login correcto."
      });

      window.location.href = "/admin";
    }
  };
  render() {
    return (
      <div className="sign__in__form">
        <Form className="login-form">
          <Form.Item>
            <Input
              type="email"
              name="email"
              placeholder="Correo electronico"
              className="login-form__input"
              onChange={this.handleEmailChange}
            />
          </Form.Item>
          <Form.Item>
            <Input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="login-form__input"
              onChange={this.handlePasswordChange}
            />
          </Form.Item>
          <Form.Item className="btn__container">
            <Button
              htmlType="submit"
              className="login-form__button"
              onClick={this.handleLogin}
            >
              Ingresar
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default LoginForm;
