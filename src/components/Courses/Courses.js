import React from 'react';
import './Courses.scss';
class Courses extends React.Component {
  render() {
    return (
      <div className="course">
          <img src={`${this.props.course.imageSrc}`} alt="_blank"></img>
          <div className="courseContent">
            <div> {`${this.props.course.name}`} </div>
            <div> {`${this.props.course.description}`} </div>
          </div>
          <div className="duration"> {`${this.props.course.duration}`} </div>
      </div>
      
    );
  }
}

export default Courses;