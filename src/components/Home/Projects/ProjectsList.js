import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./ProjectsList.scss";

import Project from "./Project";
function ProjectsList(props) {
  const emptyProjects = props.projectsData.length === 0 ? true : false;
  const [dataModal, setDataModal] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const openModalData = (data) => {
    setDataModal(data);
    setIsOpen(true);
  };

  const isCanceled = (option) => {
    setIsOpen(option);
  };

  return (
    <div>
      <OpenModal
        dataModal={dataModal}
        isOpen={isOpen}
        isCanceled={isCanceled}
      ></OpenModal>
      <div className="project__list">
        {emptyProjects ? (
          <LoadingOutlined />
        ) : (
          props.projectsData.map((project, i) => {
            return (
              <Project
                project={project}
                key={i}
                openModalData={openModalData}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

function OpenModal(props) {
  const [visible, setVisible] = useState(false);
  const { isOpen, dataModal, isCanceled } = props;

  useEffect(() => {
    setVisible(isOpen);
  });
  return (
    <div>
      <Modal
        title="Video demostración"
        visible={visible}
        onCancel={() => isCanceled(false)}
        maskClosable={false}
        destroyOnClose={true}
        footer={[
          <Button key="back" onClick={() => isCanceled(false)}>
            Cerrar
          </Button>,
        ]}
      >
        <div dangerouslySetInnerHTML={{ __html: dataModal.content }}></div>
      </Modal>
    </div>
  );
}
export default ProjectsList;
