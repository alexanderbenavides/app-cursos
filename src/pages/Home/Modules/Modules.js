import React from "react";
import { Link } from "react-router-dom";
import { Button, notification } from "antd";
import { CheckOutlined } from "@ant-design/icons";

import "../../../scss/_modules.scss";
import { getModulesHomeByCourseApi } from "../../../api/module";
class Modules extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: this.props.location.state.course,
      moduleData: []
    };
  }
  componentDidMount() {
    const { course } = this.state;

    this.getModulesByCourse(course);
  }
  getModulesByCourse = course => {
    getModulesHomeByCourseApi(course)
      .then(response => {
        if (response?.status !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          this.setState({ moduleData: response.data.modules, course });
        }
      })
      .catch(() => {
        notification["error"]({
          message:
            "No se pudieron obtener los módulos por un error del servidor. Por favor,inténtelo más tarde."
        });
      });
  };
  render() {
    const { moduleData } = this.state;
    return (
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
                    fontWeight: "bolder"
                  }}
                />
              </div>
              <div className="home-modules__content__info">
                <div>
                  <span>{module.title}</span>
                  <Link
                    className="link-info"
                    to={{
                      pathname: `/lessons`,
                      state: { module: module._id }
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
    );
  }
}

export default Modules;
