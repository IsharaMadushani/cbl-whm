import React from 'react';
import { Collapse, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

import styles from './style';


export default function TransitionAlert (props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();
  const { children, severity, open, onClickClose, ...rest } = props;

  return (
    <div className={classes.root} {...rest} >
      <Collapse in={open}>
        <Alert variant="filled" severity={severity} action={
          <IconButton aria-label="close" color="inherit" size="small" onClick={onClickClose}>
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }>
          {children}
        </Alert>
      </Collapse>
    </div>
  );
}