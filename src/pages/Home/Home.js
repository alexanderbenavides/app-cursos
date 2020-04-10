import React from "react";
import { notification } from "antd";
import { Helmet } from "react-helmet";
import { getContributions } from "../../api/contributions";

// import { Bar } from "react-chartjs-2";

import "../../scss/_home.scss";
const logo = require("../../assets/img/estudiante_landing.jpg");
const data = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "Meses del año",
      backgroundColor: ["#a3c4ac", "#8fc6cf", "#2f5c63", "#5d632f"],
      borderColor: ["#a3c4ac", "#8fc6cf", "#2f5c63", "#5d632f"],
      borderWidth: 1,
      hoverBackgroundColor: ["#a3c4ac", "#8fc6cf", "#2f5c63", "#5d632f"],
      hoverBorderColor: ["#a3c4ac", "#8fc6cf", "#2f5c63", "#5d632f"],
      data: [65, 59, 80, 81],
    },
  ],
};
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contributionsData: {},
    };
  }
  componentDidMount() {
    getContributions()
      .then((response) => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message,
          });
        } else {
          this.setState({ contributionsData: response.data });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudo obtener la información por un error del servidor. Por favor,inténtelo más tarde.",
        });
      });
  }

  render() {
    const { contributionsData } = this.state;
    console.log(contributionsData);
    return (
      <>
        <Helmet>
          <meta
            name="description"
            content="Alexander Benavides| Cursos de programación web"
            data-react-helmet="true"
          />
          <title>Inicio</title>
        </Helmet>
        <div className="home-section">
          <div className="home-section__infoskills">
            <img src={logo} alt="Not profile found"></img>
            <div className="reasons__bold">
              Mejora tus habilidades en Front-End o Back-End. Encontrarás las
              tecnologías de vanguardia modernas e innovadoras a través de
              nuestros tutoriales y video cursos.
            </div>
          </div>
          <div className="why-it__works">¿Por qué debo aprender aquí ?</div>
          <div className="home-section__whytochoose">
            <div className="reasons">
              <div className="reasons__bold">Aprendizaje personalizado</div>
              <div>
                Los estudiantes practican a su propio ritmo; primero para llenar
                las lagunas en su comprensión y luego acelerar su aprendizaje.
              </div>
            </div>
            <div className="reasons">
              <div className="reasons__bold">Contenido de confianza</div>
              <div>
                Creado por expertos, la biblioteca de ejercicios y lecciones de
                cubre programación web, diseño web y más. Y siempre es gratis.
              </div>
            </div>
            <div className="reasons">
              <div className="reasons__bold">
                Recursos para empoderar a los estudiantes
              </div>
              <div>
                Los estudiantes practican preguntas adaptativas y el sistema va
                dando recomendaciones de las cosas que están haciendo mal.
              </div>
            </div>
          </div>
          <div className="home-section__footer">
            <span>Descubre una nueva forma de aprender</span>
          </div>
        </div>
      </>
    );
  }
}

export default Home;
