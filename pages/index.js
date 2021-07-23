import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Divider, Box, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { inject, observer } from 'mobx-react'
import NavigationAll from './../components/OtherComponents/Navigation/NavigationAll'
//import Background from './../components/OtherComponents/Background/Background'
//import QuiсkButtons from './../components/PagesComponents/Main/QuiсkButtons';
//import QuiсkWidgets from '../components/PagesComponents/Main/QuiсkWidgets';
import HowBeginLearning from './../components/PagesComponents/Main/MainHelpApps/HowBeginLearning';
import HowCoursesWork from './../components/PagesComponents/Main/MainHelpApps/HowCoursesWork';
import HowCreateCourse from './../components/PagesComponents/Main/MainHelpApps/HowCreateCourse';
import HowICanChangeData from './../components/PagesComponents/Main/MainHelpApps/HowICanChangeData';
import HowFiltersWork from './../components/PagesComponents/Main/MainHelpApps/HowFiltersWork';
import HowICanTellAboutBug from './../components/PagesComponents/Main/MainHelpApps/HowICanTellAboutBug';
import HowICanTellIdea from './../components/PagesComponents/Main/MainHelpApps/HowICanTellIdea';


const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    //minHeight: '100vh',
    zIndex: 1,
  },
  space: {
    width: '100%',
    height: "100px",
  }
}));

const Home = inject('store')(observer(({ store }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <>
      <Head>
        <title>
          Ξ Effect
        </title>
      </Head>
      {/* <Background /> */}
      <NavigationAll>
        <Grid container className={classes.main}>
          <Grid xs={12} sm={12} md={12} lg={6} xl={4} item container>
            <HowBeginLearning />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={6} xl={4} item container>
            <HowCoursesWork />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={6} xl={4} item container>
            <HowCreateCourse />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={6} xl={4} item container>
            <HowICanChangeData />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={6} xl={4} item container>
            <HowFiltersWork />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={6} xl={4} item container>
            <HowICanTellAboutBug />
          </Grid>
          <Grid xs={12} sm={12} md={12} lg={6} xl={4} item container>
            <HowICanTellIdea />
          </Grid>
          {/* <Grid item>
            <QuiсkButtons />
          </Grid> */}
          {/* <Grid item>
            <QuiсkWidgets />
          </Grid> */}
          <Box className={classes.space}>

          </Box>
        </Grid>
      </NavigationAll>

    </>
  );
}))

export default Home