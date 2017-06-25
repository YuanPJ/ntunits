import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import user from './reducers';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

const store = createStore(
  user,
);

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
  ),
  document.getElementById('root'),
);

registerServiceWorker();
