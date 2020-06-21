import React, { useContext } from "react";
import { AuthUserContext } from "../../../config/Session";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { makeStyles, Drawer, Hidden, List, ListItem, ListItemText } from "@material-ui/core";

import styles from "./style";
import routes from '../../../routes';
import sidebarBackgroundImage from '../../../images/sidebar-background.jpg';
import companyLogo from "../../../images/company-logo.png";

import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import firebase from 'firebase';
import SignInView from "../../../components/SignInView";


export default function Sidebar(props) {
  const useStyles = makeStyles(styles);
  const classes = useStyles();

  const authUser = useContext(AuthUserContext);

  function activeRoute(routeName) {
    return window.location.href.indexOf(routeName) > -1 ? true : false;
  }

  function getValidRoutes() {
    return authUser ? routes.filter(r => r.authReuired) : routes.filter(r => !r.authReuired);
  }

  function signOut() {
    firebase.auth().signOut()
      .then(() => {
        props.history.push('./signin');
      });
  }

  const links = (
    <List className={classes.list}>
      {getValidRoutes().map((prop, key) => {
        var listItemClasses = classNames({ [" " + classes.activeButton]: activeRoute(prop.layout + prop.path) });
        const whiteFontClasses = classNames({ [" " + classes.whiteFont]: activeRoute(prop.layout + prop.path) });

        return (
          <NavLink
            to={prop.layout + prop.path}
            className={classes.item}
            activeClassName="active"
            key={key} >

            <ListItem button className={classes.itemLink + listItemClasses}>
              <prop.icon className={classNames(classes.itemIcon, whiteFontClasses)} />
              <ListItemText
                primary={prop.name}
                className={classNames(classes.itemText, whiteFontClasses)}
                disableTypography={true} />
            </ListItem>
          </NavLink>
        );
      })}
    </List>
  );

  var authLinks = (
    <List className={classes.list} onClick={() => { signOut()}}>
      <ListItem button className={classes.itemLink}>
        <ExitToAppIcon className={classNames(classes.itemIcon)} />
        <ListItemText
          primary="Sign out"
          className={classNames(classes.itemText)}
          disableTypography={true} />
      </ListItem>
    </List>
  );

  var brand = (
    <div className={classes.logo}>
      <div className={classNames(classes.logoLink)} >
        <div className={classes.logoImage}>
          <img src={companyLogo} alt="logo" className={classes.img} />
        </div>
        {'TSEMS'}
      </div>
    </div>
  );

  return (
    <div>
      <Hidden mdUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={props.open}
          classes={{ paper: classNames(classes.drawerPaper) }}
          onClose={props.handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          <div className={classes.sidebarWrapper}>{authLinks}</div>
          <div
            className={classes.background}
            style={{ backgroundImage: "url(" + sidebarBackgroundImage + ")" }}
          />
        </Drawer>
      </Hidden>

      <Hidden smDown implementation="css">
        <Drawer
          anchor={"left"}
          variant="permanent"
          open
          classes={{ paper: classNames(classes.drawerPaper) }}
        >
          {brand}
          <div className={classes.sidebarWrapper}>{links}</div>
          <div className={classes.sidebarWrapper}>{authLinks}</div>
          <div
            className={classes.background}
            style={{ backgroundImage: "url(" + sidebarBackgroundImage + ")" }}
          />
        </Drawer>
      </Hidden>
    </div>
  );
}

Sidebar.propTypes = {
  handleDrawerToggle: PropTypes.func,
  open: PropTypes.bool
};