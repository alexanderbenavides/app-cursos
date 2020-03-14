import React from "react";
import { Switch, Popover } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: []
    };
  }

  handleStatus = (item, i) => {
    let userData = this.state.userData;
    userData[i].active = !item;
    this.setState({
      userData
    });
  };
  handleRemove = item => {
    console.log("Eliminar", item);
  };
  handleEdit = item => {
    console.log("editar", item);
  };

  render() {
    return (
      <div className="table__grid">
        <div className="table__grid__head">
          <div>
            <span> N° </span>
            <span> Apellidos </span>
          </div>
          <div>Nombres</div>
          <div>Correo</div>
          <div>Rol</div>
          <div>Estado</div>
          <div>Acción</div>
        </div>
        <div className="table__grid__container">
          {this.props.userListData.map((item, i) => {
            return (
              <div className="table__grid__body" key={i}>
                <div
                  className="first_tr_body text__responsive"
                  text-responsive="Apellidos"
                >
                  <div className="user__name">
                    <span> {i + 1}. </span>
                    <span> {item.lastname} </span>
                  </div>
                </div>
                <div className="text__responsive" text-responsive="Nombres">
                  <span>{item.name}</span>
                </div>
                <div className="text__responsive" text-responsive="Correo">
                  <span>{item.email}</span>
                </div>
                <div className="text__responsive" text-responsive="Rol">
                  <span>{item.role}</span>
                </div>
                <div
                  className="active text__responsive"
                  text-responsive="Estado"
                >
                  <span className="status">
                    <Switch
                      value={item}
                      onClick={() => this.handleStatus(item.active, i)}
                      checkedChildren="Activo"
                      unCheckedChildren="Inactivo"
                      checked={item.active}
                    />
                  </span>
                </div>
                <div
                  className="action text__responsive"
                  text-responsive="Acción"
                >
                  <span className="container__popover">
                    <Popover
                      content={
                        <div className="grid__iconspopover">
                          <DeleteOutlined
                            value={item}
                            onClick={() => this.handleRemove(item)}
                          />
                          <EditOutlined
                            value={item}
                            onClick={() => this.handleEdit(item)}
                          />
                        </div>
                      }
                      trigger="click"
                    >
                      <MoreOutlined></MoreOutlined>
                    </Popover>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UsersList;
