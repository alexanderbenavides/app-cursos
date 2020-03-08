import React from "react";
import {
  Route,
  // NavLink,
  // HashRouter,
  BrowserRouter as Router,
  // Link,
  Switch
} from "react-router-dom";
import routes from "../../config/routes";
import AuthProvider from "../../providers/AuthProvider";

// import "./App.scss";
// import CoursesList from "../CoursesList/CoursesList";
// import Header from "../Header/Header";
// import Clients from "../clientes/Cliente";
// import axios from "axios";
// import url from "../../api/urlRequest";
// import { DatePicker, Select } from "antd";
// import Admin from "../../pages/Admin";
// import Home from "../../pages/Home";
// import SignIn from "../../pages/Admin/SignIn";
// import LayoutAdmin from "../../layouts/Admin";
// import LayoutHome from "../../layouts/Home";
// const { Option } = Select;
// function handleChange(value) {
//   console.log(`selected ${value}`);
// }
// function error404() {
//   return <h1>Página no encontrada</h1>;
// }

class App extends React.Component {
  render() {
    return (
      // <AuthProvider>
      <AuthProvider>
        <Router>
          <Switch>
            {routes.map((route, index) => (
              <RouteWithSubRoutes key={index} {...route} />
            ))}
          </Switch>
        </Router>
      </AuthProvider>

      // <div className="App">
      //   <Header searchPost={this.searchPost.bind(this)}></Header>
      //   <DatePicker onChange={this.changeDate} />
      //   <SignIn></SignIn>
      //   <Admin></Admin>
      //   <Home></Home>
      //   <LayoutAdmin></LayoutAdmin>
      //   <LayoutHome></LayoutHome>
      //   <Router>
      //     <div>
      //
      //       <ul className="header">
      //
      //         <li>
      //           <Link to="/clients">Clientes</Link>
      //         </li>
      //
      //         <li>
      //           <Link to="/">Cursos</Link>
      //         </li>{" "}
      //
      //       </ul>
      //
      //       <div className="content">
      //         <Switch>
      //           <Route exact path="/clients" component={Clients} />
      //           <Route
      //             exact
      //             path="/"
      //             component={() => (
      //               <CoursesList coursesData={this.state.coursesList} />
      //             )}
      //           />
      //         </Switch>
      //
      //       </div>
      //
      //     </div>
      //   </Router>
      //   <Select
      //     defaultValue="lucy"
      //     style={{ width: 120 }}
      //     onChange={handleChange}
      //   >
      //     <Option value="jack">Jack</Option>
      //     <Option value="lucy">Lucy</Option>
      //     <Option value="disabled" disabled>
      //       Disabled
      //     </Option>
      //     <Option value="Yiminghe">yiminghe</Option>
      //   </Select>
      //
      // </div>
    );
  }
}
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props} />}
    />
  );
}
export default App;
