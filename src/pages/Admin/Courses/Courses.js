import React from "react";
import { Modal, notification } from "antd";
import {
  getCoursesApi,
  addCourseApi,
  deleteCourseApi,
  updateCourseApi
} from "../../../api/course";

import { getAccessTokenApi } from "../../../api/auth";
import { PlusCircleOutlined } from "@ant-design/icons";
import CourseList from "../../../components/Admin/Courses";
import AddCourse from "../../../components/Admin/Courses/AddCourse";
import "../../../scss/_tables.scss";
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      courseData: [],
      courseAction: "add",
      titleModal: "Crear Curso",
      itemToEdit: {}
    };
  }
  componentDidMount() {
    this.getallCourses();
  }
  getallCourses = () => {
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
  };
  updateCourse = (token, _id, data) => {
    updateCourseApi(token, _id, data)
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: "Hubo problemas editando el curso."
          });
        } else {
          this.getallCourses();
          setTimeout(() => {
            this.setState({
              visible: false
            });
          }, 1000);

          notification["success"]({
            message: response.data.message
          });
        }
      })
      .catch(() => {
        notification["error"]({
          message: "No se pudo editar el curso."
        });
      });
  };
  handleAddCourse = () => {
    this.setState({
      visible: true,
      courseAction: "add",
      titleModal: "Crear Curso",
      itemToEdit: {
        img: "",
        published: false,
        title: "",
        content: "",
        duration_value: 1,
        duration_text: "weeks"
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleStateCourse = (item, option) => {
    if (option === true || option === false) return;
    const titleModal =
      option === "update" ? "Actualizar Curso" : "Eliminar Curso";
    this.setState({
      visible: true,
      courseAction: option,
      titleModal,
      itemToEdit: item
    });
  };
  handleupdateCourse = (item, option) => {
    this.handleStateCourse(item, option);
    if (option === true || option === false) {
      let token = getAccessTokenApi();
      const data = {
        published: !option
      };
      this.updateCourse(token, item._id, data);
    }
  };
  AddupdateCourse = (item, option) => {
    let token = getAccessTokenApi();
    if (option === "addForm") {
      addCourseApi(token, item)
        .then(response => {
          if (response?.status !== 201) {
            notification["warning"]({
              message: "Hubo problemas agregando el curso."
            });
          } else {
            this.getallCourses();
            setTimeout(() => {
              this.setState({
                visible: false
              });
            }, 1000);

            notification["success"]({
              message: `El curso '${response.data.course.title}' Se agregó con éxito.`
            });
          }
        })
        .catch(() => {
          notification["error"]({
            message: "No se pudo agregar el curso."
          });
        });
    }
    if (option === "editForm") {
      this.updateCourse(token, item._id, item);
    }
    if (option === "deleteForm") {
      deleteCourseApi(token, item)
        .then(response => {
          if (response?.status !== 200) {
            notification["warning"]({
              message: "Hubo problemas eliminando el curso."
            });
          } else {
            this.getallCourses();
            setTimeout(() => {
              this.setState({
                visible: false
              });
            }, 1000);

            notification["success"]({
              message: response.data.message
            });
          }
        })
        .catch(() => {
          notification["error"]({
            message: "No se pudo eliminar el curso."
          });
        });
    }
  };
  render() {
    const {
      visible,
      itemToEdit,
      courseAction,
      courseData,
      titleModal
    } = this.state;
    return (
      <div className="table__container">
        <PlusCircleOutlined
          onClick={this.handleAddCourse}
          style={{ fontSize: "20px" }}
        />
        <CourseList
          courseListData={courseData}
          triggerCourseAction={this.handleupdateCourse}
        ></CourseList>
        <Modal
          className="ant-modal-size"
          title={titleModal}
          visible={visible}
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={null}
          destroyOnClose={true}
        >
          <AddCourse
            courseAction={courseAction}
            itemToEdit={itemToEdit}
            triggerCourseAction={this.AddupdateCourse}
          ></AddCourse>
        </Modal>
      </div>
    );
  }
}

export default Users;
