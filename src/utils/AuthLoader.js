import firebase from 'firebase';


export default function AuthLoader () {
  const userAuthStatus = firebase.auth().onAuthStateChanged((user) => {
    if (user) { return true}
    else { return false }
  });

  return userAuthStatus;
}