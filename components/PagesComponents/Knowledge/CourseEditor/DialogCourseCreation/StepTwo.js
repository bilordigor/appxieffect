import React, { useState, useEffect } from 'react';
import Link from "next/link";
import clsx from 'clsx';
import { Tabs, Tab, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';

import { SnackbarProvider, useSnackbar } from 'notistack';

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
// import HorizontalRuleIcon from '@material-ui/icons/HorizontalRule';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import { inject, observer } from 'mobx-react'

import {
    Menu,
    Item,
    Separator,
    Submenu,
    useContextMenu,
    theme
} from "react-contexify";

import "react-contexify/dist/ReactContexify.css";
import ReactPage from '../../../../OtherComponents/ContentEditor/ReactPage';


const MENU_ID = "menu-id";


const useStyles = makeStyles((theme) => ({
    gridRoot: {
        //width: "100%",
        height: "calc(100vh - 168px)",
    },
    gridReactPage: {
        height: "calc(100vh - 168px)",
    },
    gridSidebar: {
        //width: 300,
        height: "calc(100vh - 168px)",
        display: "block",
        overflow: "auto",
        '&::-webkit-scrollbar': {
            width: "0! important",
            height: 0,
            display: "none !important",
            background: "transparent",
        }
    },
    gridAction: {
        height: 48,
        paddingBottom: 12,
        cursor: "pointer"
    },
    PaperItem: {
        borderRadius: 16,
        margin: 16,
        //height: 128,
        //width: 256,
        backgroundColor: theme.palette.primary.main,
    },
    PaperPage: {
        margin: 8,
        borderRadius: 16,
        width: "calc(100% - 16px)",
        backgroundColor: theme.palette.secondary.main
    },
    pointLabel: {
        marginLeft: 8,
        color: theme.palette.primary.contrastText,
    },
    appbarPoint: {
        padding: 8,
        // width: "100%",
        // height: "48",
        //backgroundColor: "blue"
    },
    PaperItemGrid: {
        // width: "100%",
        // height: "100%",
    },
    icon: {
        color: theme.palette.primary.contrastText,
    }
}));

const StepTwo = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [openSideMenu, setOpenSideMenu] = React.useState(true)

    return (
        <Grid
            className={classes.gridRoot}
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
        >
            <Grid
                xs={12} sm={12} md={3} lg={3} xl={2}
                className={classes.gridSidebar}
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
            >
                {[...new Array(50)].map((item, id) =>
                    <Paper className={classes.PaperItem} key={id}>
                        <Grid
                            className={classes.PaperItemGrid}
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            <Grid
                                className={classes.appbarPoint}
                                container
                                direction="row"
                                justify="space-between"
                                alignItems="center"
                            >
                                <Grid item>
                                    <Typography className={classes.pointLabel}> {`Точка ${id}`} </Typography>
                                </Grid>
                                <Grid item>
                                    <IconButton>
                                        <CloseIcon className={classes.icon} />
                                    </IconButton>
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                justify="flex-start"
                                alignItems="flex-end"
                            >
                                {[...new Array(3)].map((item, id) =>
                                    <Paper className={classes.PaperPage} key={id}>
                                        <Grid
                                            className={classes.PaperItemGrid}
                                            container
                                            direction="column"
                                            justify="flex-start"
                                            alignItems="flex-start"
                                        >
                                            <Grid
                                                className={classes.appbarPoint}
                                                container
                                                direction="row"
                                                justify="space-between"
                                                alignItems="center"
                                            >
                                                <Grid item>
                                                    <Typography className={classes.pointLabel}> {`Страница ${id}`} </Typography>
                                                </Grid>
                                                <Grid item>
                                                    <IconButton>
                                                        <CloseIcon className={classes.icon} />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </Paper>)}
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >

                            </Grid>
                        </Grid>
                        <Grid
                            className={classes.gridAction}
                            container
                            direction="row"
                            justify="center"
                            alignItems="center"
                        >
                            <Button>
                                <AddIcon className={classes.icon} />
                                <Typography className={classes.pointLabel}> Добавить страницу </Typography>
                            </Button>
                        </Grid>
                    </Paper>

                )}
                <Grid
                    className={classes.gridAction}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    <Button>
                        <AddIcon className={classes.icon} />
                        <Typography className={classes.pointLabel}> Добавить точку </Typography>
                    </Button>
                </Grid>
            </Grid>
            <Grid
                xs={12} sm={12} md={9} lg={9} xl={10}
                className={classes.gridReactPage}
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
            >
                <ReactPage />
            </Grid>
        </Grid>

    )
}))

export default StepTwo