import React, { useState } from "react";
import { Popover, Modal } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getInfoUserApi } from "../../api/auth";
import AddUser from "../../components/Admin/Users//AddUser";

import "./Admin.scss";
function Admin() {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const handleRemove = () => {
    setModalVisible(true);
  };
  const handleEdit = () => {
    setModalVisible(true);
  };
  const handleVisibleChange = (visible) => {
    setVisible(visible);
  };
  const handleCancel = () => {
    setModalVisible(false);
  };

  const { name, lastname, role } = getInfoUserApi();
  return (
    <div className="admin__page">
      <div className="admin__page__title">Información del usuario</div>
      <div className="admin__page__grid">
        <div>
          <img
            src="http://alexanderbenavides.herokuapp.com/img/perfil.1055441c.jpg"
            alt="Not profile found"
            className="admin__page__img"
          />
        </div>
        <div className="admin__page__info">
          <span>Nombre: {name}</span>
          <span>Apellidos: {lastname}</span>
          <span>Rol: {role}</span>
        </div>
      </div>
      <Popover
        content={
          <div className="admin__page__iconspopover">
            <DeleteOutlined onClick={handleRemove} />
            <EditOutlined onClick={handleEdit} />
          </div>
        }
        title=""
        trigger="click"
        visible={visible}
        onVisibleChange={handleVisibleChange}
      >
        <MoreOutlined className="admin__page__iconmore"></MoreOutlined>
      </Popover>
      <Modal
        className="ant-modal-size"
        title="Crear usuario"
        visible={modalVisible}
        onCancel={handleCancel}
        maskClosable={false}
        destroyOnClose={true}
        footer={null}
      >
        <AddUser></AddUser>
      </Modal>
    </div>
  );
}

export default Admin;
