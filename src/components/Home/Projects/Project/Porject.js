import React from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Animated } from "react-animated-css";

import "./Project.scss";
function Project(props) {
  const env = window.$environment;
  const dinamic =
    env === "dev" ? "/uploads/projects/local" : "/uploads/projects";
  const baseUrl = window.$baseUrl;
  const baseImgUrl = `${baseUrl}${dinamic}`;
  return (
    <Animated
      animationIn="fadeInDown"
      animationOut="zoomOutDown"
      animationInDuration={1000}
      animationOutDuration={1000}
      isVisible={true}
      className="project"
    >
      <img src={`${baseImgUrl}/${props.project.img}`} alt="_blank"></img>
      <div className="project-content">
        <div> {`${props.project.title}`} </div>
        <div> {`${props.project.description}`} </div>
      </div>
      <div
        className="duration"
        onClick={() => props.openModalData(props.project)}
      >
        <EyeOutlined /> Ver proyecto
      </div>
    </Animated>
  );
}

export default Project;
