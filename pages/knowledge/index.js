/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Grid, Box, AppBar, Tabs, Typography, Tab, useTheme } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles'

import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import SwipeableViews from 'react-swipeable-views';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { inject, observer } from 'mobx-react'

import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll'
//import Background from '../../components/OtherComponents/Background/Background.js'
//import Modules from '../../garbage/Modules';
import Pages from '../../components/PagesComponents/Knowledge/Pages';
//import Moderate from '../../components/PagesComponents/Knowledge/Moderate';
//import Other from '../../garbage/Other';

const AntTabs = withStyles((theme) => ({
  root: {
    borderBottom: '0px solid #e8e8e8',
  },
  indicator: {
    height: "4px",
    backgroundColor: theme.palette.primary.main,
  },
}))(Tabs);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    zIndex: 1,
  },
  appBar: {
    left: 72,
    [theme.breakpoints.only('xs')]: {
      left: 0,
    },
    backgroundColor: theme.palette.blueGrey["0"]
  },
  tab: {
    borderBottom: "5px solid #fff",
  },
  tabLabel: {
    fontSize: "14px",
    color: theme.palette.primary.contrastText,
  },
  tabPanel: {
    height: "100vh",
  },
  SwipeableViews: {
    marginTop: 48,
  }
}));

const Knowledge = inject('store')(observer(({ store }) => {
  const classes = useStyles();
  const theme = useTheme();

  React.useEffect(() => {
    if (sessionStorage.getItem('KnowledgeTab') === "Modules") return setValue(0)
    if (sessionStorage.getItem('KnowledgeTab') === "Pages") return setValue(1)
    if (sessionStorage.getItem('KnowledgeTab') === "Others") return setValue(2)
  });

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Head>
        <title>
          Ξ Effect
        </title>
      </Head>
      {/* <Background/> */}
      <NavigationAll>
        <Grid container direction="column" className={classes.main}>
          <AppBar className={classes.appBar} position="fixed" color="default">
            <AntTabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="full width tabs example"
            >
              <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Pages")} label={<Typography className={classes.tabLabel}>Страницы</Typography>} {...a11yProps(0)} />
              {/* <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Pages")} label={<Typography className={classes.tabLabel}>Страницы</Typography>} {...a11yProps(1)} /> */}
              {/* <Tab label={<Typography className={classes.tabLabel}>Модерация</Typography>} {...a11yProps(2)} /> */}
              {/* <Tab onClick={() => sessionStorage.setItem('KnowledgeTab', "Others")} label={<Typography className={classes.tabLabel}><MoreHorizIcon /></Typography>} {...a11yProps(2)} /> */}
            </AntTabs>
          </AppBar>
          <SwipeableViews
            className={classes.SwipeableViews}
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Pages />
            </TabPanel>
            {/* <TabPanel value={value} index={0} dir={theme.direction}> */}
              {/* <Modules /> */}
            {/* </TabPanel> */}
            
            {/* <TabPanel value={value} index={2} dir={theme.direction}> */}
            {/* <Moderate/> */}
            {/* </TabPanel> */}
            {/* <TabPanel value={value} index={2} dir={theme.direction}> */}
              {/* <Other /> */}
            {/* </TabPanel> */}
          </SwipeableViews>
        </Grid>
      </NavigationAll>

    </>
  );
}))

export default Knowledge