import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./LayoutHome.scss";

class LayoutHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: props.routes
    };
  }
  render() {
    return (
      <div>
        <section>
          <Header>Header...</Header>
        </section>
        <section className="layout__home">
          <LoadRoutes routes={this.state.routes}></LoadRoutes>
        </section>
        <section className="separator"></section>
        <Footer></Footer>
      </div>
    );
  }
}
function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  );
}
export default LayoutHome;
