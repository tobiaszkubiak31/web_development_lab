import React from 'react';
import axios from 'axios';

class App extends React.Component {

  state = {
    received: 'no data received',
  }

  change = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    axios.get(`http://localhost:4000/users`)
      .then(res => {
        this.setState({
          received: res.data,
        });
      })
  }

  render() {
    return (
      <div className="App">
          <p>
          {"Received data: " + this.state.received}
          </p>
      </div>
    )
  }
  
}

export default App;
