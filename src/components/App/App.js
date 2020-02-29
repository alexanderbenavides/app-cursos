import React from "react";
import "./App.scss";
import CoursesList from "../CoursesList/CoursesList";
import Header from "../Header/Header";
import Clients from "../clientes/Cliente";
import axios from "axios";
import url from "../../api/urlRequest";

import { Route, NavLink, HashRouter } from "react-router-dom";

class App extends React.Component {
  state = {
    coursesList: []
  };

  componentDidMount() {
    axios.get(`${url}/courses`).then(res => {
      const coursesList = res.data.courses;
      this.setState({ coursesList });
    });
  }

  searchPost(data) {
    const coursesList = [];
    if (data.ok === true) {
      coursesList.push(data.course);
      this.setState({ coursesList });
    } else {
      this.setState({ coursesList });
      console.log(data);
    }
  }

  render() {
    return (
      <div className="App">
        <Header searchPost={this.searchPost.bind(this)}></Header>
        <HashRouter>
                  
          <div>
                      
            <ul className="header">
                          
              <li>
                <NavLink to="/clients">Clientes</NavLink>
              </li>
                          
              <li>
                <NavLink to="/cursos">Cursos</NavLink>
              </li>
              <h1>dkkdkdkdkkdkd</h1>
                        
            </ul>
                      
            <div className="content">
                          
              <Route path="/clients" component={Clients} />
              <Route
                path="/cursos"
                component={() => (
                  <CoursesList coursesData={this.state.coursesList} />
                )}
              />
                        
            </div>
                    
          </div>
                
        </HashRouter>
      </div>
    );
  }
}

export default App;
