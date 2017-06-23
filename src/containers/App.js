import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Route, Switch } from 'react-router-dom';
import Header from '../components/Header';
import HomePage from './HomePage';
import QuizPage from './QuizPage';
import './App.css';

injectTapEventPlugin();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      id: 0,
      name: '',
      pictureUrl: '',
    };
    this.setUserInfo = this.setUserInfo.bind(this);
  }
  setUserInfo(login, id, name, pictureUrl) {
    this.setState({
      login,
      id,
      name,
      pictureUrl,
    });
    console.log(login, id, name, pictureUrl);
  }
  homePage() {
    return (
      <HomePage setUserInfo={this.setUserInfo} />
    );
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={() => this.homePage()} />
            <Route exact path="/quiz" component={QuizPage} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

