import React from "react";
import { notification } from "antd";
import { Helmet } from "react-helmet";
import { getCoursesPublishedApi } from "../../api/course";

import CoursesList from "../../components/Home/CoursesSection";
class Home extends React.Component {
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
          <title>Inicio</title>
          <description
            name="description"
            data="Inicio| Cursos de programación web"
            data-react-helmet="true"
          />
        </Helmet>
        <div className="Home">
          <CoursesList coursesData={this.state.coursesList} />
        </div>
      </>
    );
  }
}

export default Home;
