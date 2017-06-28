import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Checkbox from 'material-ui/Checkbox';
import 'bootstrap/dist/css/bootstrap.min.css';
import './QuizPage.css';
import QuizCell from '../components/QuizCell';
import BarChart from '../components/Chart';

export default class QuizPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDialog: false,
      openChart: false,
      number: 0,
      data: [
        { question: '', options: [''] },
        { question: '', options: [''] },
        { question: '', options: [''] },
        { question: '', options: [''] },
        { question: '', options: [''] },
        { question: '', options: [''] },
        { question: '', options: [''] },
        { question: '', options: [''] },
        { question: '', options: [''] },
        { question: '', options: [''] },
        { question: '', options: [''] },
        { question: '', options: [''] },
      ],
      user: {
        userID: '',
        userName: '',
        userPicURI: '',
        friendList: [],
        answer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    };
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen(i) {
    fetch('/api/quiz')
      .then(res => res.json())
      .then((quiz) => { this.setState({ data: quiz }); })
      .catch((err) => { console.log('fetch get quiz error', err); });
    this.setState({ openDialog: true, number: i });

    fetch(`/api/user/${this.props.id}`)
      .then(res => res.json())
      .then(user => this.setState({ user }))
      .catch((err) => { console.log('fetch get user error', err); });
    console.log('handleOpen state', this.state);
  }

  handleClose() {
    this.setState({ openDialog: false });
  }

  render() {
    console.log('quizpage state', this.state.data);
    console.log('quizpage props', this.props);
    const n = 12;
    const list = Array.from(Array(n).keys());
    const list_options = Array.from(Array(5).keys());
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
          title={this.state.data[this.state.number].question}
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          {list_options.map(i =>
            <Checkbox label={this.state.data[this.state.number].options[i]} key={`quizoptions-${i}`} />
          )}
        </Dialog>
        <Dialog
          title={this.state.data[this.state.number].question}
          actions={actions}
          modal={false}
          open={this.state.openChart}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
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
