import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  NAME,
  LAST_NAME,
  ROLE,
} from "../../../utils/constants";
import { signInApi } from "../../../api/user";
function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      notification["warning"]({
        message: "Todos los campos son obligatorios.",
      });
      return true;
    }

    // eslint-disable-next-line
    const emailValid = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!emailValid.test(email)) {
      notification["warning"]({
        message: "Ingrese un correo válido.",
      });
    }

    const inputs = {
      email: email,
      password: password,
    };

    const { data } = await signInApi(inputs);

    const result = data;
    if (result.message) {
      notification["error"]({
        message: result.message,
      });
    } else {
      const { accessToken, refreshToken, name, lastname, role } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      localStorage.setItem(NAME, name);
      localStorage.setItem(LAST_NAME, lastname);
      localStorage.setItem(ROLE, role);

      notification["success"]({
        message: "Login correcto.",
      });

      window.location.href = "#/admin";
    }
  };
  return (
    <div className="sign__in__form">
      <Form className="login-form">
        <Form.Item>
          <Input
            type="email"
            name="email"
            placeholder="Correo electronico"
            className="login-form__input"
            onChange={handleEmailChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="login-form__input"
            onChange={handlePasswordChange}
          />
        </Form.Item>
        <Form.Item className="btn__container">
          <Button
            htmlType="submit"
            className="login-form__button"
            onClick={handleLogin}
          >
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default LoginForm;
