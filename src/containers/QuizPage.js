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
<<<<<<< HEAD
      data: {},
=======
      data: [{question:"", options:[""]}],
      user: {userID: "", userName: "", userPicURI: "", friendList: [], answer: [0,0,0,0,0,0,0,0,0,0,0,0,0]}
>>>>>>> 0bab2beb9a4559aa7d3fc1bda170e9ccb7c7292c
    };
    this.handleClose = this.handleClose.bind(this);
  }

<<<<<<< HEAD
  componentWillMount() {
    fetch('/api/quiz')
      .then(res => res.json())
      .then((data) => { this.setState({ data }); console.log(this.state.data)})
      .catch((err) => { console.log(err); });
  }

  handleOpen(i) {
    this.setState({ openDialog: true, number: i + 1 });
=======
  handleOpen(i) {
    // console.log(this.props.id)
    fetch('/api/quiz')
      .then(res => res.json())
      .then((quiz) => { this.setState({ data: quiz}); })
      .catch((err) => { console.log('fetch get quiz error',err); });
    this.setState({ openDialog: true, number: i+1 });
    
    fetch(`/api/user/${this.props.id}`)
      .then(res => res.json())
      .then(user => this.setState({user}))
      .catch(err => {console.log('fetch get user error',err)})

    console.log('handleOpen state',this.state);
>>>>>>> 0bab2beb9a4559aa7d3fc1bda170e9ccb7c7292c
  }

  handleClose() {
    this.setState({ openDialog: false });
  }

  render() {
    console.log('quizpage state',this.state.data);
    console.log('quizpage props',this.props)
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
          title={this.state.data[0].question}
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
