import React from "react";
import { Switch, Popover } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
class UsersList extends React.Component {
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
                      onClick={() =>
                        this.props.triggerParentUpdate(item, item.active, i)
                      }
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
                            onClick={() =>
                              this.props.triggerParentUpdate(item, "delete", i)
                            }
                          />
                          <EditOutlined
                            value={item}
                            onClick={() =>
                              this.props.triggerParentUpdate(item, "update", i)
                            }
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
