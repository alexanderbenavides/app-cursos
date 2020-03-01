import React from "react";
import { Route } from "react-router-dom";
import { Layout } from "antd";
import "./LayoutAdmin.scss";
const { Header, Content, Footer } = Layout;
class LayoutAdmin extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    return (
      <Layout>
        <h2>Menú Sider Admin</h2>
        <Layout>
          <Header>Header...</Header>
          <Content></Content>
          <Footer>Alexander Benavides Cabrera</Footer>
        </Layout>
      </Layout>
    );
  }
}

export default LayoutAdmin;
