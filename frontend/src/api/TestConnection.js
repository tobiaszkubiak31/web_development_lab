import React from "react";

import axios from "axios";

export default class TestConnection extends React.Component {
  state = {
    test: "problem connection",
  };

  componentDidMount() {
    axios.get(`http://localhost:8080/greeting`).then((res) => {
      this.setState({ test: res.data });
    });
  }

  render() {
    return (
      <ul>
        <li>{this.state.test}</li>
      </ul>
    );
  }
}
