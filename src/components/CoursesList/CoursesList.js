import React from 'react';
import './CourseList.scss';

import Courses from '../Courses/Courses';
class CoursesList extends React.Component {
  render() { 
    const objects = [
      {x: 1, y : 1},
      {x: 2, y : 3},
      {x: 3, y : 3},
      {x: 4, y : 4},
      {x: 5, y : 3}
    ]
    const getCount = objects => objects.filter(o => o.x==o.y).length;
    console.log(getCount(objects))
    
    return (
      <div >
        <h1 className="title">{ this.props.coursesData.title}</h1>
        <p className="subTitle">{ this.props.coursesData.description}</p>
        <div className="coursesList" >
          {
            this.props.coursesData.courses.map((course,i) => {
              return <Courses course={course} key={i} />
            })
          }
        </div>
      </div>
    );
  }
}

export default CoursesList;