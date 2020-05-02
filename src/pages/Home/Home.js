import React from "react";
import { Helmet } from "react-helmet";
import "../../scss/_home.scss";
const logo = require("../../assets/img/estudiante_landing.jpg");
const video = require("../../assets/video/video.mp4");

function Home() {
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
        <div className="section-video">
          <div className="paragraph">
            Perfecciona tus habilidades con cursos de ingeniería front-end y
            back-end modernos y detallados
          </div>
          <video autoPlay muted loop className="video-container">
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
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

export default Home;
