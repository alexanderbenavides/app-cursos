import React from "react";
import { Modal, notification } from "antd";
import { getUsersApi } from "../../../api/user";
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
      userData: []
    };
  }
  componentDidMount() {
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
            "No se pudieron obtener los curos por un error del servidor. Por favor,inténtelo más tarde."
        });
      });
  }
  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  updateUsers = (item, option, i) => {
    console.log(item, option, i);
    if (option === true || option === false) {
      let userData = this.state.userData;
      userData[i].active = !option;
      this.setState({
        userData
      });
    }
  };
  onclose = () => {
    console.log("hdhdh");
  };
  render() {
    const { visible } = this.state;
    return (
      <div className="table__container">
        <PlusCircleOutlined
          onClick={this.showModal}
          style={{ fontSize: "20px" }}
        />
        <UserList
          userListData={this.state.userData}
          triggerParentUpdate={this.updateUsers}
        ></UserList>
        <Modal
          className="ant-modal-size"
          title="Crear usuario"
          visible={visible}
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={null}
        >
          <AddUser></AddUser>
        </Modal>
      </div>
    );
  }
}

export default Users;
