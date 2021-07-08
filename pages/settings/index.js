import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Accordion, AccordionSummary, Typography, AccordionDetails, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { inject, observer } from 'mobx-react'
import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll'
//import Background from '../../components/OtherComponents/Background/Background.js'

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import UserAccount from '../../components/PagesComponents/Settings/UserAccount';
import Castomize from './../../components/PagesComponents/Settings/Castomize';

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  main: {
    marginTop: 32,
    paddingLeft: 8,
    paddingRight: 8,
    width: "100%",
  },
  gridMain: {
    width: "100%",
    maxWidth: 1200,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
    color: theme.palette.primary.contrastText,
  },
  accordion: {
    width: "100%",
    backgroundColor: theme.palette.blueGrey["4"]
  },
  icon: {
    color: theme.palette.primary.contrastText,
    fontSize: 36,
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
      {/* <Background/> */}
      <NavigationAll>
        <div className={classes.root}>
          <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.main}>
            <Grid className={classes.gridMain}>
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={classes.icon} />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography className={classes.heading}>Учётная запись</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <UserAccount />
                </AccordionDetails>
              </Accordion>
              <Accordion className={classes.accordion}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon className={classes.icon} />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography className={classes.heading}>Внешний вид</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Castomize />
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </div>

      </NavigationAll>

    </>
  );
}))

export default Home