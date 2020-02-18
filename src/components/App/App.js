import React from 'react';
import './App.scss';
import CoursesList from '../CoursesList/CoursesList';
import Header from '../Header/Header';
import coursesData from '../../api/Data';
import Clients from '../clientes/Cliente';
import axios from 'axios';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

class App extends React.Component {
  state = {
    persons: []
  }

  componentDidMount() {
    axios.get(`https://jsonplaceholder.typicode.com/users`)
      .then(res => {
        const persons = res.data;
        this.setState({ persons });
      })
  }

  searchPost(data) {
    console.log("datita",data)
   }

  render() {
    console.log("personas",this.state.persons);
    return (
      <div className="App">
        <Header searchPost={this.searchPost.bind(this)}></Header>
        <HashRouter>
          <div>
            <ul className="header">
              <li><NavLink to="/clients">Clientes</NavLink></li>
              <li><NavLink to="/cursos">Cursos</NavLink></li>
            </ul>
            <div className="content">
              <Route path="/clients" component={Clients}/>
              <Route path="/cursos" component={() => <CoursesList  coursesData={coursesData} />} /> 
            </div>
          </div>
        </HashRouter>
     </div>
    );
  }
}

export default App;