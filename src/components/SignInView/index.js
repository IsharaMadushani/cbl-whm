import React, { useState, useContext } from 'react';
import { Avatar, TextField, FormControlLabel, Checkbox, Typography, CircularProgress, Zoom, Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import CheckIcon from '@material-ui/icons/Check';
import firebase from 'firebase';
import styles from './style';
import SideImageFormLayout from '../../layouts/SideImageFormLayout';
import PasswordInputField from '../shared/PasswordInputField'
import Button from '../shared/Button';
import TransitionAlert from '../shared/TransitionAlert';
import Footer from '../shared/Footer';
import EmailValidator from '../../utils/EmailValidator';
import { AuthUserContext } from "../../config/Session";
import UserRoles from "../../constants/roles.js";

export default function SignInView (props) {
  const authUser = useContext(AuthUserContext);
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [rememberMe, setRememberMe] = useState(true);

  
  const handleOnChangeEmail = (email) => {
    if(error) { setError(false) }
    if(emailError) { setEmailError(null) }
    setEmail(email);

  }

  const handleOnChangePassword = (password) => {
    if(error) { setError(false) }
    if(passwordError) { setPasswordError(null) }
    setPassword(password);
  }


  const validateInputs = () => {
    if(!email || !password) {
      if(!email)    { setEmailError("Enter email address") }
      if(!password) { setPasswordError("Enter password") }
    }
    else if(!EmailValidator(email)) {
      setEmailError("Invalid email address");
    }
    else {
      setLoading(true);
      signInUser();
    }
  }


  const signInUser = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => _verifyUser())
      .catch(() => { setError(true); setLoading(false) });
  }


  const _verifyUser = () => {
    const userId = firebase.auth().currentUser.uid;    
    firebase.database().ref('users/managementStaff').child(userId).once('value', (snapshot) => {
      if(snapshot.exists()) {
        setSuccess(true);
        authUser.updateUserRole(UserRoles.ManagementStaff);
        setTimeout(() => props.history.push('./managementStaff/dashboard'), 1000);
      }
      else {
        firebase.database().ref('users/departmentHead').child(userId).once('value', (snapshot) => {
          if(snapshot.exists()) {
            setSuccess(true);
            authUser.updateUserRole(UserRoles.DepartmentHead);
            setTimeout(() => props.history.push('./departmentHead/dashboard'), 1000);
          }
          else {
            firebase.auth().signOut()
              .then(() => { setError(true); setLoading(false) });
          }
        })        
      }
    });
  }

  

  return (
    <SideImageFormLayout
      sideImage={`url(${require('../../images/signin-sideImage.jpg')})`}
      formBackgroundImage={`url(${require('../../images/form-background.jpg')})`}
    >
      <div className={classes.container} >
        <div className={classes.avatarActivityIndicator}>
          <Zoom in={success} timeout={{ enter: 250, exit: 250 }} >
            <Avatar className={classes.avatarSuccess}><CheckIcon /></Avatar>
          </Zoom>
          <Zoom in={!success} timeout={{ enter: 250, exit: 250 }} >
            <Avatar className={classes.avatarSignIn}><LockOutlinedIcon /></Avatar>
          </Zoom>
          <Fade in={loading} timeout={{ enter: 250, exit: 250 }} >
            <CircularProgress size={52} className={classes.fabProgress} />
          </Fade>
        </div>

        <Typography component="h1" variant="h5">Sign in</Typography>

        <TransitionAlert severity={"error"} className={classes.alert} open={error} onClickClose={() => setError(false)} >
          Invalid username and/or password!
        </TransitionAlert>

        <form className={classes.form} noValidate>
          <TextField
            variant="outlined" margin="normal" disabled={loading}
            required fullWidth autoFocus
            label="Email Address" autoComplete="email" value={email}
            onChange={(event) => handleOnChangeEmail(event.target.value)}
            error={emailError ? true : false} helperText={emailError}
          />
          <PasswordInputField
            fullWidth disabled={loading}
            label={"Password"} labelWidth={85} value={password}
            onChange={(event) => handleOnChangePassword(event.target.value)}
            error={passwordError ? true : false} helperText={passwordError}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} />}
            label="Remember Me" disabled={loading}
            style={{ marginTop: 10 }}
          />
      
          <Button onClick={validateInputs} className={classes.button} fullWidth disabled={loading} >SIGN IN</Button>

          <Button textButton fullWidth disabled={loading} >Forgot password?</Button>

        </form>

        <Footer margins={[40]} />

      </div>
    </SideImageFormLayout>
  );
}