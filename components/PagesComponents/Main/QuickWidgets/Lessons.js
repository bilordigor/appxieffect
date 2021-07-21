import React from 'react';
import { inject, observer } from 'mobx-react'
import { Typography, Paper, Grid, Divider, List, ListItem, } from '@material-ui/core';
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
    labelGrid: {
        paddingTop: 12,
        //height: 64,
        width: "100%",
    },
    paper: {
        minWidth: "100%",
        borderRadius: 16,
        //height: 64,
        backgroundColor: theme.palette.blueGrey["4"],
        cursor: "default",
    },
    mainLabel: {
        marginLeft: 16,
        marginRight: "auto",
        color: theme.palette.primary.contrastText,
    },
    arrowIcon: {
        marginRight: 8,
        height: 36,
        width: 36,
        color: theme.palette.primary.contrastText,
    },
    divider: {
        height: 1,
        marginTop: 4,
        marginBottom: 4,
        width: "100%",
        backgroundColor: theme.palette.primary.contrastText,
    },
    itemGrid: {
        padding: 16,
        width: "100%",
    }
}));

const Lessons = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const menuList = [
        { label: "Урок 0" },
        { label: "Урок 1" },
        { label: "Урок 2" },
        { label: "Урок 3" },
        { label: "Урок 4" },
    ]

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
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        className={classes.labelGrid}
                        wrap="nowrap"
                    >
                        <Grid item xs zeroMinWidth>
                            <Typography variant="h4" className={classes.mainLabel} noWrap> Уроки </Typography>
                        </Grid>
                        <ArrowForwardIcon className={classes.arrowIcon} />
                    </Grid>
                    <Divider className={classes.divider} />
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                        {menuList.map((item, index) =>
                            <Grid className={classes.itemGrid} key={index}>
                                <Typography> {item.label} </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}));

export default Lessons;