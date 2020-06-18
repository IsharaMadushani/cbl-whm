import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import styles from './style';


export default function CustomButton(props) {
  const { children, textButton, ...rest } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <Button
      classes={{
        root: textButton ? null : classes.root,
        label: textButton ? classes.label : null
      }}
      color={"primary"}
      {...rest}
    >
      {children || 'Button'}
    </Button>
  );
}