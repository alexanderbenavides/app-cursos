import React from "react";
import "./Header.scss";
class Header extends React.Component {
  render() {
    return (
      <div className="container-header">
        <a className="logo">CompanyLogo</a>
        <div className="container-header__right">
          <a className="active">Home</a>
          <a>Contact</a>
          <a>About</a>
        </div>
      </div>
    );
  }
}

export default Header;
