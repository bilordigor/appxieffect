/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Grid, Box, AppBar, Tabs, Button, Typography, Tab } from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'


import SwipeableViews from 'react-swipeable-views';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { inject, observer } from 'mobx-react'

import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll'
//import Background from '../../components/OtherComponents/Background/Background.js'
import Courses from '../../components/PagesComponents/Knowledge/Courses';
import CourseEditor from '../../components/PagesComponents/Knowledge/CourseEditor';
//import Moderate from '../../components/PagesComponents/Knowledge/Moderate';
import Other from '../../components/PagesComponents/Knowledge/Other';



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
          <Typography>{children}</Typography>
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
  },
  buttonAuthor: {
    marginTop: 12,
    color: theme.palette.primary.contrastText,
    border: `1px solid ${theme.palette.primary.contrastText}`,
  },
  labelAuthor: {
    marginTop: 12,
    color: theme.palette.primary.contrastText,
  }
}));



const Knowledge = inject('store')(observer(({ store }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [role, setRole] = React.useState(null)
  React.useEffect(() => {
    store.fetchDataScr(`${store.url}/settings/roles/`, "GET")
      .then((data) => {
        setRole(data)
      });
    //store.getNewCourses()
  }, []);

  const becomeAuther = () => {
    store.fetchDataScr(`${store.url}/authors/permit/`, "GET")
      .then((data) => {
          if (data.a) return setRole([...role, author = "current"])
        
      });
  }

  return (
    <>
      <Head>
        <title>
          Ξ Effect
        </title>
      </Head>
      {/* <Background/> */}
      <NavigationAll>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.main}
        >
          Контент
        </Grid>
      </NavigationAll>

    </>
  );
}))

export default Knowledge