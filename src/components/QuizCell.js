import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QuizCell.css';

export default class QuizCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <img src="https://ih1.redbubble.net/image.269161951.3614/flat,800x800,075,t.u1.jpg" className="img-responsive" alt="" />
      </div>
    );
  }
}
