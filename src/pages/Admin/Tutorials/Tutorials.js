import React from "react";
import { Upload, Modal, notification, Button, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  getTutorialApi,
  addTutorialApi,
  deleteTutorialApi,
  updateTutorialApi,
  updateTutorialAvatarApi,
} from "../../../api/tutorial";

import { getAccessTokenApi } from "../../../api/auth";
import { PlusCircleOutlined } from "@ant-design/icons";
import TutorialList from "../../../components/Admin/Tutorials";
import AddTutorial from "../../../components/Admin/Tutorials/AddTutorial";
import "../../../scss/_tables.scss";

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

class Tutorials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleModalAvatar: false,
      visible: false,
      tutorialData: [],
      tutorialAction: "",
      titleModal: "",
      itemToEdit: {},
      isHidden: false,
      changeAvatarData: {
        img: "",
        tutorial: "",
        imgType: "",
      },
    };
  }
  componentDidMount() {
    this.getAllTutorials();
  }
  getAllTutorials = () => {
    getTutorialApi()
      .then((response) => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          this.setState({ tutorialData: response.data.tutorials });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los tutoriales por un error del servidor. Por favor,inténtelo más tarde.",
        });
      });
  };
  updateTutorial = (token, _id, data) => {
    updateTutorialApi(token, _id, data)
      .then((response) => {
        if (response?.status !== 200) {
          this.setState({
            isHidden: false,
          });
          notification["warning"]({
            message: "Hubo problemas editando el tutorial.",
          });
        } else {
          this.getAllTutorials();
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
          message: "No se pudo editar el tutorial.",
        });
      });
  };
  handleAddTutorial = () => {
    this.setState({
      visible: true,
      tutorialAction: "add",
      titleModal: "Crear tutorial",
      itemToEdit: {
        img: "",
        published: false,
        title: "",
        content: "",
        duration_value: "",
        duration_text: "minutos",
        description: "",
      },
    });
  };

  handleCancelModal = () => {
    this.setState({
      visible: false,
    });
  };
  handleCancelAvatarModal = () => {
    this.setState({
      visibleModalAvatar: false,
    });
  };
  handleStateTutorial = (item, option) => {
    if (option === true || option === false) return;
    const titleModal =
      option === "update" ? "Actualizar tutorial" : "Eliminar tutorial";
    this.setState({
      visible: true,
      tutorialAction: option,
      titleModal,
      itemToEdit: item,
    });
  };
  handleUpdateTutorial = (item, option) => {
    this.handleStateTutorial(item, option);
    if (option === true || option === false) {
      let token = getAccessTokenApi();
      const data = {
        published: !option,
      };
      this.updateTutorial(token, item._id, data);
    }
  };
  AddupdateTutorial = (item, option) => {
    this.setState({
      isHidden: true,
    });
    let token = getAccessTokenApi();
    if (option === "addForm") {
      addTutorialApi(token, item)
        .then((response) => {
          this.setState({
            isHidden: false,
          });
          if (response?.status !== 200) {
            notification["warning"]({
              message: "Hubo problemas agregando el tutorial.",
            });
          } else {
            this.getAllTutorials();
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
            message: "No se pudo agregar el tutorial.",
          });
        });
    }
    if (option === "editForm") {
      this.updateTutorial(token, item._id, item);
    }
    if (option === "deleteForm") {
      deleteTutorialApi(token, item._id)
        .then((response) => {
          if (response?.status !== 200) {
            this.setState({
              isHidden: false,
            });
            notification["warning"]({
              message: "Hubo problemas eliminando el tutorial.",
            });
          } else {
            this.getAllTutorials();
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
            message: "No se pudo eliminar el tutorial.",
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

  handleupdateTutorialAvatar = (openModal, tutorial) => {
    this.setState((prevState) => ({
      visibleModalAvatar: openModal,
      changeAvatarData: {
        ...prevState.changeAvatarData,
        tutorial,
      },
    }));
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
    console.log(changeAvatarData);
    updateTutorialAvatarApi(token, changeAvatarData)
      .then((response) => {
        if (response?.status !== 200) {
          this.setState({
            visibleModalAvatar: true,
          });
          notification["warning"]({
            message: "Hubo problemas editando el curso.",
          });
        } else {
          this.getAllTutorials();
          this.setState((prevState) => ({
            visibleModalAvatar: false,
            changeAvatarData: {
              ...prevState.changeAvatarData,
              img: "",
              tutorial: "",
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
      visible,
      visibleModalAvatar,
      itemToEdit,
      tutorialAction,
      tutorialData,
      titleModal,
      isHidden,
      changeAvatarData,
    } = this.state;
    return (
      <div className="table__container">
        <PlusCircleOutlined
          onClick={this.handleAddTutorial}
          style={{ fontSize: "20px" }}
        />
        <TutorialList
          tutorialListData={tutorialData}
          triggerTutorialAction={this.handleUpdateTutorial}
          triggerAddTutorialAvatar={this.handleupdateTutorialAvatar}
        ></TutorialList>
        <Modal
          className="ant-modal-size"
          title={titleModal}
          visible={visible}
          onCancel={this.handleCancelModal}
          maskClosable={false}
          footer={null}
          destroyOnClose={true}
        >
          <AddTutorial
            tutorialAction={tutorialAction}
            itemToEdit={itemToEdit}
            triggerTutorialAction={this.AddupdateTutorial}
            isHidden={isHidden}
          ></AddTutorial>
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

export default Tutorials;
