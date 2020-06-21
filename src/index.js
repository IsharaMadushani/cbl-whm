import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import FirebaseProvider from './config/Firebase';
import AuthUserProvider from './config/Session';
import * as serviceWorker from './assets/serviceWorker';
import 'typeface-roboto';
import './layouts';
import Theme from './assets/theme';
import { DashboardLayout } from './layouts';

const browserHistory = createBrowserHistory();

ReactDOM.render(
  <FirebaseProvider>
    <AuthUserProvider>
      <Router history={browserHistory}>
        <Switch>
          <Theme>
            <Route path="/admin" component={DashboardLayout} />
            <Redirect from="/" to="/admin/dashboard" />
          </Theme>
        </Switch>
      </Router>
    </AuthUserProvider>
  </FirebaseProvider>,
  document.getElementById('root'),
);


serviceWorker.unregister();