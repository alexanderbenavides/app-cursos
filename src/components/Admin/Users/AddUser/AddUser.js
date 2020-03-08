import React from "react";
import { Form, Input, Button, Select } from "antd";
const layout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};

class AddUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  onFinish = values => {
    console.log("Success:", values);
  };

  onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  handleChangeAdmin(value) {
    console.log(`selected ${value}`);
  }
  render() {
    const { Item } = Form;
    const { Option } = Select;

    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{
          remember: true
        }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Item
          label="Nombres"
          name="name"
          rules={[
            {
              required: true,
              message: "¡Por favor, ingrese su nombre!"
            }
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Apelllidos"
          name="lastname"
          rules={[
            {
              required: true,
              message: "¡Por favor, ingrese sus apellidos!"
            }
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "¡Por favor, ingrese su correo!",
              type: "email"
            }
          ]}
        >
          <Input />
        </Item>
        <Item
          label="Contraseña"
          name="password"
          rules={[
            {
              required: true,
              message: "¡Por favor, ingrese su contraseña!"
            }
          ]}
        >
          <Input.Password />
        </Item>
        <Item
          label="Rol"
          name="role"
          rules={[
            {
              required: true,
              message: "¡Por favor, ingrese su rol!"
            }
          ]}
        >
          <Select
            placeholder="Selecciona un rol"
            onChange={this.handleChangeAdmin}
          >
            <Option value="admin">Administrador</Option>
            <Option value="editor">Gestor de contenido</Option>
            <Option value="reviwer">Revisor</Option>
          </Select>
        </Item>
        <Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
          <Button type="primary" htmlType="submit">
            Guardar
          </Button>
        </Item>
      </Form>
    );
  }
}

export default AddUser;
