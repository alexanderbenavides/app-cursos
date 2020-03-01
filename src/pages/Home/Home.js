import React from "react";
import axios from "axios";
import url from "../../api/urlRequest";

import CoursesList from "../../components/Home/CoursesSection";
class Home extends React.Component {
  state = {
    coursesList: []
  };

  componentDidMount() {
    axios.get(`${url}/courses`).then(res => {
      const coursesList = res.data.courses;
      this.setState({ coursesList });
    });
  }

  render() {
    return (
      <div className="Home">
        <CoursesList coursesData={this.state.coursesList} />
      </div>
    );
  }
}

export default Home;
