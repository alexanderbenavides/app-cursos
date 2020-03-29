import React from "react";
import { Button } from "antd";
import { CheckOutlined } from "@ant-design/icons";
import "../../../scss/_modules.scss";

class Modules extends React.Component {
  render() {
    return (
      <div className="home-modules">
        <div>
          <label>¿ Qué aprenderás?</label>
          <div className="home-modules__summary">
            <div>
              <CheckOutlined />
              <span>Contenido</span>
            </div>
            <div>
              <CheckOutlined />
              <span>Contenido</span>
            </div>
            <div>
              <CheckOutlined />
              <span>Contenido</span>
            </div>
            <div>
              <CheckOutlined />
              <span>Contenido</span>
            </div>
            <div>
              <CheckOutlined />
              <span>Contenido</span>
            </div>
            <div>
              <CheckOutlined />
              <span>Contenido</span>
            </div>
          </div>
        </div>
        <div className="home-modules__content">
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
              <span>Title of module</span>
              <Button type="primary">Ir al contenido</Button>
            </div>
            <div>The details goes here</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Modules;
