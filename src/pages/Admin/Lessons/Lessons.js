import React from "react";
import { Modal, notification, Select } from "antd";
import { getModulesByCourseApi } from "../../../api/module";
import {
  getLessonsByModuleApi,
  addLessonApi,
  deleteLessonApi,
  updateLessonApi
} from "../../../api/lesson";

import { getAccessTokenApi } from "../../../api/auth";
import { PlusCircleOutlined } from "@ant-design/icons";
import LessonList from "../../../components/Admin/Lessons";
import AddLesson from "../../../components/Admin/Lessons/AddLesson";
import "../../../scss/_tables.scss";
class Lessons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      moduleData: [],
      moduleAction: "",
      titleModal: "",
      itemToEdit: {},
      isHidden: false,
      courseID: this.props.match.params.courseID,
      moduleID: this.props.match.params.moduleID,
      lessonData: []
    };
  }
  componentDidMount() {
    const { courseID, moduleID } = this.state;
    const token = getAccessTokenApi();
    this.getModulesByCourse(courseID, token);
    this.getLessonsByModule(moduleID, token);
  }

  getLessonsByModule = (moduleID, token) => {
    getLessonsByModuleApi(moduleID, token)
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          this.setState({ lessonData: response.data.lessons, moduleID });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los temas por un error del servidor. Por favor,inténtelo más tarde."
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
    const { moduleID } = this.state;
    updateLessonApi(token, _id, data)
      .then(response => {
        if (response?.status !== 200) {
          this.setState({
            isHidden: false
          });
          notification["warning"]({
            message: "Hubo problemas editando el tema."
          });
        } else {
          this.getLessonsByModule(moduleID, token);
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
          message: "No se pudo editar el tema."
        });
      });
  };
  handleAddModule = item => {
    const { moduleData } = this.state;
    const module = moduleData.filter(module => module._id === item)[0];
    this.setState({
      visible: true,
      moduleAction: "add",
      titleModal: "Crear tema",
      itemToEdit: {
        position: 1,
        published: true,
        title: "",
        content: "",
        module: module._id,
        moduleTitle: module.title
      }
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  handleStateLesson = (item, option) => {
    if (option === true || option === false) return;
    const titleModal =
      option === "update" ? "Actualizar tema" : "Eliminar tema";
    this.setState({
      visible: true,
      moduleAction: option,
      titleModal,
      itemToEdit: item
    });
  };
  handleupdateLesson = (item, option) => {
    const { lessonData } = this.state;
    const lesson = lessonData.filter(
      module => module.module._id === item.module._id
    )[0];
    let itemToEdit = {
      _id: item._id,
      position: item.position,
      published: item.published,
      title: item.title,
      content: item.content,
      module: lesson.module._id,
      moduleTitle: lesson.module.title
    };
    this.handleStateLesson(itemToEdit, option);
    if (option === true || option === false) {
      let token = getAccessTokenApi();
      const data = {
        published: !option
      };
      this.updateModule(token, item._id, data);
    }
  };
  AddupdateLesson = (item, option) => {
    this.setState({
      isHidden: true
    });
    const token = getAccessTokenApi();
    const { moduleID } = this.state;
    if (option === "addForm") {
      addLessonApi(token, item)
        .then(response => {
          this.setState({
            isHidden: false
          });
          if (response?.status !== 200) {
            notification["warning"]({
              message: "Hubo problemas agregando el tema."
            });
          } else {
            this.getLessonsByModule(moduleID, token);
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
            message: "No se pudo agregar el tema."
          });
        });
    }
    if (option === "editForm") {
      this.updateModule(token, item._id, item);
    }
    if (option === "deleteForm") {
      deleteLessonApi(token, item._id)
        .then(response => {
          if (response?.status !== 200) {
            this.setState({
              isHidden: false
            });
            notification["warning"]({
              message: "Hubo problemas eliminando el tema."
            });
          } else {
            this.getLessonsByModule(moduleID, token);
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
            message: "No se pudo eliminar el tema."
          });
        });
    }
  };
  onChangeProperty = moduleID => {
    const token = getAccessTokenApi();
    this.getLessonsByModule(moduleID, token);
  };
  render() {
    const {
      visible,
      itemToEdit,
      moduleAction,
      moduleData,
      titleModal,
      isHidden,
      moduleID,
      lessonData
    } = this.state;
    const { Option } = Select;
    return (
      <div className="table__container">
        <div className="select__course">
          <div>Seleccionar un módulo</div>
          <Select
            placeholder="Selecciona un módulo"
            onChange={item => this.onChangeProperty(item)}
          >
            {moduleData.map(module => {
              return (
                <Option value={module._id} key={module._id}>
                  {module.title}
                </Option>
              );
            })}
          </Select>
        </div>
        <div>
          <LessonList
            lessonListData={lessonData}
            triggerLessonAction={this.handleupdateLesson}
          ></LessonList>
        </div>
        <PlusCircleOutlined
          onClick={() => this.handleAddModule(moduleID)}
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
          <AddLesson
            moduleAction={moduleAction}
            itemToEdit={itemToEdit}
            triggerLessonAction={this.AddupdateLesson}
            isHidden={isHidden}
          ></AddLesson>
        </Modal>
      </div>
    );
  }
}

export default Lessons;
