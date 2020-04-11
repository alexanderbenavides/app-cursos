import React from "react";
import { Upload, Modal, notification, message, Button } from "antd";
import "antd/dist/antd.css";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  getCoursesApi,
  addCourseApi,
  deleteCourseApi,
  updateCourseApi,
  updateCourseAvatarApi,
} from "../../../api/course";

import { getAccessTokenApi } from "../../../api/auth";
import { PlusCircleOutlined } from "@ant-design/icons";
import CourseList from "../../../components/Admin/Courses";
import AddCourse from "../../../components/Admin/Courses/AddCourse";
import "../../../scss/_tables.scss";
import "./_courses.scss";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUploadAvatar(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModalAvatar: false,
      visible: false,
      courseData: [],
      courseAction: "",
      titleModal: "",
      itemToEdit: {},
      isHidden: false,
      changeAvatarData: {
        img: "",
        course: "",
        imgType: "",
      },
    };
  }
  componentDidMount() {
    this.getallCourses();
  }
  getallCourses = () => {
    getCoursesApi()
      .then((response) => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          this.setState({ courseData: response.data.courses });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los curos por un error del servidor. Por favor,inténtelo más tarde.",
        });
      });
  };
  updateCourse = (token, _id, data) => {
    updateCourseApi(token, _id, data)
      .then((response) => {
        if (response?.status !== 200) {
          this.setState({
            isHidden: false,
          });
          notification["warning"]({
            message: "Hubo problemas editando el curso.",
          });
        } else {
          this.getallCourses();
          this.setState({
            visible: false,
            isHidden: false,
          });
          notification["success"]({
            message: response.data.message,
          });
        }
      })
      .catch(() => {
        this.setState({
          isHidden: false,
        });
        notification["error"]({
          message: "No se pudo editar el curso.",
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
        duration_value: "",
        duration_text: "minutos",
      },
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  handleCancelAvatarModal = () => {
    this.setState({
      visibleModalAvatar: false,
    });
  };
  handleStateCourse = (item, option) => {
    if (option === true || option === false) return;
    const titleModal =
      option === "update" ? "Actualizar curso" : "Eliminar curso";
    this.setState({
      visible: true,
      courseAction: option,
      titleModal,
      itemToEdit: item,
    });
  };
  handleupdateCourseAvatar = (openModal, course) => {
    this.setState((prevState) => ({
      visibleModalAvatar: openModal,
      changeAvatarData: {
        ...prevState.changeAvatarData,
        course,
      },
    }));
  };
  handleupdateCourse = (item, option) => {
    this.handleStateCourse(item, option);
    if (option === true || option === false) {
      let token = getAccessTokenApi();
      const data = {
        published: !option,
      };
      this.updateCourse(token, item._id, data);
    }
  };
  AddupdateCourse = (item, option) => {
    this.setState({
      isHidden: true,
    });
    let token = getAccessTokenApi();
    if (option === "addForm") {
      addCourseApi(token, item)
        .then((response) => {
          this.setState({
            isHidden: false,
          });
          if (response?.status !== 200) {
            notification["warning"]({
              message: "Hubo problemas agregando el curso.",
            });
          } else {
            this.getallCourses();
            this.setState({
              visible: false,
              isHidden: false,
            });

            notification["success"]({
              message: response.data.message,
            });
          }
        })
        .catch(() => {
          this.setState({
            isHidden: false,
          });
          notification["error"]({
            message: "No se pudo agregar el curso.",
          });
        });
    }
    if (option === "editForm") {
      this.updateCourse(token, item._id, item);
    }
    if (option === "deleteForm") {
      deleteCourseApi(token, item._id)
        .then((response) => {
          if (response?.status !== 200) {
            this.setState({
              isHidden: false,
            });
            notification["warning"]({
              message: "Hubo problemas eliminando el curso.",
            });
          } else {
            this.getallCourses();
            this.setState({
              visible: false,
              isHidden: false,
            });
            notification["success"]({
              message: response.data.message,
            });
          }
        })
        .catch(() => {
          this.setState({
            isHidden: false,
          });
          notification["error"]({
            message: "No se pudo eliminar el curso.",
          });
        });
    }
  };

  handleChangeAvatar = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) =>
        this.setState((prevState) => ({
          loading: false,
          changeAvatarData: {
            ...prevState.changeAvatarData,
            img: imageUrl,
            imgType: info.file.type,
          },
        }))
      );
    }
  };

  handleSaveAvatar = () => {
    const { changeAvatarData } = this.state;
    const token = getAccessTokenApi();

    if (changeAvatarData.img === "") {
      notification["warning"]({
        message: "Seleccionar una imagen.",
      });
      return;
    }
    updateCourseAvatarApi(token, changeAvatarData)
      .then((response) => {
        if (response?.status !== 200) {
          this.setState({
            visibleModalAvatar: true,
          });
          notification["warning"]({
            message: "Hubo problemas editando el curso.",
          });
        } else {
          this.getallCourses();
          this.setState((prevState) => ({
            visibleModalAvatar: false,
            changeAvatarData: {
              ...prevState.changeAvatarData,
              img: "",
              course: "",
              imgType: "",
            },
          }));
          notification["success"]({
            message: response.data.message,
          });
        }
      })
      .catch(() => {
        this.setState({
          visibleModalAvatar: true,
        });
        notification["error"]({
          message: "No se pudo actualizar el curso.",
        });
      });
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Subir imagen</div>
      </div>
    );
    const {
      changeAvatarData,
      visibleModalAvatar,
      visible,
      itemToEdit,
      courseAction,
      courseData,
      titleModal,
      isHidden,
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
          triggerAddCourseAvatar={this.handleupdateCourseAvatar}
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
            isHidden={isHidden}
          ></AddCourse>
        </Modal>
        <Modal
          className="modal-upload"
          title="Selecciona una nueva imagen"
          visible={visibleModalAvatar}
          onCancel={this.handleCancelAvatarModal}
          maskClosable={false}
          footer={null}
          destroyOnClose={true}
        >
          <div className="avatar-uploader__container">
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              beforeUpload={beforeUploadAvatar}
              onChange={this.handleChangeAvatar}
            >
              {changeAvatarData.img ? (
                <img
                  src={changeAvatarData.img}
                  alt="avatar"
                  style={{ width: "100%" }}
                />
              ) : (
                uploadButton
              )}
            </Upload>
            <Button type="primary" onClick={this.handleSaveAvatar}>
              Guardar
            </Button>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Users;
