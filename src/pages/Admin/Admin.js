import React from "react";
import { Popover } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getInfoUserApi } from "../../api/auth";
import "./Admin.scss";
class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  handleRemove = () => {
    console.log("Eliminar");
  };
  handleEdit = () => {
    console.log("Editar");
  };
  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  render() {
    const { name, lastname, role } = getInfoUserApi();
    return (
      <div className="admin__page">
        <div className="admin__page__title">Información del usuario</div>
        <div className="admin__page__grid">
          <div>
            <img
              src="http://alexanderbenavides.herokuapp.com/img/perfil.1055441c.jpg"
              alt="Not profile found"
              className="admin__page__img"
            />
          </div>
          <div className="admin__page__info">
            <span>Nombre: {name}</span>
            <span>Apellidos: {lastname}</span>
            <span>Rol: {role}</span>
          </div>
        </div>
        <Popover
          content={
            <div className="admin__page__iconspopover">
              <DeleteOutlined onClick={this.handleRemove} />
              <EditOutlined onClick={this.handleEdit} />
            </div>
          }
          title=""
          trigger="click"
          visible={this.state.visible}
          onVisibleChange={this.handleVisibleChange}
        >
          <MoreOutlined className="admin__page__iconmore"></MoreOutlined>
        </Popover>
      </div>
    );
  }
}

export default Admin;
