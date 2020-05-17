import React, { useState, useEffect } from "react";
import { notification } from "antd";
import { Helmet } from "react-helmet";
import { getCoursesPublishedApi } from "../../../api/course";

import CoursesList from "../../../components/Home/CoursesSection";
import "../../../scss/_courses.scss";
function Courses(props) {
  const { course } = props.match.params;
  const [coursesList, setCoursesList] = useState([]);
  useEffect(() => {
    getCoursesPublishedApi(course)
      .then((response) => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setCoursesList(response.data.courses);
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los curos por un error del servidor. Por favor,inténtelo más tarde.",
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
        <title>Todos Los cursos</title>
      </Helmet>
      <div className="courses-container">
        <CoursesList coursesData={coursesList} />
      </div>
    </>
  );
}

export default Courses;
