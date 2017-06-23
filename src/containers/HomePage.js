import React, { Component } from 'react';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      name: '',
    };
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
      window.FB.Event.subscribe('auth.statusChange', this.statusChangeCallback);
    };
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  didLogin() {
    window.FB.api('/me', (res) => {
      this.setState({
        login: true,
        name: res.name,
      });
    });
  }
  didNotLogin() {
    this.props.setState({
      login: false,
      name: '',
    });
  }
  statusChangeCallback(response) {
    if (response.status === 'connected') {
      this.didLogin();
    } else {
      this.didNotLogin();
    }
  }
  checkLoginState() {
    window.FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    });
  }
  loginSection() {
    if (this.state.login === false) {
      return (
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="medium"
          data-button-type="continue_with"
          data-show-faces="false"
          data-auto-logout-link="false"
          data-use-continue-as="true"
        />
      );
    } else {
      return (
        <a className="btn cyan">Hi, {this.state.name}</a>
      );
    }
  }
  render() {
    return (
      <div>
        <div
          className="fb-login-button"
          data-max-rows="1"
          data-size="large"
          data-button-type="login_with"
          data-show-faces="false"
          data-auto-logout-link="true"
          data-use-continue-as="false"
        />
      </div>
    );
  }
}
