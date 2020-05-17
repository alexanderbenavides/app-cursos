import React from "react";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";

import "./Tutorial.scss";
function Tutorial(props) {
  const env = window.$environment;
  const dinamic =
    env === "dev" ? "/uploads/tutorials/local" : "/uploads/tutorials";
  const baseUrl = window.$baseUrl;
  const baseImgUrl = `${baseUrl}${dinamic}`;
  return (
    <Animated
      animationIn="fadeInDown"
      animationOut="zoomOutDown"
      animationInDuration={1000}
      animationOutDuration={1000}
      isVisible={true}
      className="course"
    >
      <Link
        to={{
          pathname: `/tutorial/${props.tutorial._id}`,
        }}
      >
        <img src={`${baseImgUrl}/${props.tutorial.img}`} alt="_blank"></img>
        <div className="courseContent">
          <div> {`${props.tutorial.title}`} </div>
          <div> {`${props.tutorial.description}`} </div>
        </div>
        <div className="duration">
          {`${props.tutorial.duration_value} ${props.tutorial.duration_text}`}
        </div>
      </Link>
    </Animated>
  );
}

export default Tutorial;
