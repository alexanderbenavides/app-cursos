import React from "react";
import { PlusCircleOutlined } from "@ant-design/icons";

import "./Users.scss";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log("Hola mundo");
  }
  render() {
    return (
      <div className="user__page">
        <h1>Página de users</h1>
        <PlusCircleOutlined onClick={this.handleClick} />
      </div>
    );
  }
}

export default Users;
