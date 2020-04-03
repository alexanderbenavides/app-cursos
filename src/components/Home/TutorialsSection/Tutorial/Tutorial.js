import React from "react";
import { Link } from "react-router-dom";
import "./Tutorial.scss";
class Tutorial extends React.Component {
  render() {
    return (
      <Link
        className="course"
        to={{
          pathname: `/tutorial/${this.props.tutorial._id}`
        }}
      >
        <img
          src={`${
            this.props.tutorial.img
              ? this.props.tutorial.img
              : "https://cdn.codecademy.com/assets/components/cards/path-card/5d8a2f26510e9000118ef3b8.svg"
          }`}
          alt="_blank"
        ></img>
        <div className="courseContent">
          <div> {`${this.props.tutorial.title}`} </div>
          <div> {`${this.props.tutorial.content}`} </div>
        </div>
        <div className="duration">
          {`${this.props.tutorial.duration_value} ${this.props.tutorial.duration_text}`}
        </div>
      </Link>
    );
  }
}

export default Tutorial;
