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
    const pathname = new URL(window.location.href).pathname;
    const islesson = pathname.split("/")[1] === "lessons" ? true : false;
    const hidelayout = islesson ? "hide__layout" : "";
    return (
      <div>
        <ShowLayouts islesson={islesson} from="header"></ShowLayouts>
        <section className={`layout__home ${hidelayout}`}>
          <LoadRoutes routes={this.state.routes}></LoadRoutes>
        </section>
        <ShowLayouts islesson={islesson} from="separator"></ShowLayouts>
        <ShowLayouts islesson={islesson} from="footer"></ShowLayouts>
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
function ShowLayouts({ islesson, from }) {
  switch (from) {
    case "header":
      if (!islesson) {
        return (
          <section>
            <Header>Header...</Header>
          </section>
        );
      }
      break;
    case "footer":
      if (!islesson) {
        return <Footer></Footer>;
      }
      break;
    case "separator":
      if (!islesson) {
        return <section className="separator"></section>;
      }
      break;
    default:
      break;
  }

  return null;
}
export default LayoutHome;
