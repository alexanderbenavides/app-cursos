import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
const { Header, Content, Footer } = Layout;

class LayoutHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routes: props.routes
    };
  }
  render() {
    return (
      <Layout>
        <Layout>
          <Header>Header...</Header>
          <Content>
            <LoadRoutes routes={this.state.routes}></LoadRoutes>
          </Content>
          <Footer>Alexander Benavides Cabrera</Footer>
        </Layout>
      </Layout>
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
