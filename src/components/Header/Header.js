import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./Header.scss";
import { Input, Button } from "antd";
const { Search } = Input;
function Header() {
  const [showHeaderResponsive, setShowHeaderResponsive] = useState(true);
  const showHeaderOptionsResponsive = (val) => {
    setShowHeaderResponsive(!val);
  };
  const hideHeaderOptionsResponsive = (val) => {
    setShowHeaderResponsive(!val);
  };

  const serachCourse = (e) => {
    window.location.href = `#/courses/${e}`;
  };
  return (
    <div className="navigation">
      <div className="navigation__pc">
        <div className="navigation__pc__options">
          <div className="option__left">
            <Link
              to={{
                pathname: `/`,
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
                pathname: `/courses/all`,
              }}
            >
              <Button type="link" block>
                Todos los cursos
              </Button>
            </Link>
          </div>
          <div className="option__left">
            <Link
              to={{
                pathname: `/tutorials`,
              }}
            >
              <Button type="link" block>
                Tutoriales
              </Button>
            </Link>
          </div>
          <div className="option__left">
            <Link
              to={{
                pathname: `/projects`,
              }}
            >
              <Button type="link" block>
                Proyectos
              </Button>
            </Link>
          </div>
          <div className="option__left">
            <Link
              to={{
                pathname: `/courses/JavaScript`,
              }}
            >
              <Button type="link" block>
                Javascript
              </Button>
            </Link>
          </div>
          <div className="option__left">
            <Link
              to={{
                pathname: `/courses/Python`,
              }}
            >
              <Button type="link" block>
                Python
              </Button>
            </Link>
          </div>
          <div className="option__left">
            <Link
              to={{
                pathname: `/courses/Php`,
              }}
            >
              <Button type="link" block>
                Php
              </Button>
            </Link>
          </div>
        </div>
        <div className="navigation__pc__options">
          <div>
            <Search
              placeholder="Buscar un curso"
              onSearch={(e) => serachCourse(e)}
              className="search"
            />
          </div>
        </div>
      </div>
      <div
        className="icon__container"
        onClick={() => showHeaderOptionsResponsive(showHeaderResponsive)}
      >
        <HeaderIcon showHeaderResponsive={showHeaderResponsive} />
      </div>
      <OptionsNav
        hideHeaderOptionsResponsive={hideHeaderOptionsResponsive}
        showHeaderResponsive={showHeaderResponsive}
      ></OptionsNav>
    </div>
  );
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
                pathname: `/`,
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
                pathname: `/courses/all`,
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
            <Link
              to={{
                pathname: `/tutorials`,
              }}
            >
              <Button
                block
                onClick={() =>
                  hideHeaderOptionsResponsive(showHeaderResponsive)
                }
              >
                Tutoriales
              </Button>
            </Link>
          </div>
          <div className="options">
            <Link
              to={{
                pathname: `/courses/JavaScript`,
              }}
            >
              <Button type="link" block>
                Javascript
              </Button>
            </Link>
          </div>
          <div className="options">
            <Link
              to={{
                pathname: `/courses/Python`,
              }}
            >
              <Button type="link" block>
                Python
              </Button>
            </Link>
          </div>
          <div className="options">
            <Link
              to={{
                pathname: `/courses/Php`,
              }}
            >
              <Button type="link" block>
                Php
              </Button>
            </Link>
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
