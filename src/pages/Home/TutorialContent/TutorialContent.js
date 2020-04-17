import React from "react";
import { notification } from "antd";
import { Helmet } from "react-helmet";
import MonacoEditor from "@monaco-editor/react";
import { getTutorialByIdApi } from "../../../api/tutorial";
import "../../../scss/_tutorialContent.scss";

class TotorialContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tutorial: this.props.match.params.tutorial,
      tutorialData: {},
      theme: "dark",
      language: "markup",
      tutorialContent: [],
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
          const tutorialArray = tutorials[0].content.split("<hr />");
          let tutorialData = [];
          tutorialArray.map((string) => {
            const n = string.indexOf("<pre");
            if (n !== -1) {
              const stringToHTML = function (str) {
                const domContainer = document.createElement("span");
                domContainer.innerHTML = str;
                return domContainer;
              };

              const parentEmbed = stringToHTML(string);
              const pre = parentEmbed.getElementsByTagName("pre")[0];
              const attr = pre.getAttribute("class").split("-");
              const language = attr[1] === "markup" ? "html" : attr[1];

              const index1 = string.indexOf("<code>") + 6;
              const index2 = string.indexOf("</code>");
              const sub = string.substring(index1, index2);
              let res = "";
              res = sub.replace(/&lt;/g, "<");
              res = res.replace(/&gt;/g, ">");
              tutorialData.push({
                language: language,
                string: res,
              });
            } else {
              tutorialData.push({
                language: false,
                string,
              });
            }
          });
          this.setState({
            tutorialData: tutorials[0],
            tutorialContent: tutorialData,
          });
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
    const { tutorialContent, tutorialData, theme } = this.state;
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
            {tutorialContent.map((data, i) => {
              if (data.language) {
                return (
                  <div className="monaco-container-admin" key={i}>
                    <MonacoEditor
                      height="250px"
                      width="70%"
                      theme={theme}
                      language={data.language}
                      value={data.string}
                    />
                  </div>
                );
              } else {
                return (
                  <div
                    dangerouslySetInnerHTML={{ __html: data.string }}
                    key={i}
                  ></div>
                );
              }
            })}
          </div>
        </div>
      </>
    );
  }
}
export default TotorialContent;
