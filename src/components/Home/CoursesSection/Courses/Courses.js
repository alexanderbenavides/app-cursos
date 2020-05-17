import React from "react";
import { Link } from "react-router-dom";
import { Animated } from "react-animated-css";

import "./Courses.scss";
function Course(props) {
  const env = window.$environment;
  const dinamic = env === "dev" ? "/uploads/cursos/local" : "/uploads/cursos";
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
        // className="course"
        to={{
          pathname: `/modules/${props.course._id}`,
        }}
      >
        <img src={`${baseImgUrl}/${props.course.img}`} alt="_blank"></img>
        <div className="courseContent">
          <div> {`${props.course.title}`} </div>
          <div> {`${props.course.content}`} </div>
        </div>
        <div className="duration">
          {`${props.course.duration_value} ${props.course.duration_text}`}
        </div>
      </Link>
    </Animated>
  );
}

export default Course;
