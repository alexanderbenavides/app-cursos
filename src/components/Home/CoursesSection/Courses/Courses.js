import React from "react";
import { Link } from "react-router-dom";
import "./Courses.scss";
class Course extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Link
        className="course"
        to={{
          pathname: `/modules`,
          state: { course: this.props.course._id }
        }}
      >
        <img
          src={`${
            this.props.course.img
              ? this.props.course.img
              : "https://cdn.codecademy.com/assets/components/cards/path-card/5d8a2f26510e9000118ef3b8.svg"
          }`}
          alt="_blank"
        ></img>
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
