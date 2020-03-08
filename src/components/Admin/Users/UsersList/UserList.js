import React from "react";
import { Switch, Popover } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
class UsersList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      visiblePopover: false,
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
  handleVisibleChange = visiblePopover => {
    this.setState({ visiblePopover });
  };
  render() {
    this.state.userData = this.props.userListData;
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
          <div></div>
        </div>
        <div className="table__grid__container">
          {this.state.userData.map((item, i) => {
            return (
              <div className="table__grid__body" key={i}>
                <div className="last__name">
                  <div className="user__name">
                    <span> {i + 1}. </span>
                    <span> {item.lastname} </span>
                  </div>
                </div>
                <div className="name">
                  <span>{item.name}</span>
                </div>
                <div className="email">
                  <span>{item.email}</span>
                </div>
                <div className="role">
                  <span>{item.role}</span>
                </div>
                <div className="active">
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
                <div className="action">
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
