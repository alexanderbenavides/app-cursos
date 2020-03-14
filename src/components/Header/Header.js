import React from "react";
import "./Header.scss";
import { Input, Button } from "antd";
const { Search } = Input;
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLines: true
    };
  }
  showOptions = e => {
    this.setState({
      showLines: !e
    });
  };
  render() {
    return (
      <div className="navigation">
        <div className="navigation__pc">
          <div className="navigation__pc__options">
            <div className="option__left">
              <Button type="link" block>
                Todos los cursos
              </Button>
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
          onClick={() => this.showOptions(this.state.showLines)}
        >
          <HeaderIcon showLines={this.state.showLines} />
        </div>
        <OptionsNav showLines={this.state.showLines}></OptionsNav>
      </div>
    );
  }
}
function OptionsNav({ showLines }) {
  if (!showLines) {
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
            <Button block>Todos los cursos</Button>
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
function HeaderIcon({ showLines }) {
  if (showLines) {
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
