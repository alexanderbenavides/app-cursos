import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

import "./Admin.scss";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("Hola mundo");
  }
  render() {
    return (
      <div className="admin__page">
        <h1>Este es el admin</h1>
        <PlusCircleOutlined onClick={this.handleClick} />
      </div>
    );
  }
}

export default Admin;
