import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import { Input, Button } from "antd";
const { Search } = Input;
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showHeaderResponsive: true
    };
  }
  showHeaderOptionsResponsive = val => {
    this.setState({
      showHeaderResponsive: !val
    });
  };
  hideHeaderOptionsResponsive = val => {
    this.setState({
      showHeaderResponsive: !val
    });
  };
  render() {
    return (
      <div className="navigation">
        <div className="navigation__pc">
          <div className="navigation__pc__options">
            <div className="option__left">
              <Link
                to={{
                  pathname: `/`
                }}
              >
                <Button type="link" block>
                  Inicio
                </Button>
              </Link>
            </div>

            <div className="option__left">
              <Link
                to={{
                  pathname: `/courses`
                }}
              >
                <Button type="link" block>
                  Todos los cursos
                </Button>
              </Link>
            </div>
            <div className="option__left">
              <Button type="link" block>
                Javascript
              </Button>
            </div>
            <div className="option__left">
              <Button type="link" block>
                Python
              </Button>
            </div>
            <div className="option__left">
              <Button type="link" block>
                Php
              </Button>
            </div>
          </div>
          <div className="navigation__pc__options">
            <div>
              <Search
                placeholder="Buscar un curso"
                onSearch={() => console.log("nulll")}
                className="search"
              />
            </div>
          </div>
        </div>
        <div
          className="icon__container"
          onClick={() =>
            this.showHeaderOptionsResponsive(this.state.showHeaderResponsive)
          }
        >
          <HeaderIcon showHeaderResponsive={this.state.showHeaderResponsive} />
        </div>
        <OptionsNav
          hideHeaderOptionsResponsive={this.hideHeaderOptionsResponsive}
          showHeaderResponsive={this.state.showHeaderResponsive}
        ></OptionsNav>
      </div>
    );
  }
}
function OptionsNav({ hideHeaderOptionsResponsive, showHeaderResponsive }) {
  if (!showHeaderResponsive) {
    return (
      <div className="menu_container">
        <div className="menu_container__options">
          <div className="options">
            <Search
              placeholder="Buscar un curso"
              onSearch={() => console.log("nulll")}
              className="search"
            />
          </div>
          <div className="options">
            <Link
              to={{
                pathname: `/`
              }}
            >
              <Button
                block
                onClick={() =>
                  hideHeaderOptionsResponsive(showHeaderResponsive)
                }
              >
                Inicio
              </Button>
            </Link>
          </div>
          <div className="options">
            <Link
              to={{
                pathname: `/courses`
              }}
            >
              <Button
                block
                onClick={() =>
                  hideHeaderOptionsResponsive(showHeaderResponsive)
                }
              >
                Todos los cursos
              </Button>
            </Link>
          </div>
          <div className="options">
            <Button block>Javascript</Button>
          </div>
          <div className="options">
            <Button block>Python</Button>
          </div>
          <div className="options">
            <Button block>Php</Button>
          </div>
        </div>
      </div>
    );
  }
  return null;
}
function HeaderIcon({ showHeaderResponsive }) {
  if (showHeaderResponsive) {
    return (
      <div>
        <div className="icon__container__lines"></div>
        <div className="icon__container__lines"></div>
        <div className="icon__container__lines"></div>
      </div>
    );
  } else {
    return (
      <div className="icon_circle">
        <span className="icon_circle__x">X</span>
      </div>
    );
  }
}

export default Header;
