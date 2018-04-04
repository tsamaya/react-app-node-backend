import React, { Component } from 'react';

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  callAPI() {
    fetch('/api/hello')
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return {
          message: `error fetching API: [${response.status}]
          ${response.statusText}`,
        };
      })
      .then(data => this.setState({ message: data.message }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div>
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default Hello;
