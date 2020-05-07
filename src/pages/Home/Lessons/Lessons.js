import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, notification } from "antd";
import { Helmet } from "react-helmet";
import { getLessonsHomeByModuleApi } from "../../../api/lesson";
import "../../../scss/_lessons.scss";
function Lessons(props) {
  const { course, module, moduleTitle } = props.match.params;
  const [currentPage, setCurrentPage] = useState(0);
  const [hideNextButton, setHideNextButton] = useState(false);
  const [hidePreviusButton, setHidePreviusButton] = useState(true);
  const [lessonData, setLessonData] = useState([]);

  useEffect(() => {
    getLessonsHomeByModuleApi(module)
      .then((response) => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          setLessonData(response.data.lessons);
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los temas por un error del servidor. Por favor,inténtelo más tarde.",
        });
      });
  }, [module]);

  const handleNextLesson = () => {
    const lessonsSize = lessonData.length;
    if (currentPage < lessonsSize) {
      setHidePreviusButton(false);
      setCurrentPage(currentPage + 1);

      if (lessonsSize - currentPage === 2) {
        setHideNextButton(true);
      }
    }
  };
  const handlePreviuosLesson = () => {
    setHideNextButton(false);
    setCurrentPage(currentPage - 1);
    if (currentPage === 1) {
      setHidePreviusButton(true);
    }
  };

  let currentClass = "";
  let lessonBodyData = {
    title: "",
    content: "",
  };
  if (lessonData.length > 0) {
    lessonBodyData = lessonData[currentPage];
  }
  return (
    <>
      <Helmet>
        <meta
          name="description"
          content="Alexander Benavides| Cursos de programación web"
          data-react-helmet="true"
        />
        <title>Módulo| {moduleTitle}</title>
      </Helmet>
      <div className="home-lessons">
        <div className="home-lessons__back">
          <Link
            className="link-info"
            to={{
              pathname: `/courses`,
            }}
          >
            <Button type="link" block>
              Ir a todos los cursos
            </Button>
          </Link>
        </div>
        <div className="home-lessons__content">
          <div className="home-lessons__content__modules">
            <h3>Módulo: {moduleTitle}</h3>
            <div className="grid-lessons">
              <div className="grid-lessons__head">
                <h4>Temas</h4>
              </div>
              <ul className="grid-lessons__list">
                {lessonData.map((lesson, i) => {
                  if (i === currentPage) {
                    currentClass = "current__class";
                  } else {
                    currentClass = "";
                  }
                  return (
                    <li
                      className={`grid-lessons__list_options  ${currentClass}`}
                      key={i}
                    >
                      {lesson.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className="home-lessons__content__lessons">
            <div className="editorembed-container">
              <div>{lessonBodyData.title}</div>
              <div
                dangerouslySetInnerHTML={{ __html: lessonBodyData.content }}
              ></div>
            </div>
          </div>
        </div>
        <div className="home-lessons__butons">
          <PreviousLesson
            hidePreviusButton={hidePreviusButton}
            handlePreviuosLesson={handlePreviuosLesson}
          ></PreviousLesson>
          <NextModule
            course={course}
            hideNextButton={hideNextButton}
            handleNextLesson={handleNextLesson}
          ></NextModule>
        </div>
      </div>
    </>
  );
}
function PreviousLesson({ hidePreviusButton, handlePreviuosLesson }) {
  if (!hidePreviusButton) {
    return (
      <span
        className="navigation-button previous"
        onClick={handlePreviuosLesson}
      >
        &laquo; Anterior
      </span>
    );
  }
  return <span className="navigation-button previous">&laquo; Anterior</span>;
}
function NextModule({ hideNextButton, handleNextLesson, course }) {
  if (!hideNextButton) {
    return (
      <span className="navigation-button next" onClick={handleNextLesson}>
        Siguiente &raquo;
      </span>
    );
  } else {
    return (
      <Link className="link-info" to={{ pathname: `/modules/${course}` }}>
        <span className="navigation-button next">
          Seguir aprendiendo &raquo;
        </span>
      </Link>
    );
  }
}
export default Lessons;
