import React from "react";
import { Modal, notification } from "antd";
import { getUsersApi } from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";

import { PlusCircleOutlined } from "@ant-design/icons";
import UserList from "../../../components/Admin/Users/UsersList";
import AddUser from "../../../components/Admin/Users//AddUser";
import "./Users.scss";
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
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

  handleOk = () => {
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false
      });
    }, 2000);
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleVisibleChange = visiblePopover => {
    this.setState({ visiblePopover });
  };
  render() {
    const { visible, confirmLoading } = this.state;
    return (
      <div className="user__page">
        <PlusCircleOutlined
          onClick={this.showModal}
          style={{ fontSize: "20px" }}
        />
        <UserList userListData={this.state.userData}></UserList>
        <Modal
          title="Crear usuario"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <AddUser></AddUser>
        </Modal>
      </div>
    );
  }
}

export default Users;
