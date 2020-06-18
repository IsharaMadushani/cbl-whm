import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import styles from "./style";


export default function MainPanel(props) {
  const { mainPanelRef, children, ...rest } = props;
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  
  return (
    <div {...rest} className={classes.mainPanel} ref={mainPanelRef}>
      <div className={classes.container}>{children}</div>
    </div>
  );
}