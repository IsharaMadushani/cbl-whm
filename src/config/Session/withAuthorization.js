import React from 'react';
import { withRouter } from 'react-router-dom';
import firebase from 'firebase';
 
const withAuthorization = condition => Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = firebase.auth().onAuthStateChanged(
        authUser => {
          if (!condition(authUser)) {
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
 
  return withRouter(WithAuthorization);
};
 
export default withAuthorization;