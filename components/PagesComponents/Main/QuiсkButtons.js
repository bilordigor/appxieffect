import React from 'react';
import { inject, observer } from 'mobx-react'
import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

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

const QuiсkButtons = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid
            container
            direction="row"
        >
            <Grid
                item
                container
                xs={12} sm={12} md={4} lg={4} xl={4}
            >
                <Paper elevation={3}>
                    <Grid
                        container
                        direction="row"
                    >
                        <Typography> Расписание </Typography>
                        <ArrowForwardIcon />
                    </Grid>
                </Paper>
            </Grid>
            <Grid
                item
                container
                xs={12} sm={12} md={4} lg={4} xl={4}
            >
                <Paper elevation={3}>
                    <Grid
                        container
                        direction="row"
                    >
                        <Typography> Расписание </Typography>
                        <ArrowForwardIcon />
                    </Grid>
                </Paper>
            </Grid>
            <Grid
                item
                container
                xs={12} sm={12} md={4} lg={4} xl={4}
            >
                <Paper elevation={3}>
                    <Grid
                        container
                        direction="row"
                    >
                        <Typography> Расписание </Typography>
                        <ArrowForwardIcon />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
}));

export default QuiсkButtons;