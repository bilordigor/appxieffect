/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Grid, Box, AppBar, Tabs, Button, Typography, Tab } from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'
import { SnackbarProvider, useSnackbar } from 'notistack';

import SwipeableViews from 'react-swipeable-views';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { inject, observer } from 'mobx-react'

import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll'
import AuthorCard from '../../components/PagesComponents/Managment/Managment/AuthorCard';
import ModerationCard from '../../components/PagesComponents/Managment/Managment/ModerationCard';




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



const Managment = inject('rootStore')(observer(({ rootStore }) => {
  const classes = useStyles();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const [role, setRole] = React.useState({ author: null, moderator: null })
  React.useEffect(() => {
    rootStore.fetchDataScr(`${rootStore.url}/settings/roles/`, "GET")
      .then((data) => {
        setRole(data)
        console.log("role", role)
      });
    //store.getNewCourses()
  }, []);

  const becomeAuther = () => {
    rootStore.fetchDataScr(`${rootStore.url}/authors/permit/`, "GET")
      .then((data) => {
        if (data.a) return setRole([...role, author = "current"])
        if (!data.a) {
          enqueueSnackbar('Вы не можете стать автором', { variant: 'error' });
        }
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
        <Grid container className={classes.main}>
          <AuthorCard />
          <ModerationCard />
          <ModerationCard />

        </Grid>
      </NavigationAll>

    </>
  );
}))

export default Managment