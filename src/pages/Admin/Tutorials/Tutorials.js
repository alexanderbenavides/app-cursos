import React, { useState, useEffect } from "react";
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
    message.error("Solo puedes subir JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("La imagen debe ser menor a  2MB!");
  }
  return isJpgOrPng && isLt2M;
}

function Tutorials() {
  const [visibleModalAvatar, setVisibleModalAvatar] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tutorialData, setTutorialData] = useState([]);
  const [tutorialAction, setTutorialAction] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [itemToEdit, setItemToEdit] = useState({});
  const [isHidden, setIsHidden] = useState(false);
  const [loading, setLoading] = useState(false);
  const [changeAvatarData, setChangeAvatarData] = useState({
    img: "",
    tutorial: "",
    imgType: "",
  });
  useEffect(() => {
    getAllTutorials();
  }, []);
  const getAllTutorials = () => {
    getTutorialApi()
      .then((response) => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setTutorialData(response.data.tutorials);
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
    updateTutorialApi(token, _id, data)
      .then((response) => {
        if (response?.status !== 200) {
          setIsHidden(false);
          notification["warning"]({
            message: "Hubo problemas editando el tutorial.",
          });
        } else {
          getAllTutorials();
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
      duration_value: "",
      duration_text: "minutos",
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
  const handleUpdateTutorial = (item, option) => {
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
      addTutorialApi(token, item)
        .then((response) => {
          setIsHidden(false);
          if (response?.status !== 200) {
            notification["warning"]({
              message: "Hubo problemas agregando el tutorial.",
            });
          } else {
            getAllTutorials();
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
      deleteTutorialApi(token, item._id)
        .then((response) => {
          if (response?.status !== 200) {
            setIsHidden(false);
            notification["warning"]({
              message: "Hubo problemas eliminando el tutorial.",
            });
          } else {
            getAllTutorials();
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

  const handleChangeAvatar = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
    }
    if (info.file.status === "done") {
      setLoading(false);

      getBase64(info.file.originFileObj, (imageUrl) =>
        setChangeAvatarData((prevState) => ({
          ...prevState,
          img: imageUrl,
          imgType: info.file.type,
        }))
      );
    }
  };

  const handleupdateTutorialAvatar = (openModal, tutorial) => {
    setVisibleModalAvatar(openModal);
    setChangeAvatarData((prevState) => ({
      ...prevState,
      tutorial: tutorial,
    }));
  };

  const handleSaveAvatar = () => {
    const token = getAccessTokenApi();
    console.log(changeAvatarData);

    if (changeAvatarData.img === "") {
      notification["warning"]({
        message: "Seleccionar una imagen.",
      });
      return;
    }
    updateTutorialAvatarApi(token, changeAvatarData)
      .then((response) => {
        if (response?.status !== 200) {
          setVisibleModalAvatar(true);
          notification["warning"]({
            message: "Hubo problemas editando el curso.",
          });
        } else {
          getAllTutorials();
          setVisibleModalAvatar(false);
          setChangeAvatarData((prevState) => ({
            ...prevState,
            img: "",
            tutorial: "",
            imgType: "",
          }));
          notification["success"]({
            message: response.data.message,
          });
        }
      })
      .catch(() => {
        setVisibleModalAvatar(true);
        notification["error"]({
          message: "No se pudo actualizar el curso.",
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
        onClick={handleAddTutorial}
        style={{ fontSize: "20px" }}
      />
      <TutorialList
        tutorialListData={tutorialData}
        triggerTutorialAction={handleUpdateTutorial}
        triggerAddTutorialAvatar={handleupdateTutorialAvatar}
      ></TutorialList>
      <Modal
        className="ant-modal-size"
        title={titleModal}
        visible={visible}
        onCancel={handleCancelModal}
        maskClosable={false}
        footer={null}
        destroyOnClose={true}
      >
        <AddTutorial
          tutorialAction={tutorialAction}
          itemToEdit={itemToEdit}
          triggerTutorialAction={addupdateTutorial}
          isHidden={isHidden}
        ></AddTutorial>
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
            beforeUpload={beforeUploadAvatar}
            onChange={handleChangeAvatar}
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
          <Button type="primary" onClick={handleSaveAvatar}>
            Guardar
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Tutorials;
