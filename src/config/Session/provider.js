import React, { Component } from "react";
import firebase from 'firebase';

export const AuthUserContext = React.createContext(null);
class AuthUserProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            authUser: null,
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

    render() {
        return (
            <AuthUserContext.Provider value={this.state.authUser}>
                {this.props.children}
            </AuthUserContext.Provider>
        );
    }
}
export default AuthUserProvider;