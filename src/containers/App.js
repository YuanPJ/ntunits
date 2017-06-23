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
    };
  }
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <Body />
        </div>
      </MuiThemeProvider>
    );
  }
}

const Body = () => (
  <Switch>
    <Route exact path="/" component={HomePage} />
    <Route exact path="/quiz" component={QuizPage} />
  </Switch>
);
