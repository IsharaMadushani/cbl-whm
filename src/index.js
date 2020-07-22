import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import AuthUserProvider from './config/Session';
import * as serviceWorker from './assets/serviceWorker';
import 'typeface-roboto';
import './layouts';
import Theme from './assets/theme';
import { DashboardLayout } from './layouts';
import SignInView from "./components/SignInView";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import rootReducer from "./store/reducers/rootReducer";
import { createStore, applyMiddleware } from "redux";

import Users from './layouts/UsersLayout/Users'
import Warehouses from './layouts/WarehouseLayout/Warehouse'

const browserHistory = createBrowserHistory();
const store = createStore(rootReducer, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <AuthUserProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Switch>
          <Theme>
            <Route path="/signin" component={SignInView} />
            <Route path="/departmentHead" component={DashboardLayout} />
            <Route path="/managementStaff" component={DashboardLayout} />
            <Route path="/transferNotes" component={DashboardLayout} />
            <Route path="/dashboard" component={DashboardLayout} />
            <Route path="/users" component={Users} />
            <Route path="/warehouses" component={Warehouses} />
            <Redirect from="/" to="/signin" />
          </Theme>
        </Switch>
      </Router>
    </Provider>
  </AuthUserProvider>,
  document.getElementById('root'),
);


serviceWorker.unregister();