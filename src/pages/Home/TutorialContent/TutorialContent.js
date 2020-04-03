import React from "react";
import { Link } from "react-router-dom";
import { notifitcaion } from "antd";
import { Helmet } from "react-helmet";
import { getLessonsHomeByModuleApi } from "../../../api/lesson";
import { getEmbedContent } from "../../../utils/embedContent";
import "../../../scss/_tutorialContent.scss";

class TotorialContent extends React.Component {
  render() {
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
        <div className="tutorialcontent-container">Holaaaaaaa</div>
      </>
    );
  }
}
export default TotorialContent;
