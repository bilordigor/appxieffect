/* eslint-disable react-hooks/exhaustive-deps */
import Head from 'next/head'
import Link from 'next/link'
import Router from 'next/router'
import React from 'react';
import { Grid, Box, AppBar, Tabs, Typography, Tab } from '@material-ui/core';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles'


import SwipeableViews from 'react-swipeable-views';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { inject, observer } from 'mobx-react'

import NavigationAll from '../../components/OtherComponents/Navigation/NavigationAll'
//import Background from '../../components/OtherComponents/Background/Background.js'
import Courses from './../../components/PagesComponents/Knowledge/Courses';
import CourseEditor from './../../components/PagesComponents/Knowledge/CourseEditor';
//import Moderate from '../../components/PagesComponents/Knowledge/Moderate';
import Other from './../../components/PagesComponents/Knowledge/Other';

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
    zIndex: "-10",
  },
  appBar: {
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
}));

const Knowledge = inject('store')(observer(({ store }) => {
  const classes = useStyles();
  const theme = useTheme();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const [courses, setCourses] = React.useState([])

  // React.useEffect(() => {
  //   let filters = {
  //     "filters": {
        
  //     },
  //     "sort": "popularity",
  //     "counter": 0
  //   }
  //   store.postDataScr(`${store.url}/courses/`, filters)
  //     .then((data) => {
  //       console.log("data", data)
  //       store.pushCoursesList(data)
  //       console.log("courses", store.coursesList)
  //     })
  // }, [])

  React.useEffect(() => {
    if (value === 0) {
      store.getDataScr(`${store.url}/filters/`)
        .then((data) => {
          console.log("filtersI:", data)
          if (data != undefined ) {
            //store.setFiltersGlobal(data)
            if (!store.allLoading) store.loadingMoreCourses()
          }
        });
    }
    //store.getNewCourses()
  }, []);

  const bottomLoading = () => {
    //console.log("scrolling")
    if (value === 0) {
      if (!store.allLoading) {
        store.counterUp()
        store.loadingMoreCourses()
      }
    }
  }

  useBottomScrollListener(bottomLoading, {
    offset: 100,
    // debounce: 0,
    // triggerOnNoScroll: true
  });
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
          <AppBar className={classes.appBar} position="static" color="default">
            <AntTabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              aria-label="full width tabs example"
            >
              <Tab label={<Typography className={classes.tabLabel}>Курсы</Typography>} {...a11yProps(0)} />
              <Tab label={<Typography className={classes.tabLabel}>Редактор</Typography>} {...a11yProps(1)} />
              {/* <Tab label={<Typography className={classes.tabLabel}>Модерация</Typography>} {...a11yProps(2)} /> */}
              <Tab label={<Typography className={classes.tabLabel}>Другое</Typography>} {...a11yProps(2)} />
            </AntTabs>
          </AppBar>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              <Courses courses={courses} />
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              <CourseEditor/>
            </TabPanel>
            {/* <TabPanel value={value} index={2} dir={theme.direction}> */}
              {/* <Moderate/> */}
            {/* </TabPanel> */}
            <TabPanel value={value} index={2} dir={theme.direction}>
              <Other/>
            </TabPanel>
          </SwipeableViews>
        </Grid>
      </NavigationAll>

    </>
  );
}))

export default Knowledge