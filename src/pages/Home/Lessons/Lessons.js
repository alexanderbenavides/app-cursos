import React from "react";
import { Link } from "react-router-dom";
import { Button, notification } from "antd";
import { Helmet } from "react-helmet";
import { getLessonsHomeByModuleApi } from "../../../api/lesson";
import { getEmbedContent } from "../../../utils/embedContent";
import "../../../scss/_lessons.scss";

class Lessons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      module: this.props.location.state
        ? this.props.location.state.module
        : false,
      lessonData: [],
      moduleTitle: this.props.location.state.moduleTitle,
      currentPage: 0,
      hideNextButton: false,
      hidePreviusButton: true,
      course: this.props.location.state.course
    };
  }
  componentDidMount() {
    const { module } = this.state;
    this.getLessonsByModule(module);
  }
  getLessonsByModule = module => {
    getLessonsHomeByModuleApi(module)
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          let lessons = response.data.lessons;
          lessons.map(lesson => {
            const fromHome = true;
            const content = getEmbedContent(lesson.content, fromHome);
            lesson.content = content;
            return lesson.content;
          });

          this.setState({ lessonData: response.data.lessons, module });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los temas por un error del servidor. Por favor,inténtelo más tarde."
        });
      });
  };
  handleNextLesson = () => {
    const lessonsSize = this.state.lessonData.length;
    const { currentPage } = this.state;
    if (currentPage < lessonsSize) {
      this.setState({
        hidePreviusButton: false,
        currentPage: this.state.currentPage + 1
      });

      if (lessonsSize - currentPage === 2) {
        this.setState({
          hideNextButton: true
        });
      }
    }
  };
  handlePreviuosLesson = () => {
    this.setState({
      hideNextButton: false,
      currentPage: this.state.currentPage - 1
    });
    const { currentPage } = this.state;
    if (currentPage === 1) {
      this.setState({
        hidePreviusButton: true
      });
    }
  };
  render() {
    const currentPage = this.state.currentPage;
    let lessonBodyData = {},
      currentClass = "";

    const {
      lessonData,
      moduleTitle,
      hidePreviusButton,
      hideNextButton,
      course
    } = this.state;
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
                pathname: `/`
              }}
            >
              <Button type="link" block>
                Inicio
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
              <div>
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
              handlePreviuosLesson={this.handlePreviuosLesson}
            ></PreviousLesson>
            <NextModule
              course={course}
              hideNextButton={hideNextButton}
              handleNextLesson={this.handleNextLesson}
            ></NextModule>
          </div>
        </div>
      </>
    );
  }
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
      <Link
        className="link-info"
        to={{
          pathname: `/modules`,
          state: { course }
        }}
      >
        <span className="navigation-button next">
          Seguir aprendiendo &raquo;
        </span>
      </Link>
    );
  }
}
export default Lessons;
