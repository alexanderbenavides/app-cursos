import React from "react";
import {
  Route,
  // NavLink,
  // HashRouter,
  BrowserRouter as Router,
  Link,
  Switch
} from "react-router-dom";
import "./App.scss";
import CoursesList from "../CoursesList/CoursesList";
import Header from "../Header/Header";
import Clients from "../clientes/Cliente";
import axios from "axios";
import url from "../../api/urlRequest";
import { DatePicker, Select } from "antd";
import Admin from "../../pages/Admin";
import Home from "../../pages/Home";
const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
function error404() {
  return <h1>Página no encontrada</h1>;
}

class App extends React.Component {
  state = {
    coursesList: []
  };

  constructor(props) {
    super(props);
    this.changeDate = this.changeDate.bind(this);
  }

  componentDidMount() {
    axios.get(`${url}/courses`).then(res => {
      const coursesList = res.data.courses;
      this.setState({ coursesList });
    });
  }
  changeDate(e) {
    console.log(e._d);
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
        <DatePicker onChange={this.changeDate} />
        <Admin></Admin>
        <Home></Home>
        <Router>
          <div>
                      
            <ul className="header">
                          
              <li>
                <Link to="/clients">Clientes</Link>
              </li>
                          
              <li>
                <Link to="/">Cursos</Link>
              </li>{" "}
                        
            </ul>
                      
            <div className="content">
              <Switch>
                <Route exact path="/clients" component={Clients} />
                <Route
                  exact
                  path="/"
                  component={() => (
                    <CoursesList coursesData={this.state.coursesList} />
                  )}
                />
                <Route component={error404} />
              </Switch>
                        
            </div>
                    
          </div>
        </Router>
        <Select
          defaultValue="lucy"
          style={{ width: 120 }}
          onChange={handleChange}
        >
          <Option value="jack">Jack</Option>
          <Option value="lucy">Lucy</Option>
          <Option value="disabled" disabled>
            Disabled
          </Option>
          <Option value="Yiminghe">yiminghe</Option>
        </Select>
              
      </div>
    );
  }
}

export default App;
