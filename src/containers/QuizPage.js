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
      checked: [false, false, false, false, false],
      data: [
        { question: '', options: [''] }
        // { question: '', options: [''] },
        // { question: '', options: [''] },
        // { question: '', options: [''] },
        // { question: '', options: [''] },
        // { question: '', options: [''] },
        // { question: '', options: [''] },
        // { question: '', options: [''] },
        // { question: '', options: [''] },
        // { question: '', options: [''] },
        // { question: '', options: [''] },
        // { question: '', options: [''] },
      ],
      user: {
        userID: '',
        userName: '',
        userPicURI: '',
        friendList: [],
        answer: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen(i) {
    fetch('/api/quiz')
      .then(res => res.json())
      .then((quiz) => { this.setState({ data: quiz }); })
      .catch((err) => { console.log('fetch get quiz error', err); });
    if (this.state.user.answer[i] === 0) {
      this.setState({ openDialog: true, number: i });
    } else {
      this.setState({ openChart: true, number: i });
    }
    fetch(`/api/user/${this.props.id}`)
      .then(res => res.json())
      .then(user => this.setState({ user }))
      .catch((err) => { console.log('fetch get user error', err); });
    console.log('handleOpen state', this.state);
  }

  handleClose() {
    this.setState({
      openDialog: false,
      openChart: false,
      checked: [false, false, false, false, false],
    });
  }

  handleCheck(i) {
    const checked = this.state.checked;
    for (let j = 0; j < 5; j++) {
      if (i === j) {
        checked[j] = true;
      } else { checked[j] = false; }
    }
    this.setState({ checked });
  }

  handleSubmit() {
    let allNotChecked = 1;
    for (let i = 0; i < 5; i++) {
      if (this.state.checked[i] === true) {
        allNotChecked = 0;
      }
    }
    if (allNotChecked === 1) {
      alert('you must choose one!');
      return;
    }

    const answer = this.state.user.answer;
    for (let i = 0; i < 5; i++) {
      if (this.state.checked[i] === true) {
        answer[this.state.number] = i + 1;
      }
    }
    fetch(`/api/user/${this.props.id}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        answer,
      }),
    })
      .then(res => res.json())
      .catch((err) => { console.log('fetch put answer error', err); });
    this.setState({
      openDialog: false,
      openChart: true,
      checked: [false, false, false, false, false],
    });
  }

  render() {
    console.log('quizpage state user', this.state.user);
    console.log('quizpage props', this.props);
    const n = 12;
    const list = Array.from(Array(n).keys());
    const listOptions = Array.from(Array(5).keys());
    const num = this.state.number;
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
        onTouchTap={this.handleSubmit}
      />,
    ];

    return (
      <div className="container-fluid">
        <Dialog
          title={this.state.data[num].question}
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          {listOptions.map(i =>
            (<Checkbox
              label={this.state.data[num].options[i]}
              key={`quizoptions-${i}`}
              onCheck={() => this.handleCheck(i)}
              checked={this.state.checked[i]}
            />),
          )}
        </Dialog>

        <Dialog
          title={this.state.data[num].question}
          modal={false}
          open={this.state.openChart}
          onRequestClose={this.handleClose}
          autoScrollBodyContent={true}
        >
          <BarChart num={num} data={this.state.data[num].options} />
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
