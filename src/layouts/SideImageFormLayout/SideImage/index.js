import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';

import styles from './style';


export default function SideImage(props) {
  const { sideImage, children, ...rest } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  return (
    <Grid item xs={false} sm={4} md={7} className={classes.container} style={{ backgroundImage: sideImage}} {...rest} />
  );
}