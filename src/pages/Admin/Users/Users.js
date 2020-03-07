import React from "react";
import { Modal, Upload, message, Button } from "antd";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
// import XLSX from "xlsx";

import "./Users.scss";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: "Content of the modal",
      visible: false,
      confirmLoading: false,
      users: [],
      UploadMessage: "Subir excel"
    };
    this.handleFile = this.handleFile.bind(this);
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
  handleFile = info => {
    const { files } = info;
    console.log(files);

    // let files = evt.target.files;
    // let json_to_send = [];
    // let final_json = {};
    // let file;
    if (info.file.status !== "uploading") {
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      // console.log(info.file);
      // message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      // message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const {
      visible,
      confirmLoading,
      ModalText,
      // users,
      UploadMessage
    } = this.state;
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
          {/* <Upload {...props} onChange={this.handleFile}>
            <Button>
              <UploadOutlined /> Subir achivo
            </Button>
          </Upload> */}
          ,
        </Modal>
      </div>
    );
  }
}

export default Users;
