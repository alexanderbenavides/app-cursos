import React from "react";
import { notification } from "antd";
import { Helmet } from "react-helmet";
import { getCoursesPublishedApi } from "../../../api/course";

import CoursesList from "../../../components/Home/CoursesSection";
import "../../../scss/_courses.scss";
class Courses extends React.Component {
  state = {
    coursesList: []
  };

  componentDidMount() {
    getCoursesPublishedApi()
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          this.setState({ coursesList: response.data.courses });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los curos por un error del servidor. Por favor,inténtelo más tarde."
        });
      });
  }

  render() {
    return (
      <>
        <Helmet>
          <meta
            name="description"
            content="Alexander Benavides| Cursos de programación web"
            data-react-helmet="true"
          />
          <title>Inicio</title>
        </Helmet>
        <div className="courses-container">
          <CoursesList coursesData={this.state.coursesList} />
        </div>
      </>
    );
  }
}

export default Courses;
