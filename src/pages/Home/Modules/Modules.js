import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet";
import "../../../scss/_modules.scss";
import { getModulesHomeByCourseApi } from "../../../api/module";
function Modules(props) {
  const [courseName, setCourseName] = useState("");
  const [moduleData, setModuleData] = useState([]);
  const { course } = props.match.params;

  useEffect(() => {
    getModulesHomeByCourseApi(course)
      .then((response) => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          // Course title
          const modules = response.data.modules;
          if (modules.length > 0) {
            setCourseName(modules[0].course.title);
          }
          setModuleData(modules);
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los módulos por un error del servidor. Por favor,inténtelo más tarde.",
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
        <title>Curso| {courseName}</title>
      </Helmet>
      <div className="home-modules">
        <div>
          <label>¿ Qué aprenderás?</label>
          <div className="home-modules__summary">
            {moduleData.map((module, i) => {
              return (
                <div key={i}>
                  <CheckOutlined />
                  <span>{module.title}</span>
                </div>
              );
            })}
          </div>
        </div>
        {moduleData.map((module, i) => {
          return (
            <div className="home-modules__content" key={i}>
              <div className="home-modules__content__icons">
                <CheckOutlined
                  style={{
                    fontSize: "20px",
                    color: "#ffc740",
                    fontWeight: "bolder",
                  }}
                />
              </div>
              <div className="home-modules__content__info">
                <div>
                  <span>{module.title}</span>
                  <Link
                    className="link-info"
                    to={{
                      pathname: `/lessons/course/${course}/module/${module._id}/module-title/${module.title}`,
                      state: {
                        module: module._id,
                        course,
                        moduleTitle: module.title,
                      },
                    }}
                  >
                    <Button type="primary">Ir al contenido</Button>
                  </Link>
                </div>
                <div>{module.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
// }

export default Modules;
