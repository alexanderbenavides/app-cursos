import React, { useState, useEffect } from "react";
import { Modal, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

import "./ProjectsList.scss";

import Project from "./Project";
function ProjectsList(props) {
  const emptyProjects = props.projectsData.length === 0 ? true : false;

  return (
    <div>
      <OpenModal></OpenModal>
      <div className="project__list">
        {emptyProjects ? (
          <LoadingOutlined />
        ) : (
          props.projectsData.map((project, i) => {
            return <Project project={project} key={i} />;
          })
        )}
      </div>
    </div>
  );
}

function OpenModal() {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e) => {
    setVisible(false);
  };

  const handleCancel = (e) => {
    setVisible(false);
  };
  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </div>
  );
}
export default ProjectsList;
