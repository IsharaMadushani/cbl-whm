import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
import { AuthUserContext } from "../../config/Session";
 
const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      let authContextState = this.context.state;
      this.listener = firebase.auth().onAuthStateChanged(
        authUser => {
          if (!(authUser && condition(authContextState.authUserRole))) {
            this.props.history.push("./signin");
          }
        },
      );
    }
 
    componentWillUnmount() {
      this.listener();
    }
 
    render() {
      return (
        <Component {...this.props} />
      );
    }
  }

  WithAuthorization.contextType = AuthUserContext;
  return withRouter(WithAuthorization);
};
 
export default withAuthorization;