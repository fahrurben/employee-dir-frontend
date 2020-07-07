import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header';
import Login from './pages/Login';
import Home from './pages/Home';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import configureStore from './configureStore';

const store = configureStore();

ReactDOM.render(
  <React.StrictMode>
      <Provider store={store}>
          <Router>
              <div className="container mx-auto">
                  <Header/>
                  <Route exact path="/Home" component={Home} />
                  <Route exact path="/" component={Login} />
              </div>
          </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
