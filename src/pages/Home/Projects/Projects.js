import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { Helmet } from "react-helmet";
import { getProjectPublishedApi } from "../../../api/project";

import ProjectsList from "../../../components/Home/Projects";
import "../../../scss/_courses.scss";
function Projects() {
  const [projectsList, setProjectsList] = useState([]);

  useEffect(() => {
    getProjectPublishedApi()
      .then((response) => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setProjectsList(response.data.projects);
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los proyectos por un error del servidor. Por favor,inténtelo más tarde.",
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
        <title>Todos los proyectos</title>
      </Helmet>
      <div className="courses-container">
        <ProjectsList projectsData={projectsList} />
      </div>
    </>
  );
}

export default Projects;
