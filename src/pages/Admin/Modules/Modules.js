import React from "react";
import { Modal, notification, Select } from "antd";
import {
  getModulesByCourseApi,
  addModuleApi,
  deleteModuleApi,
  updateModuleApi
} from "../../../api/module";

import { getCoursesApi } from "../../../api/course";

import { getAccessTokenApi } from "../../../api/auth";
import { PlusCircleOutlined } from "@ant-design/icons";
import ModuleList from "../../../components/Admin/Modules";
import AddModule from "../../../components/Admin/Modules/AddModule";
import "../../../scss/_tables.scss";
class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      moduleData: [],
      moduleAction: "",
      titleModal: "",
      itemToEdit: {},
      isHidden: false,
      courseData: [],
      courseID: this.props.match.params.courseID
    };
  }
  componentDidMount() {
    const { courseID } = this.state;
    const token = getAccessTokenApi();
    this.getModulesByCourse(courseID, token);
    this.getAllCourses();
  }
  getAllCourses = () => {
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
            "No se pudieron obtener los cursos por un error del servidor. Por favor,inténtelo más tarde."
        });
      });
  };

  getModulesByCourse = (courseID, token) => {
    getModulesByCourseApi(courseID, token)
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          this.setState({ moduleData: response.data.modules, courseID });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los módulos por un error del servidor. Por favor,inténtelo más tarde."
        });
      });
  };
  updateModule = (token, _id, data) => {
    const { courseID } = this.state;
    updateModuleApi(token, _id, data)
      .then(response => {
        if (response?.status !== 200) {
          this.setState({
            isHidden: false
          });
          notification["warning"]({
            message: "Hubo problemas editando el módulo."
          });
        } else {
          this.getModulesByCourse(courseID, token);
          this.setState({
            visible: false,
            isHidden: false
          });
          notification["success"]({
            message: response.data.message
          });
        }
      })
      .catch(() => {
        this.setState({
          isHidden: false
        });
        notification["error"]({
          message: "No se pudo editar el módulo."
        });
      });
  };
  handleAddModule = item => {
    const { courseData } = this.state;
    const course = courseData.filter(course => course._id === item)[0];
    this.setState({
      visible: true,
      moduleAction: "add",
      titleModal: "Crear Módulo",
      itemToEdit: {
        position: 1,
        published: true,
        title: "",
        content: "",
        course: course.title,
        course_id: course._id
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
      option === "update" ? "Actualizar módulo" : "Eliminar módulo";
    this.setState({
      visible: true,
      moduleAction: option,
      titleModal,
      itemToEdit: item
    });
  };
  handleupdateModule = (item, option) => {
    const { courseData } = this.state;
    const course = courseData.filter(
      course => course._id === item.course_id._id
    )[0];
    let itemToEdit = {
      _id: item._id,
      position: item.position,
      published: item.published,
      title: item.title,
      content: item.content,
      course: course.title,
      course_id: course._id
    };
    this.handleStateCourse(itemToEdit, option);
    if (option === true || option === false) {
      let token = getAccessTokenApi();
      const data = {
        published: !option
      };
      this.updateModule(token, item._id, data);
    }
  };
  AddupdateModule = (item, option) => {
    this.setState({
      isHidden: true
    });
    const token = getAccessTokenApi();
    const { courseID } = this.state;
    if (option === "addForm") {
      addModuleApi(token, item)
        .then(response => {
          this.setState({
            isHidden: false
          });
          if (response?.status !== 200) {
            notification["warning"]({
              message: "Hubo problemas agregando el módulo."
            });
          } else {
            this.getModulesByCourse(courseID, token);
            this.setState({
              visible: false,
              isHidden: false
            });

            notification["success"]({
              message: response.data.message
            });
          }
        })
        .catch(() => {
          this.setState({
            isHidden: false
          });
          notification["error"]({
            message: "No se pudo agregar el módulo."
          });
        });
    }
    if (option === "editForm") {
      this.updateModule(token, item._id, item);
    }
    if (option === "deleteForm") {
      deleteModuleApi(token, item._id)
        .then(response => {
          if (response?.status !== 200) {
            this.setState({
              isHidden: false
            });
            notification["warning"]({
              message: "Hubo problemas eliminando el módulo."
            });
          } else {
            this.getModulesByCourse(courseID, token);
            this.setState({
              visible: false,
              isHidden: false
            });
            notification["success"]({
              message: response.data.message
            });
          }
        })
        .catch(() => {
          this.setState({
            isHidden: false
          });
          notification["error"]({
            message: "No se pudo eliminar el módulo."
          });
        });
    }
  };
  onChangeProperty = courseID => {
    const token = getAccessTokenApi();
    this.getModulesByCourse(courseID, token);
  };
  render() {
    const {
      visible,
      itemToEdit,
      moduleAction,
      moduleData,
      titleModal,
      isHidden,
      courseData,
      courseID
    } = this.state;
    const { Option } = Select;
    return (
      <div className="table__container">
        <div className="select__course">
          <div>Seleccionar un curso</div>
          <Select
            placeholder="Selecciona un curso"
            onChange={item => this.onChangeProperty(item)}
          >
            {courseData.map(course => {
              return (
                <Option value={course._id} key={course._id}>
                  {course.title}
                </Option>
              );
            })}
          </Select>
        </div>
        <div>
          <ModuleList
            moduleListData={moduleData}
            triggerModuleAction={this.handleupdateModule}
          ></ModuleList>
        </div>
        <PlusCircleOutlined
          onClick={() => this.handleAddModule(courseID)}
          style={{ fontSize: "20px" }}
        />
        <Modal
          className="ant-modal-size"
          title={titleModal}
          visible={visible}
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={null}
          destroyOnClose={true}
        >
          <AddModule
            moduleAction={moduleAction}
            itemToEdit={itemToEdit}
            triggerModuleAction={this.AddupdateModule}
            isHidden={isHidden}
          ></AddModule>
        </Modal>
      </div>
    );
  }
}

export default Users;
