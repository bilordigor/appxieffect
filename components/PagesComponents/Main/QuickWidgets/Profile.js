import React from 'react';
import { inject, observer } from 'mobx-react'
import { Typography, Paper, Grid } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ScheduleIcon from '@material-ui/icons/Schedule';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';

const useStyles = makeStyles((theme) => ({
    paperGrid: {
        width: "100%",
        padding: 16,
    },
    paperInsideGrid: {
        paddingTop: 4,
        height: 64,
        width: "100%",
    },
    paper: {
        minWidth: "100%",
        borderRadius: 16,
        height: 64,
        backgroundColor: theme.palette.blueGrey["4"],
        cursor: "pointer",
    },
    mainLabel: {
        marginLeft: 8,
        marginRight: "auto",
        color: theme.palette.primary.contrastText,
    },
    firstIcon: {
        marginLeft: 8,
        height: 36,
        width: 36,
        color: theme.palette.primary.contrastText,
    },
    arrowIcon: {
        marginRight: 8,
        height: 36,
        width: 36,
        color: theme.palette.primary.contrastText,
    }
}));

const Profile = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Grid
            item
            container
            xs={12} sm={12} md={4} lg={4} xl={4}
            className={classes.paperGrid}
        >
            <Paper className={classes.paper} elevation={8}>
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    className={classes.paperInsideGrid}
                    wrap="nowrap"
                >
                    <ScheduleIcon className={classes.firstIcon} />
                    <Grid item xs zeroMinWidth>
                        <Typography variant="h4" className={classes.mainLabel} noWrap> Расписание </Typography>
                    </Grid>
                    <ArrowForwardIcon className={classes.arrowIcon} />
                </Grid>
            </Paper>
        </Grid>
    );
}));

export default Profile;