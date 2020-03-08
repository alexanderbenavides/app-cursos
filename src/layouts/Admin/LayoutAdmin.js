import React from "react";
import { Route, Switch, Link, Redirect } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import "./LayoutAdmin.scss";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Menu } from "antd";
import { AppstoreOutlined, SettingOutlined } from "@ant-design/icons";
import LoginForm from "../../components/Admin/LoginForm";
import { getInfoUserApi } from "../../api/auth";

const { SubMenu, Item } = Menu;

function hookAdmin(Component) {
  return function WrappedComponent(props) {
    const { user, isLoading } = useAuth();
    return <Component {...props} user={user} isLoading={isLoading} />;
  };
}
class LayoutAdmin extends React.Component {
  rootSubmenuKeys = ["sub1", "sub2"];

  constructor(props) {
    super(props);
    this.state = {
      routes: props.routes,
      openKeys: ["sub1"]
    };
  }
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  };

  render() {
    const user = this.props.user;
    const isLoading = this.props.isLoading;
    if (!user && !isLoading) {
      return (
        <>
          <Route path="/admin/login" component={LoginForm} />
          <Redirect to="/admin/login" />
        </>
      );
    }
    if (user && !isLoading) {
      const { name, lastname, role } = getInfoUserApi();
      return (
        <div>
          <div>
            <section>
              <Header>Header...</Header>
            </section>
            <section className="section__profile">
              <div className="section__profile__information">
                <div className="section__profile__container">
                  <div>
                    <img
                      src="http://alexanderbenavides.herokuapp.com/img/perfil.1055441c.jpg"
                      alt="Not profile found"
                      className="section__profile__img"
                    />
                  </div>
                  <div className="section__profile__fulldata">
                    <span>Nombre: {name}</span>
                    <span>Apellidos: {lastname}</span>
                    <span>Rol: {role}</span>
                  </div>
                </div>
              </div>
            </section>
            <section className="layout__admin">
              <div className="layout__admin__left">
                <Menu
                  mode="inline"
                  openKeys={this.state.openKeys}
                  onOpenChange={this.onOpenChange}
                >
                  <SubMenu
                    key="sub1"
                    title={
                      <span>
                        <AppstoreOutlined />
                        <span>Inicio</span>
                      </span>
                    }
                  >
                    <Item key="1">
                      <Link to={"/admin"}>Admin</Link>
                    </Item>
                    <Item key="2">
                      <Link to={"/admin/users"}>Usuarios</Link>
                    </Item>
                  </SubMenu>
                  <SubMenu
                    key="sub2"
                    title={
                      <span>
                        <SettingOutlined />
                        <span>Cursos</span>
                      </span>
                    }
                  >
                    <Item key="2">
                      <Link to={"/admin/error"}>Error</Link>
                    </Item>
                  </SubMenu>
                </Menu>
              </div>
              <div className="layout__admin__right">
                <LoadRoutes routes={this.state.routes}></LoadRoutes>
              </div>
            </section>
            <section className="separator"></section>
            <Footer></Footer>
          </div>
        </div>
      );
    }
    return true;
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
LayoutAdmin = hookAdmin(LayoutAdmin);

export default LayoutAdmin;
