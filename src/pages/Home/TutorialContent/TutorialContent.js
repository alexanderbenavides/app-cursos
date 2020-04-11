import React from "react";
import { notification } from "antd";
import { Helmet } from "react-helmet";
import { getTutorialByIdApi } from "../../../api/tutorial";
import "../../../scss/_tutorialContent.scss";

class TotorialContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorial: this.props.match.params.tutorial,
      tutorialData: {},
    };
  }
  componentDidMount() {
    const { tutorial } = this.state;
    this.getTutorialById(tutorial);
  }
  getTutorialById = (tutorial) => {
    getTutorialByIdApi(tutorial)
      .then((response) => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          let tutorials = response.data.tutorials;
          this.setState({ tutorialData: tutorials[0] });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudo obtener el tutorial por un error del servidor. Por favor,inténtelo más tarde.",
        });
      });
  };
  render() {
    const { tutorialData } = this.state;
    const title = tutorialData.title ? tutorialData.title : "";
    return (
      <>
        <Helmet>
          <meta
            name="description"
            content="Alexander Benavides| Cursos de programación web"
            data-react-helmet="true"
          />
          <title>Tutorial| {title} </title>
        </Helmet>
        <div className="tutorialcontent-container">
          <div className="description">{tutorialData.description}</div>
          <div className="editorembed-container">
            <div
              dangerouslySetInnerHTML={{ __html: tutorialData.content }}
            ></div>
          </div>
        </div>
      </>
    );
  }
}
export default TotorialContent;
