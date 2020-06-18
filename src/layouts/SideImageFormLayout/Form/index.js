import React from 'react';
import { Paper, Grid, makeStyles } from '@material-ui/core';

import styles from './style';


export default function Form(props) {
  const { formBackgroundImage, children, ...rest } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
      <div style={{ backgroundImage: formBackgroundImage }} className={classes.container} {...rest} >
        {children}
      </div>
    </Grid>
  );
}