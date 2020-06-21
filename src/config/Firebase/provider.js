import React, { Component } from "react";
import Firebase from './firebase';

export const FirebaseContext = React.createContext(null);
class FirebaseProvider extends Component {  
  render() {
    return (
      <FirebaseContext.Provider value={new Firebase()}>
        {this.props.children}
      </FirebaseContext.Provider>
    );
  }
}
export default FirebaseProvider;