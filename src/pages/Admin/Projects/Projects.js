import React, { useState, useEffect } from "react";
import { Modal, notification } from "antd";
import {
  getProjectApi,
  addProjectApi,
  deleteProjectApi,
  updateProjectApi,
} from "../../../api/project";

import { getAccessTokenApi } from "../../../api/auth";
import { PlusCircleOutlined } from "@ant-design/icons";
import PorjectList from "../../../components/Admin/Projects";
import AddProject from "../../../components/Admin/Projects/AddProject";
import "../../../scss/_tables.scss";

function Projects() {
  const [visibleModalAvatar, setVisibleModalAvatar] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tutorialData, setTutorialData] = useState([]);
  const [tutorialAction, setTutorialAction] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [itemToEdit, setItemToEdit] = useState({});
  const [isHidden, setIsHidden] = useState(false);
  useEffect(() => {
    getAllProjects();
  }, []);
  const getAllProjects = () => {
    getProjectApi()
      .then((response) => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setTutorialData(response.data.projects);
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los tutoriales por un error del servidor. Por favor,inténtelo más tarde.",
        });
      });
  };
  const updateTutorial = (token, _id, data) => {
    updateProjectApi(token, _id, data)
      .then((response) => {
        if (response?.status !== 200) {
          setIsHidden(false);
          notification["warning"]({
            message: "Hubo problemas editando el tutorial.",
          });
        } else {
          getAllProjects();
          setVisible(false);
          setIsHidden(false);
          notification["success"]({
            message: response.data.message,
          });
        }
      })
      .catch(() => {
        setIsHidden(false);
        notification["error"]({
          message: "No se pudo editar el tutorial.",
        });
      });
  };
  const handleAddTutorial = () => {
    setVisible(true);
    setTutorialAction("add");
    setTitleModal("Crear tutorial");
    setItemToEdit({
      img: "",
      published: false,
      title: "",
      content: "",
      description: "",
    });
  };

  const handleCancelModal = () => {
    setVisible(false);
  };
  const handleCancelAvatarModal = () => {
    setVisibleModalAvatar(false);
  };
  const handleStateTutorial = (item, option) => {
    if (option === true || option === false) return;
    const titleModal =
      option === "update" ? "Actualizar tutorial" : "Eliminar tutorial";
    setVisible(true);
    setTutorialAction(option);
    setTitleModal(titleModal);
    setItemToEdit(item);
  };
  const handleUpdateProject = (item, option) => {
    handleStateTutorial(item, option);
    if (option === true || option === false) {
      let token = getAccessTokenApi();
      const data = {
        published: !option,
      };
      updateTutorial(token, item._id, data);
    }
  };
  const addupdateTutorial = (item, option) => {
    setIsHidden(true);
    let token = getAccessTokenApi();
    if (option === "addForm") {
      addProjectApi(token, item)
        .then((response) => {
          setIsHidden(false);
          if (response?.status !== 200) {
            notification["warning"]({
              message: "Hubo problemas agregando el tutorial.",
            });
          } else {
            getAllProjects();
            setVisible(false);
            setIsHidden(false);

            notification["success"]({
              message: response.data.message,
            });
          }
        })
        .catch(() => {
          setIsHidden(false);
          notification["error"]({
            message: "No se pudo agregar el tutorial.",
          });
        });
    }
    if (option === "editForm") {
      updateTutorial(token, item._id, item);
    }
    if (option === "deleteForm") {
      deleteProjectApi(token, item._id)
        .then((response) => {
          if (response?.status !== 200) {
            setIsHidden(false);
            notification["warning"]({
              message: "Hubo problemas eliminando el tutorial.",
            });
          } else {
            getAllProjects();
            setVisible(false);
            setIsHidden(false);
            notification["success"]({
              message: response.data.message,
            });
          }
        })
        .catch(() => {
          setIsHidden(false);
          notification["error"]({
            message: "No se pudo eliminar el tutorial.",
          });
        });
    }
  };

  const handleupdateProjectAvatar = (openModal) => {
    setVisibleModalAvatar(openModal);
  };
  return (
    <div className="table__container">
      <PlusCircleOutlined
        onClick={handleAddTutorial}
        style={{ fontSize: "20px" }}
      />
      <PorjectList
        tutorialListData={tutorialData}
        triggerTutorialAction={handleUpdateProject}
        triggerAddTutorialAvatar={handleupdateProjectAvatar}
      ></PorjectList>
      <Modal
        className="ant-modal-size"
        title={titleModal}
        visible={visible}
        onCancel={handleCancelModal}
        maskClosable={false}
        footer={null}
        destroyOnClose={true}
      >
        <AddProject
          tutorialAction={tutorialAction}
          itemToEdit={itemToEdit}
          triggerTutorialAction={addupdateTutorial}
          isHidden={isHidden}
        ></AddProject>
      </Modal>
      <Modal
        className="modal-upload"
        title="Selecciona una nueva imagen"
        visible={visibleModalAvatar}
        onCancel={handleCancelAvatarModal}
        maskClosable={false}
        footer={null}
        destroyOnClose={true}
      >
        <div className="avatar-uploader__container"></div>
      </Modal>
    </div>
  );
}

export default Projects;
