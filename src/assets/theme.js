import React from 'react';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2'
    },
  },
});


export default function Theme(props) {
  const { children, ...rest } = props;

  return (
      <ThemeProvider theme={theme} {...rest} >
        {children}
      </ThemeProvider>
  );
}
