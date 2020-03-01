import React from "react";
import { Route, Switch } from "react-router-dom";
import "./LayoutAdmin.scss";
import Header from "../../components/Admin/Header";
class LayoutAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: props.routes
    };
  }

  render() {
    return (
      <div>
        <div>
          <section>
            <Header>Header...</Header>
          </section>
          <section>
            <LoadRoutes routes={this.state.routes}></LoadRoutes>
          </section>
          <section className="container-footer">
            <footer>Alexander Benavides Cabrera</footer>
          </section>
        </div>
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

export default LayoutAdmin;
