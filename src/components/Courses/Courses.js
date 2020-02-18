import React from 'react';
import './Courses.scss';
class Courses extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick(val) {
      console.log('Se hizo click', val);
    }
  render() {
    return (
      <div className="course"  value={this.props.course._id} onClick={() => this.handleClick(this.props.course._id)}>
          <img src={`${this.props.course.img ?this.props.course.img : 'https://cdn.codecademy.com/assets/components/cards/path-card/5d8a2f26510e9000118ef3b8.svg'}`} alt="_blank"></img>
          <div className="courseContent">
            <div> {`${this.props.course.title}`} </div>
            <div> {`${this.props.course.content}`} </div>
          </div>
          <div className="duration"> {`${this.props.course.duration_value} ${this.props.course.duration_text}`} </div>
      </div>
      
    );
  }
}

export default Courses;