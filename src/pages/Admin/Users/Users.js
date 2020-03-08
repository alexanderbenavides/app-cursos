import React from "react";
import { Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
// import XLSX from "xlsx";
import UserList from "../../../components/Admin/Users/UsersList";
import AddUser from "../../../components/Admin/Users//AddUser";
import "./Users.scss";
const userData = [
  {
    _id: "5e5c4a6ed21e73438c85bdef",
    name: "Alexander",
    lastname: "Benavides Cabrera",
    email: "alexben9602@gmail.com",
    role: "admin",
    active: true
  },
  {
    _id: "5e5c4a6ed21e73438c85bdef",
    name: "Alexander",
    lastname: "Benavides Cabrera",
    email: "alexben9602@gmail.com",
    role: "admin",
    active: false
  },
  {
    _id: "5e5c4a6ed21e73438c85bdef",
    name: "Alexander",
    lastname: "Benavides Cabrera",
    email: "alexben9602@gmail.com",
    role: "admin",
    active: true
  },
  {
    _id: "5e5c4a6ed21e73438c85bdef",
    name: "Alexander",
    lastname: "Benavides Cabrera",
    email: "alexben9602@gmail.com",
    role: "admin",
    active: false
  }
];
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      visiblePopover: false
    };
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
        <UserList userListData={userData}></UserList>
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
