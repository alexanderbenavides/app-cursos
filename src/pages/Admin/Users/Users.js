import React from "react";
import { Modal } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import "./Users.scss";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false
    };
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: "The modal will be closed after two seconds",
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
  handleClick() {
    console.log("Hola mundo");
  }

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    return (
      <div className="user__page">
        <PlusCircleOutlined
          onClick={this.showModal}
          style={{ fontSize: "20px" }}
        />
        <Modal
          title="Crear usuario"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
          <p>{ModalText}</p>
        </Modal>
      </div>
    );
  }
}

export default Users;
