import React from 'react';
import './CourseList.scss';

import Courses from '../Courses/Courses';
class CoursesList extends React.Component {
  render() {
    return (
      <div >
        {/* <h1 className="title">{ this.props.coursesData.title}</h1>
        <p className="subTitle">{ this.props.coursesData.description}</p> */}
        <div className="coursesList" >
          {
            this.props.coursesData.map((course,i) => {
              return <Courses course={course} key={i} />
            })
          }
        </div>
      </div>
    );
  }
}

export default CoursesList;