import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import firebase from '../../config/Firebase'

import ProductLineLeader from './ProductionLineLeader'
import StoreKeepers from './StoreKeepers'
import WarehouseClerks from './WarehouseClerks'
import WarehouseOperators from './WarehouseOperators'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={(event) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [warehouse, setWarehouse] = React.useState();

  React.useEffect(() => {
    firebase.database().ref('warehouses').on('value', (snapshot) => {
      var warehouses = []
      if (snapshot.exists()) {
        snapshot.forEach((warehouse) => {
          let warehouseData = warehouse.val()
          warehouseData.key = warehouse.key
          warehouses.push(warehouseData)

        })
      }
      let obj1 = {}
      console.log(warehouses)
      warehouses.forEach(x => {
        obj1[x.key] = x.name
      })
      console.log(obj1)
      setWarehouse({
        warehouse: obj1
      })
    })

  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={handleChange}
          aria-label="nav tabs example"
        >
          <LinkTab label="Production Line Leader" href="/drafts" {...a11yProps(0)} />
          <LinkTab label="Store Keepers" href="/trash" {...a11yProps(1)} />
          <LinkTab label="Warehouse Clerks" href="/spam" {...a11yProps(2)} />
          <LinkTab label="Warehouse Operators" href="/spam" {...a11yProps(3)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <ProductLineLeader />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <StoreKeepers />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <WarehouseClerks warehouses={warehouse} />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <WarehouseOperators />
      </TabPanel>
    </div>
  );
}