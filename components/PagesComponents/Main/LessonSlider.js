import React from 'react';
import { inject, observer } from 'mobx-react'
import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    papper: {
        minWidth: "100%",
        borderRadius: 48,
        height: 300,
        backgroundColor: theme.palette.blueGrey["4"]
    },
    mainLabel: {
        marginLeft: 48,
        color: theme.palette.primary.contrastText,
    }
}));

const LessonSlider = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
            >
                <Typography className={classes.mainLabel} variant="h6" noWrap> Уроки на сегодня </Typography>
            </Grid>
            <Grid className={classes.papper}>

            </Grid>
        </Grid>
    );
}));

export default LessonSlider;