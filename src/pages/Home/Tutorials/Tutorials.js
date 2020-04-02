import React from "react";
import { notification } from "antd";
import { Helmet } from "react-helmet";
import { getTutorialPublishedApi } from "../../../api/tutorial";

import TutorialList from "../../../components/Home/CoursesSection";
import "../../../scss/_courses.scss";
class Courses extends React.Component {
  state = {
    tutorialList: []
  };

  componentDidMount() {
    getTutorialPublishedApi()
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          this.setState({ tutorialList: response.data.courses });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los tutorials por un error del servidor. Por favor,inténtelo más tarde."
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
          <TutorialList coursesData={this.state.tutorialList} />
        </div>
      </>
    );
  }
}

export default Courses;
