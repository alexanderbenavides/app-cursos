import React from "react";
import "./Header.scss";
class Header extends React.Component {
  render() {
    return (
      <div className="top-header" id="mytop-header">
        <a href="https://www.facebook.com/" className="active">
          Home
        </a>
        <a href="https://www.facebook.com/">News</a>
        <a href="https://www.facebook.com/">Contact</a>
        <a href="https://www.facebook.com/">About</a>
        <span className="icon">
          <i className="fa fa-bars"></i>
        </span>
      </div>
    );
  }
}
export default Header;
