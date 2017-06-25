import React, { Component } from 'react';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      id: 0,
      name: '',
      pictureUrl: '',
      friends: [],
    };
  }

  render() {
    return (
      <div>
        {this.loginSection()}
      </div>
    );
  }
}
