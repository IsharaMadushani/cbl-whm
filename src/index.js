import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import * as serviceWorker from './assets/serviceWorker';

import 'typeface-roboto';
import './layouts';
import './config/firebase';

import Theme from './assets/theme';
import AuthLoader from './utils/AuthLoader';
import { DashboardLayout } from './layouts';


const browserHistory = createBrowserHistory();
const authenticatedUser = AuthLoader();


ReactDOM.render(
  <Router history={browserHistory}>
    <Switch>
      <Theme>        
        <Route path="/admin" component={DashboardLayout} />
        <Redirect from="/" to="/admin/dashboard" />
      </Theme>
    </Switch>
  </Router>,
  document.getElementById('root')
);


serviceWorker.unregister();