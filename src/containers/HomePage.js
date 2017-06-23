import React, { Component } from 'react';

export default class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      id: 0,
      name: '',
      pictureUrl: '',
    };
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
      window.FB.Event.subscribe('auth.login', this.statusChangeCallback);
    };
    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/zh_TW/sdk.js#xfbml=1&version=v2.9&appId=1743200029028560";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
  didLogin() {
    window.FB.api('/me', (res) => {
      this.setState({
        login: true,
        id: res.id,
        name: res.name,
      });
    });
    window.FB.api('/me/picture', (res) => {
      this.setState({
        pictureUrl: res.data.url,
      });
      this.props.setUserInfo(this.state.login, this.state.id, this.state.name, this.state.pictureUrl);
    });
    // console.log(this.state.login, this.state.id, this.state.name, this.state.pictureUrl);
    // this.props.setUserInfo(this.state.login, this.state.id, this.state.name, this.state.pictureUrl);
  }
  didNotLogin() {
    this.props.setState({
      login: false,
      name: '',
    });
  }
  statusChangeCallback(response) {
    console.log(response);
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
        <div>
          <div
            className="fb-login-button"
            data-max-rows="1"
            data-size="large"
            data-button-type="continue_with"
            data-show-faces="false"
            data-auto-logout-link="false"
            data-use-continue-as="false"
          />
        </div>
      );
    }
    return section;
  }
  render() {
    return (
      <div>
        {this.loginSection()}
      </div>
    );
  }
}
