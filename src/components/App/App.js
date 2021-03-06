import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import routes from "../../config/routes";
import AuthProvider from "../../providers/AuthProvider";

class App extends React.Component {
  render() {
    return (
      <AuthProvider>
        <Router>
          <Switch>
            {routes.map((route, index) => (
              <RouteWithSubRoutes key={index} {...route} />
            ))}
          </Switch>
        </Router>
      </AuthProvider>
    );
  }
}
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props) => <route.component routes={route.routes} {...props} />}
    />
  );
}
export default App;
