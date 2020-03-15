import React from "react";
import { Modal, notification } from "antd";
import { getCoursesApi } from "../../../api/course";

// import { getAccessTokenApi } from "../../../api/auth";
import { PlusCircleOutlined } from "@ant-design/icons";
import CourseList from "../../../components/Admin/Courses";
import AddCourse from "../../../components/Admin/Courses/AddCourse";
import "../../../scss/_tables.scss";
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
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

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };
  updateCourses = (item, option, i) => {
    console.log(item, option, i);
    if (option === true || option === false) {
      let courseData = this.state.courseData;
      courseData[i].published = !option;
      this.setState({
        courseData
      });
    }
  };
  render() {
    const { visible } = this.state;
    return (
      <div className="table__container">
        <PlusCircleOutlined
          onClick={this.showModal}
          style={{ fontSize: "20px" }}
        />
        <CourseList
          courseListData={this.state.courseData}
          triggerParentUpdate={this.updateCourses}
        ></CourseList>
        <Modal
          className="ant-modal-size"
          title="Crear usuario"
          visible={visible}
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={null}
        >
          <AddCourse></AddCourse>
        </Modal>
      </div>
    );
  }
}

export default Users;
