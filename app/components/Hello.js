import React, { Component } from 'react';

class Hello extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  componentDidMount() {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => this.setState({ message: data.message }));
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
