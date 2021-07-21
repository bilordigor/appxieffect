import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Divider, Box, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { inject, observer } from 'mobx-react'
import NavigationAll from './../components/OtherComponents/Navigation/NavigationAll'
import Background from './../components/OtherComponents/Background/Background'
import QuiсkButtons from './../components/PagesComponents/Main/QuiсkButtons';
import QuiсkWidgets from '../components/PagesComponents/Main/QuiсkWidgets';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    //minHeight: '100vh',
    zIndex: 1,
  },
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
        <Grid container direction="column" className={classes.main}>
          <Grid item>
            <QuiсkButtons />
          </Grid>
          <Grid item>
            <QuiсkWidgets />
          </Grid>
          <Box className={classes.space}>

          </Box>
        </Grid>
      </NavigationAll>

    </>
  );
}))

export default Home