import React from 'react';
import { inject, observer } from 'mobx-react'
import { Typography, Paper, Grid } from '@material-ui/core';
import { useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Lessons from './QuickWidgets/Lessons';
import Homework from './QuickWidgets/Homework';
import Profile from './QuickWidgets/Profile';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: 8,
    }
}));

const QuiсkWidgets = inject('rootStore')(observer(({ rootStore }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid
            container
            direction="row"
            className={classes.root}
        >
            <Lessons />
            <Homework />
            <Profile />
        </Grid>
    );
}));

export default QuiсkWidgets;