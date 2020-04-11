import React from "react";
import { Link } from "react-router-dom";
import "./Tutorial.scss";
class Tutorial extends React.Component {
  render() {
    const dinamic = "/uploads/tutorials";
    const baseUrl = window.$baseUrl;
    const baseImgUrl = `${baseUrl}${dinamic}`;
    return (
      <Link
        className="course"
        to={{
          pathname: `/tutorial/${this.props.tutorial._id}`,
        }}
      >
        <img
          src={`${baseImgUrl}/${this.props.tutorial.img}`}
          alt="_blank"
        ></img>
        <div className="courseContent">
          <div> {`${this.props.tutorial.title}`} </div>
          <div> {`${this.props.tutorial.description}`} </div>
        </div>
        <div className="duration">
          {`${this.props.tutorial.duration_value} ${this.props.tutorial.duration_text}`}
        </div>
      </Link>
    );
  }
}

export default Tutorial;
