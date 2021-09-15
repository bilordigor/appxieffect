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
        width: "calc(100% - 32px)",
        margin: 16,
    },
    labelGrid: {
        marginTop: 12,
        //height: 64,
        width: "100%",
    },
    paper: {
        width: "100%",
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
        height: 24,
        width: 24,
        color: theme.palette.primary.contrastText,
        transition: "all 0.4s",
        cursor: "pointer",
    },
    arrowIconOpen: {
        transition: "all 0.4s",
        transform: "rotate(-0.25turn)"
    },
    divider: {
        height: 1,
        marginTop: 4,
        marginBottom: 4,
        width: "100%",
        backgroundColor: theme.palette.primary.contrastText,
    },
    itemGrid: {
        '&:hover': {
            backgroundColor: theme.palette.blueGrey["3"],
        },
        margin: 16,
        width: "calc(100% - 32px)",
    }
}));

const Homework = inject('rootStore')(observer(({ rootStore }) => {
    const classes = useStyles();
    const theme = useTheme();

    const menuList = [
        { label: "Задание 0" },
        { label: "Задание 1" },
        { label: "Задание 2" },
        { label: "Задание 3" },
        { label: "Задание 4" },
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
                            <Typography variant="h4" className={classes.mainLabel} noWrap> Актуальные задания </Typography>
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

export default Homework;