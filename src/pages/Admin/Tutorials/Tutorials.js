import React from "react";
import { Modal, notification } from "antd";
import {
  getTutorialApi,
  addTutorialApi,
  deleteTutorialApi,
  updateTutorialApi
} from "../../../api/tutorial";

import { getAccessTokenApi } from "../../../api/auth";
import { PlusCircleOutlined } from "@ant-design/icons";
import TutorialList from "../../../components/Admin/Tutorials";
import AddTutorial from "../../../components/Admin/Tutorials/AddTutorial";
import "../../../scss/_tables.scss";
class Tutorials extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      tutorialData: [],
      tutorialAction: "",
      titleModal: "",
      itemToEdit: {},
      isHidden: false
    };
  }
  componentDidMount() {
    this.getAllTutorials();
  }
  getAllTutorials = () => {
    getTutorialApi()
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          this.setState({ tutorialData: response.data.tutorials });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los tutoriales por un error del servidor. Por favor,inténtelo más tarde."
        });
      });
  };
  updateTutorial = (token, _id, data) => {
    updateTutorialApi(token, _id, data)
      .then(response => {
        if (response?.status !== 200) {
          this.setState({
            isHidden: false
          });
          notification["warning"]({
            message: "Hubo problemas editando el tutorial."
          });
        } else {
          this.getAllTutorials();
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
          message: "No se pudo editar el tutorial."
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
        duration_text: "minutos"
      }
    });
  };

  handleCancelModal = () => {
    this.setState({
      visible: false
    });
  };

  handleStateCourse = (item, option) => {
    if (option === true || option === false) return;
    const titleModal =
      option === "update" ? "Actualizar tutorial" : "Eliminar tutorial";
    this.setState({
      visible: true,
      tutorialAction: option,
      titleModal,
      itemToEdit: item
    });
  };
  handleUpdateTutorial = (item, option) => {
    this.handleStateCourse(item, option);
    if (option === true || option === false) {
      let token = getAccessTokenApi();
      const data = {
        published: !option
      };
      this.updateTutorial(token, item._id, data);
    }
  };
  AddupdateTutorial = (item, option) => {
    this.setState({
      isHidden: true
    });
    let token = getAccessTokenApi();
    if (option === "addForm") {
      addTutorialApi(token, item)
        .then(response => {
          this.setState({
            isHidden: false
          });
          if (response?.status !== 200) {
            notification["warning"]({
              message: "Hubo problemas agregando el tutorial."
            });
          } else {
            this.getAllTutorials();
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
            message: "No se pudo agregar el tutorial."
          });
        });
    }
    if (option === "editForm") {
      this.updateTutorial(token, item._id, item);
    }
    if (option === "deleteForm") {
      deleteTutorialApi(token, item._id)
        .then(response => {
          if (response?.status !== 200) {
            this.setState({
              isHidden: false
            });
            notification["warning"]({
              message: "Hubo problemas eliminando el tutorial."
            });
          } else {
            this.getAllTutorials();
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
            message: "No se pudo eliminar el tutorial."
          });
        });
    }
  };
  render() {
    const {
      visible,
      itemToEdit,
      tutorialAction,
      tutorialData,
      titleModal,
      isHidden
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
      </div>
    );
  }
}

export default Tutorials;
