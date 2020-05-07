import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { Helmet } from "react-helmet";
import { getTutorialPublishedApi } from "../../../api/tutorial";

import ProjectsList from "../../../components/Home/Projects";
import "../../../scss/_courses.scss";
function Projects() {
  const [projectsList, setprojectsList] = useState([]);

  useEffect(() => {
    getTutorialPublishedApi()
      .then((response) => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setprojectsList(response.data.tutorials);
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los tutoriales por un error del servidor. Por favor,inténtelo más tarde.",
        });
      });
  }, []);

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Alexander Benavides| Cursos de programación web"
          data-react-helmet="true"
        />
        <title>Todos los tutoriales</title>
      </Helmet>
      <div className="courses-container">
        <ProjectsList projectsData={projectsList} />
      </div>
    </>
  );
}

export default Projects;
