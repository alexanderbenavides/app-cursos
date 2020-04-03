import React from "react";
import { notification } from "antd";
import { Helmet } from "react-helmet";
import { getTutorialByIdApi } from "../../../api/tutorial";
import { getEmbedContent } from "../../../utils/embedContent";
import "../../../scss/_tutorialContent.scss";

class TotorialContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorial: this.props.match.params.tutorial,
      tutorialData: {}
    };
  }
  componentDidMount() {
    const { tutorial } = this.state;
    this.getTutorialById(tutorial);
  }
  getTutorialById = tutorial => {
    getTutorialByIdApi(tutorial)
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          let tutorials = response.data.tutorials;
          tutorials.map(tutorial => {
            const fromHome = true;
            const content = getEmbedContent(tutorial.content, fromHome);
            tutorial.content = content;
            return tutorial.content;
          });

          this.setState({ tutorialData: tutorials[0] });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudo obtener el tutorial por un error del servidor. Por favor,inténtelo más tarde."
        });
      });
  };
  render() {
    const { tutorialData } = this.state;
    console.log(tutorialData.content);
    return (
      <>
        <Helmet>
          <meta
            name="description"
            content="Alexander Benavides| Cursos de programación web"
            data-react-helmet="true"
          />
          <title>Tutorial|</title>
        </Helmet>
        <div className="tutorialcontent-container">
          <div dangerouslySetInnerHTML={{ __html: tutorialData.content }}></div>
        </div>
      </>
    );
  }
}
export default TotorialContent;
