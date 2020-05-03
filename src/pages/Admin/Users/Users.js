import React, { useState, useEffect } from "react";
import { Modal, notification } from "antd";
import {
  getUsersApi,
  signUpAdminApi,
  deleteUserApi,
  updateUserApi,
} from "../../../api/user";
import { getAccessTokenApi } from "../../../api/auth";
import { PlusCircleOutlined } from "@ant-design/icons";
import UserList from "../../../components/Admin/Users/UsersList";
import AddUser from "../../../components/Admin/Users//AddUser";
import "../../../scss/_tables.scss";
function Users() {
  const [visible, setVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userAction, setUserAction] = useState("");
  const [titleModal, setTitleModal] = useState("");
  const [itemToEdit, setItemToEdit] = useState("");

  useEffect(() => {
    getAllUsers();
  }, []);

  const updateUser = (token, _id, data) => {
    updateUserApi(token, _id, data)
      .then((response) => {
        if (response?.status !== 200) {
          setIsHidden(false);
          notification["warning"]({
            message: "Hubo problemas editando el usuario.",
          });
        } else {
          getAllUsers();
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
          message: "No se pudo editar el usuario.",
        });
      });
  };

  const handleAddUser = () => {
    setVisible(true);
    setUserAction("add");
    setTitleModal("Crear usuario");
    setItemToEdit({
      name: "",
      lastname: "",
      email: "",
      role: "admin",
      active: false,
      password: "",
    });
  };

  const handleCancel = () => {
    setVisible(false);
  };
  const handleStateUser = (item, option) => {
    if (option === true || option === false) return;
    const titleModal =
      option === "update" ? "Actualizar usuario" : "Eliminar usuario";
    setVisible(true);
    setUserAction(option);
    setTitleModal(titleModal);
    setItemToEdit(item);
  };
  const handleAddUpdateUsers = (item, option) => {
    handleStateUser(item, option);
    if (option === true || option === false) {
      let token = getAccessTokenApi();
      const data = {
        active: !option,
      };

      updateUser(token, item._id, data);
    }
  };
  const getAllUsers = () => {
    const token = getAccessTokenApi();
    getUsersApi(token)
      .then((response) => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setUserData(response.data.users);
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los usuarios por un error del servidor. Por favor,inténtelo más tarde.",
        });
      });
  };
  const AddupdateUser = (item, option) => {
    setIsHidden(true);
    let token = getAccessTokenApi();
    if (option === "addForm") {
      signUpAdminApi(token, item)
        .then((response) => {
          if (response?.status !== 200) {
            setIsHidden(false);
            notification["warning"]({
              message: "Hubo problemas agregando el usuario.",
            });
          } else {
            getAllUsers();
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
            message: "No se pudo agregar el usuario.",
          });
        });
    }
    if (option === "editForm") {
      updateUser(token, item._id, item);
    }
    if (option === "deleteForm") {
      deleteUserApi(token, item._id)
        .then((response) => {
          if (response?.status !== 200) {
            setIsHidden(false);
            notification["warning"]({
              message: "Hubo problemas eliminando el usuario.",
            });
          } else {
            getAllUsers();
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
            message: "No se pudo eliminar el usuario.",
          });
        });
    }
  };
  return (
    <div className="table__container">
      <PlusCircleOutlined
        onClick={handleAddUser}
        style={{ fontSize: "20px" }}
      />
      <UserList
        userListData={userData}
        triggerParentUpdate={handleAddUpdateUsers}
      ></UserList>
      <Modal
        className="ant-modal-size"
        title={titleModal}
        visible={visible}
        onCancel={handleCancel}
        maskClosable={false}
        footer={null}
        destroyOnClose={true}
      >
        <AddUser
          userAction={userAction}
          itemToEdit={itemToEdit}
          triggerUserAction={AddupdateUser}
          isHidden={isHidden}
        ></AddUser>
      </Modal>
    </div>
  );
}

export default Users;
