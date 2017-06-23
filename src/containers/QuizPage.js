import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QuizPage.css';
import QuizCell from '../components/QuizCell';

export default class QuizPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  handleOpen() {
    this.setState({ openDialog: true });
  }
  handleClose() {
    this.setState({ openDialog: false });
  }
  render() {
    const n = 13;
    const list = Array.from(Array(n).keys());
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];
    return (
      <div className="container-fluid">
        <Dialog
          title="Dialog With Actions"
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        />
        <div className="row">
          {list.map(i =>
            (<div className="col-xs-6 col-sm-4 col-md-3 nopadding" key={`quizcell-${i}`}>
              <div onClick={this.handleOpen}>
                <QuizCell />
              </div>
            </div>),
          )}
        </div>
      </div>
    );
  }
}