import React from 'react';
import { CssBaseline, Grid } from '@material-ui/core';

import SideImage from './SideImage';
import Form from './Form';


export default function SideImageFormLayout(props) {
  const { sideImage, formBackgroundImage, children, ...rest } = props;

  return (
    <Grid container component="main" style={{ height: '100vh' }} {...rest} >
      <CssBaseline />
      <SideImage sideImage={sideImage} />
      <Form formBackgroundImage={formBackgroundImage} >{children}</Form>
    </Grid>
  );
}