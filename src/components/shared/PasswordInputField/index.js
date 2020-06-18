import React, { useState } from 'react';
import { IconButton, OutlinedInput, InputLabel, InputAdornment, FormHelperText, FormControl, makeStyles } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';

import styles from './style';


export default function PasswordInputField(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { label, labelWidth, error, helperText, value, onChange, disabled, ...rest } = props;
  
  const [showPassword, setShowPassword] = useState(false);

  return (
    <FormControl className={classes.passwordInputField} variant="outlined" {...rest}>
      <InputLabel htmlFor="outlined-adornment-password" error={error}>{label} *</InputLabel>
      <OutlinedInput
        labelWidth={labelWidth}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        error={error}
        autoComplete={"password"}
        disabled={disabled}
        endAdornment={
          <InputAdornment position="end">
            <IconButton 
              aria-label="toggle password visibility"
              edge="end" disabled={disabled}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />
      <FormHelperText error={error} required >{helperText}</FormHelperText>
    </FormControl>
  );
}