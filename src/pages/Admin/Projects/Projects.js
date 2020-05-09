import React, { useState, useEffect } from "react";
import { Modal, notification, Upload, message, Button } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import {
  getProjectApi,
  addProjectApi,
  deleteProjectApi,
  updateProjectApi,
  updateProjectAvatarApi,
} from "../../../api/project";

import { getAccessTokenApi } from "../../../api/auth";
import { PlusCircleOutlined } from "@ant-design/icons";
import PorjectList from "../../../components/Admin/Projects";
import AddProject from "../../../components/Admin/Projects/AddProject";
import "../../../scss/_tables.scss";
function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
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

function Projects() {
  const [visibleModalAvatar, setVisibleModalAvatar] = useState(false);
  const [visible, setVisible] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [projectAction, setProjectAction] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [itemToEdit, setItemToEdit] = useState({});
  const [isHidden, setIsHidden] = useState(false);

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imgType, setImgType] = useState("");

  const [project, setProject] = useState({});

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => setImageUrl(imageUrl));
      setLoading(false);
      setImgType(info.file.type);
    }
  };

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
          setProjectData(response.data.projects);
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los proyectos por un error del servidor. Por favor,inténtelo más tarde.",
        });
      });
  };
  const updateProject = (token, _id, data) => {
    updateProjectApi(token, _id, data)
      .then((response) => {
        if (response?.status !== 200) {
          setIsHidden(false);
          notification["warning"]({
            message: "Hubo problemas editando el proyecto.",
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
          message: "No se pudo editar el proyecto.",
        });
      });
  };
  const handleAddProject = () => {
    setVisible(true);
    setProjectAction("add");
    setTitleModal("Crear proyecto");
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
  const handleStateProject = (item, option) => {
    if (option === true || option === false) return;
    const titleModal =
      option === "update" ? "Actualizar proyecto" : "Eliminar proyecto";
    setVisible(true);
    setProjectAction(option);
    setTitleModal(titleModal);
    setItemToEdit(item);
  };
  const handleUpdateProject = (item, option) => {
    handleStateProject(item, option);
    if (option === true || option === false) {
      let token = getAccessTokenApi();
      const data = {
        published: !option,
      };
      updateProject(token, item._id, data);
    }
  };
  const addupdateProject = (item, option) => {
    setIsHidden(true);
    let token = getAccessTokenApi();
    if (option === "addForm") {
      addProjectApi(token, item)
        .then((response) => {
          setIsHidden(false);
          if (response?.status !== 200) {
            notification["warning"]({
              message: "Hubo problemas agregando el proyecto.",
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
            message: "No se pudo agregar el proyecto.",
          });
        });
    }
    if (option === "editForm") {
      updateProject(token, item._id, item);
    }
    if (option === "deleteForm") {
      deleteProjectApi(token, item._id)
        .then((response) => {
          if (response?.status !== 200) {
            setIsHidden(false);
            notification["warning"]({
              message: "Hubo problemas eliminando el proyecto.",
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
            message: "No se pudo eliminar el proyecto.",
          });
        });
    }
  };

  const handleupdateProjectAvatar = (openModal, item) => {
    setProject(item);
    setVisibleModalAvatar(openModal);
  };

  const handleSaveAvatar = () => {
    const token = getAccessTokenApi();

    const changeAvatarData = {
      img: imageUrl,
      project: project,
      imgType: imgType,
    };

    if (changeAvatarData.img === "") {
      notification["warning"]({
        message: "Seleccionar una imagen.",
      });
      return;
    }
    updateProjectAvatarApi(token, changeAvatarData)
      .then((response) => {
        if (response?.status !== 200) {
          setVisibleModalAvatar(true);
          notification["warning"]({
            message: "Hubo problemas editando el curso.",
          });
        } else {
          getAllProjects();
          setVisibleModalAvatar(false);
          notification["success"]({
            message: response.data.message,
          });
        }
      })
      .catch(() => {
        setVisibleModalAvatar(true);
        notification["error"]({
          message: "No se pudo actualizar el proyecto.",
        });
      });
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">Subir imagen</div>
    </div>
  );
  return (
    <div className="table__container">
      <PlusCircleOutlined
        onClick={handleAddProject}
        style={{ fontSize: "20px" }}
      />
      <PorjectList
        projectListData={projectData}
        triggerProjectAction={handleUpdateProject}
        triggerAddProjectAvatar={handleupdateProjectAvatar}
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
          projectAction={projectAction}
          itemToEdit={itemToEdit}
          triggerProjectAction={addupdateProject}
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
        <div className="avatar-uploader__container">
          <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            beforeUpload={beforeUpload}
            onChange={handleChange}
          >
            {imageUrl ? (
              <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
            ) : (
              uploadButton
            )}
          </Upload>
          <Button type="primary" onClick={handleSaveAvatar}>
            Guardar
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Projects;
