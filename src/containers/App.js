import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from '../components/Header';
import QuizPage from './QuizPage';
import './App.css';

injectTapEventPlugin();

const setUserState = (login, id, name, pictureUrl, friends) => ({
  type: 'SET_USER_STATE',
  payload: {
    login,
    id,
    name,
    pictureUrl,
    friends,
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.props.state;
    // this.state = {
    //   login: false,
    //   id: 0,
    //   name: '',
    //   pictureUrl: '',
    //   friends: []
    // };
    // this.setState(
      // this.props,
    // );
    console.log('construct', this.props);
    this.getFriends = this.getFriends.bind(this);
    this.didLogin = this.didLogin.bind(this);
    this.didNotLogin = this.didNotLogin.bind(this);
    this.statusChangeCallback = this.statusChangeCallback.bind(this);
  }
  componentDidMount() {
    window.fbAsyncInit = () => {
      window.FB.init({
        appId: '1743200029028560',
        cookie: true,
        xfbml: true,
        version: 'v2.9',
      });
      window.FB.AppEvents.logPageView();
      window.FB.getLoginStatus(function(response) {
        console.log('component mount', response)
      });
      window.FB.Event.subscribe('auth.authResponseChange', this.statusChangeCallback);
    };
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.9&appId=1743200029028560";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  getFriends(res) {
    const newFriends = [];
    for (let i = 0; i < res.data.size; i += 1) {
      newFriends.push(res.data[i].id);
    }
    let friends = this.state.friends;
    friends = friends.concat(newFriends);
    this.setState({ friends });
    if ('paging' in res && 'next' in res.paging) {
      window.FB.api(res.paging.next, this.getFriends);
    } else {
      this.setState({ friends });
    }
  }
  didLogin() {
    window.FB.api('/me', (res) => {
      console.log('didLogin response',res)
      this.setState({
        login: true,
        id: res.id,
        name: res.name,
      });
    });
    window.FB.api('/me/friends', this.getFriends);
    window.FB.api('/me/picture', (res) => {
      this.setState({
        pictureUrl: res.data.url,
      });
    });

    fetch('/api/user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userID: this.state.id,
        userName: this.state.name,
        userPicURI: this.state.pictureUrl,
        friendList: this.state.friends
      }),
    })
    setTimeout(this.props.setUserState(this.state.login, this.state.id, this.state.name, this.state.pictureUrl, this.state.friends), 1000);
    setTimeout(() => console.log('didLogin', this.props), 2000);
    setTimeout(() => console.log(this.state.login, this.state.id, this.state.name, this.state.pictureUrl, this.state.friends), 2000);
  }
  didNotLogin() {
    this.props.setState({
      login: false,
      name: '',
    });
  }
  statusChangeCallback(response) {
    console.log('callback response',response)
    if (response.status === 'connected') {
      this.didLogin();
      // window.location = '/quiz';
    } else { // else 後用不到，我們無法登出FB，以防萬一留著
      this.didNotLogin();
    }
  }
  loginSection() {
    let section = {};
    if (this.state.login === true) {
      section = (
        <div>Hi, {this.state.name}</div>
      );
    } else {
      section = (
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="large"
          data-button-type="continue_with"
          data-show-faces="false"
          data-auto-logout-link="false"
          data-use-continue-as="false"
        />
      );
    }
    return section;
  }
  homePage() {
    return (
      <div className="home-page">
        <div className="FBLogin">
          {this.loginSection()}
        </div>
      </div>
    );
  }
  // renderQuizPage() {
  //   console.log(this.state)
  //   return <QuizPage 
  //     login={this.state.login}
  //     id={this.state.id}
  //     name={this.state.name}
  //     pictureUrl={this.state.pictureUrl}
  //     friends={this.state.friends}/>
  // }
  render() {
    console.log(this.state)
    const renderQuizPage = () => {
      return <QuizPage       
        login={this.state.login}
        id={this.state.id}
        name={this.state.name}
        pictureUrl={this.state.pictureUrl}
        friends={this.state.friends}/>
    }
    return (
      <MuiThemeProvider>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={() => this.homePage()} />
            <Route exact path="/quiz" component={renderQuizPage} />
          </Switch>
        </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
  setUserState: (login, id, name, pictureUrl, friends) => {
    // dispatch(setUserState(login, id, name, pictureUrl, friends));
    dispatch({
      type: 'SET_USER_STATE',
      payload: {
        login,
        id,
        name,
        pictureUrl,
        friends,
      },
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
