import React from "react";
import { Modal, notification } from "antd";
import {
  getUsersApi,
  signUpAdminApi,
  deleteUserApi,
  updateUserApi
} from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";
import { PlusCircleOutlined } from "@ant-design/icons";
import UserList from "../../../components/Admin/Users/UsersList";
import AddUser from "../../../components/Admin/Users//AddUser";
import "../../../scss/_tables.scss";
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      visiblePopover: false,
      userData: [],
      userAction: "",
      titleModal: "",
      itemToEdit: {}
    };
  }
  componentDidMount() {
    this.getAllUsers();
  }
  updateUser = (token, _id, data) => {
    updateUserApi(token, _id, data)
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: "Hubo problemas editando el usuario."
          });
        } else {
          this.getAllUsers();
          this.setState({
            isHidden: true
          });
          setTimeout(() => {
            this.setState({
              visible: false,
              isHidden: false
            });
          }, 1500);

          notification["success"]({
            message: response.data.message
          });
        }
      })
      .catch(() => {
        notification["error"]({
          message: "No se pudo editar el usuario."
        });
      });
  };

  handleAddUser = () => {
    this.setState({
      visible: true,
      userAction: "add",
      titleModal: "Crear usuario",
      itemToEdit: {
        name: "",
        lastname: "",
        email: "",
        role: "admin",
        active: false,
        password: ""
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  handleStateUser = (item, option) => {
    if (option === true || option === false) return;
    const titleModal =
      option === "update" ? "Actualizar usuario" : "Eliminar usuario";
    this.setState({
      visible: true,
      userAction: option,
      titleModal,
      itemToEdit: item
    });
  };
  handleAddUpdateUsers = (item, option) => {
    this.handleStateUser(item, option);
    if (option === true || option === false) {
      let token = getAccessTokenApi();
      const data = {
        active: !option
      };

      this.updateUser(token, item._id, data);
    }
  };
  getAllUsers = () => {
    const token = getAccessTokenApi();
    getUsersApi(token)
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          this.setState({ userData: response.data.users });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los usuarios por un error del servidor. Por favor,inténtelo más tarde."
        });
      });
  };
  AddupdateUser = (item, option) => {
    let token = getAccessTokenApi();
    if (option === "addForm") {
      signUpAdminApi(token, item)
        .then(response => {
          if (response?.status !== 200) {
            notification["warning"]({
              message: "Hubo problemas agregando el usuario."
            });
          } else {
            this.getAllUsers();
            this.setState({
              isHidden: true
            });
            setTimeout(() => {
              this.setState({
                visible: false,
                isHidden: false
              });
            }, 1500);

            notification["success"]({
              message: response.data.message
            });
          }
        })
        .catch(() => {
          notification["error"]({
            message: "No se pudo agregar el usuario."
          });
        });
    }
    if (option === "editForm") {
      this.updateUser(token, item._id, item);
    }
    if (option === "deleteForm") {
      deleteUserApi(token, item._id)
        .then(response => {
          if (response?.status !== 200) {
            notification["warning"]({
              message: "Hubo problemas eliminando el usuario."
            });
          } else {
            this.getAllUsers();
            this.setState({
              isHidden: true
            });
            setTimeout(() => {
              this.setState({
                visible: false,
                isHidden: false
              });
            }, 1500);

            notification["success"]({
              message: response.data.message
            });
          }
        })
        .catch(() => {
          notification["error"]({
            message: "No se pudo eliminar el usuario."
          });
        });
    }
  };
  render() {
    const {
      visible,
      itemToEdit,
      userAction,
      userData,
      titleModal,
      isHidden
    } = this.state;
    return (
      <div className="table__container">
        <PlusCircleOutlined
          onClick={this.handleAddUser}
          style={{ fontSize: "20px" }}
        />
        <UserList
          userListData={userData}
          triggerParentUpdate={this.handleAddUpdateUsers}
        ></UserList>
        <Modal
          className="ant-modal-size"
          title={titleModal}
          visible={visible}
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={null}
          destroyOnClose={true}
        >
          <AddUser
            userAction={userAction}
            itemToEdit={itemToEdit}
            triggerUserAction={this.AddupdateUser}
            isHidden={isHidden}
          ></AddUser>
        </Modal>
      </div>
    );
  }
}

export default Users;
