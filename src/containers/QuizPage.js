import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QuizPage.css';
import QuizCell from '../components/QuizCell';
import BarChart from '../components/Chart';

export default class QuizPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      number: 0,
      data: {},
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(i) {
    fetch('/api/quiz')
      .then(res => res.json())
      .then((data) => { this.setState({ data }); })
      .catch((err) => { console.log(err); });
    this.setState({ openDialog: true, number: i+1 });
    console.log(this.state.data);
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
          title="a"
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          {/*{this.state.data[this.state.number].question}*/}
          {this.state.number}
          <BarChart />
        </Dialog>
        <div className="row">
          {list.map(i =>
            (<div className="col-xs-6 col-sm-4 col-md-3 nopadding" key={`quizcell-${i}`}>
              <div onClick={() => this.handleOpen(i)}>
                <QuizCell />
              </div>
            </div>),
          )}
        </div>
      </div>
    );
  }
}