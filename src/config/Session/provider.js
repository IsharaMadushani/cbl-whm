import React, { Component } from "react";
import firebase from 'firebase';

export const AuthUserContext = React.createContext(null);
class AuthUserProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
            authUserRole: null
        };
    }

    componentDidMount() {
        this.listener = firebase.auth().onAuthStateChanged(
            authUser => {
                authUser
                    ? this.setState({ authUser })
                    : this.setState({ authUser: null });
            },
        );
    }

    componentWillUnmount() {
        this.listener();
    }

    updateUserRole = (role) => {
        this.setState({ authUserRole: role });
     }

    render() {
        return (
            <AuthUserContext.Provider value={{state: this.state, updateUserRole: this.updateUserRole}}>
                {this.props.children}
            </AuthUserContext.Provider>
        );
    }
}
export default AuthUserProvider;