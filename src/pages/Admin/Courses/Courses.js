import React from "react";
import { Modal, notification } from "antd";
import { getUsersApi } from "../../../api/user";
import { getCoursesApi } from "../../../api/course";

import { getAccessTokenApi } from "../../../api/auth";

import { PlusCircleOutlined } from "@ant-design/icons";
import CourseList from "../../../components/Admin/Courses";
import AddUser from "../../../components/Admin/Users//AddUser";
import "../../../scss/_tables.scss";
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      confirmLoading: false,
      visiblePopover: false,
      courseData: []
    };
  }
  componentDidMount() {
    getCoursesApi()
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          this.setState({ courseData: response.data.courses });
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
      <div className="table__container">
        <PlusCircleOutlined
          onClick={this.showModal}
          style={{ fontSize: "20px" }}
        />
        <CourseList courseListData={this.state.courseData}></CourseList>
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
