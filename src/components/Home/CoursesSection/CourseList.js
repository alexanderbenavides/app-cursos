import React from "react";
import { LoadingOutlined } from "@ant-design/icons";

import "./CourseList.scss";

import Courses from "./Courses";
class CoursesList extends React.Component {
  render() {
    const emptyCourse = this.props.coursesData.length === 0 ? true : false;

    return (
      <div>
        <div className="courses__list">
          {emptyCourse ? (
            <LoadingOutlined />
          ) : (
            this.props.coursesData.map((course, i) => {
              return <Courses course={course} key={i} />;
            })
          )}
        </div>
      </div>
    );
  }
}

export default CoursesList;
