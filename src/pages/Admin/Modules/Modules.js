import React from "react";
import { Modal, notification, Select } from "antd";
import {
  getCoursesApi,
  addCourseApi,
  deleteCourseApi,
  updateCourseApi
} from "../../../api/course";

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
      courseData: []
    };
  }
  componentDidMount() {
    this.getModulesByCourse();
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
            "No se pudieron obtener los curos por un error del servidor. Por favor,inténtelo más tarde."
        });
      });
  };

  getModulesByCourse = () => {
    getCoursesApi()
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          this.setState({ moduleData: response.data.courses });
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
          this.setState({
            isHidden: false
          });
          notification["warning"]({
            message: "Hubo problemas editando el curso."
          });
        } else {
          this.getModulesByCourse();
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
          message: "No se pudo editar el curso."
        });
      });
  };
  handleAddModule = () => {
    this.setState({
      visible: true,
      moduleAction: "add",
      titleModal: "Crear Módulo",
      itemToEdit: {
        img: "",
        published: false,
        title: "",
        content: "",
        duration_value: "",
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
      option === "update" ? "Actualizar módulo" : "Eliminar módulo";
    this.setState({
      visible: true,
      moduleAction: option,
      titleModal,
      itemToEdit: item
    });
  };
  handleupdateModule = (item, option) => {
    this.handleStateCourse(item, option);
    if (option === true || option === false) {
      let token = getAccessTokenApi();
      const data = {
        published: !option
      };
      this.updateCourse(token, item._id, data);
    }
  };
  AddupdateModule = (item, option) => {
    this.setState({
      isHidden: true
    });
    let token = getAccessTokenApi();
    if (option === "addForm") {
      addCourseApi(token, item)
        .then(response => {
          this.setState({
            isHidden: false
          });
          if (response?.status !== 200) {
            notification["warning"]({
              message: "Hubo problemas agregando el curso."
            });
          } else {
            this.getModulesByCourse();
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
            message: "No se pudo agregar el curso."
          });
        });
    }
    if (option === "editForm") {
      this.updateCourse(token, item._id, item);
    }
    if (option === "deleteForm") {
      deleteCourseApi(token, item._id)
        .then(response => {
          if (response?.status !== 200) {
            this.setState({
              isHidden: false
            });
            notification["warning"]({
              message: "Hubo problemas eliminando el curso."
            });
          } else {
            this.getModulesByCourse();
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
            message: "No se pudo eliminar el curso."
          });
        });
    }
  };
  onChangeProperty = item => {};
  render() {
    const {
      visible,
      itemToEdit,
      moduleAction,
      moduleData,
      titleModal,
      isHidden,
      courseData
    } = this.state;
    const { courseID } = this.props.match.params;
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
        {courseID === "all" ? (
          <div>Para ver los módulos debes seleccionar un curso.</div>
        ) : (
          <div>
            <ModuleList
              moduleListData={moduleData}
              triggerModuleAction={this.handleupdateModule}
            ></ModuleList>
          </div>
        )}
        <PlusCircleOutlined
          onClick={this.handleAddModule}
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
            courseData={courseData}
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
