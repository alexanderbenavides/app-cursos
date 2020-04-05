import React from "react";
import { Link } from "react-router-dom";
import "./Courses.scss";
class Course extends React.Component {
  render() {
    const dinamic = "/uploads/cursos";
    const baseUrl = window.$baseUrl;
    const baseImgUrl = `${baseUrl}${dinamic}`;
    return (
      <Link
        className="course"
        to={{
          pathname: `/modules/${this.props.course._id}`,
        }}
      >
        <img src={`${baseImgUrl}/${this.props.course.img}`} alt="_blank"></img>
        <div className="courseContent">
          <div> {`${this.props.course.title}`} </div>
          <div> {`${this.props.course.content}`} </div>
        </div>
        <div className="duration">
          {`${this.props.course.duration_value} ${this.props.course.duration_text}`}
        </div>
      </Link>
    );
  }
}

export default Course;
