import React from 'react';
import Typography from '@material-ui/core/Typography';


export default function Footer(props) {
  const { margins, ...rest } = props;

  const styles = {
    marginTop: margins[0],
    marginBottom: margins[1],
  }
  
  return (
    <div style={styles} {...rest} >
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright ©'} 2020 StoreX WMS | CBL | All Rights Reserved
      </Typography>
    </div>
  );
}