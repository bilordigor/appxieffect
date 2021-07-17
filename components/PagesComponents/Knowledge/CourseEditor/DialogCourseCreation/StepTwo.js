import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import clsx from 'clsx';
import { Tabs, Tab, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';

import { SnackbarProvider, useSnackbar } from 'notistack';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
// import HorizontalRuleIcon from '@material-ui/icons/HorizontalRule';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import { inject, observer } from 'mobx-react'
import Sortable from './../../../../OtherComponents/Page/Sortable'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import {
    Menu,
    Item,
    Separator,
    Submenu,
    useContextMenu,
    theme
} from "react-contexify";

import "react-contexify/dist/ReactContexify.css";

const MENU_ID = "menu-id";


const useStyles = makeStyles((theme) => ({
    gridRoot: {
        margin: 0,
        padding: 0,
        width: "100vw",
        //height: "calc(100vh - 136px)",
    },
    gridMain: {
        margin: 0,
        padding: 0,
        width: "100%",
        height: "100%",
        display: "block",
        overflow: "auto",
        '&::-webkit-scrollbar': {
            width: "0! important",
            height: 0,
            display: "none !important",
            background: "transparent",
        }
    },
    gridMainImgWrapper: {
        width: "100%",
        height: "100%",
    },
    gridSidebar: {
        margin: 0,
        padding: 0,
        //backgroundColor: theme.palette.blueGrey["0"],
    },
    gridWrapper: {
        height: "calc(100vh - 158px)",
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
        //height: 48,
        paddingBottom: 12,
        cursor: "pointer"
    },
    PaperItem: {
        borderRadius: 16,
        margin: 8,
        //height: 128,
        //width: 256,
        backgroundColor: theme.palette.primary.main,
    },
    PaperPage: {
        margin: 6,
        borderRadius: 16,
        width: "calc(100% - 12px)",
        backgroundColor: theme.palette.secondary.main
    },
    pointLabel: {
        marginLeft: 8,
        color: theme.palette.primary.contrastText,
    },
    appbarPoint: {
        padding: 4,
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
    },
    treeLabal: {
        marginLeft: 16,
    },
    Divider: {
        backgroundColor: theme.palette.primary.contrastText,
        height: 1,
        width: "calc(100% - 32px)",
        marginLeft: 16,
        marginRight: 16,
    },
    gridSubtitle: {
        marginLeft: 8,
        marginTop: 4,
    }
}));

const defaultInitializer = (index) => index;
function createRange(length, initializer = defaultInitializer) {
    return [...new Array(length)].map((_, index) => initializer(index));
}

const StepTwo = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [openSideMenu, setOpenSideMenu] = React.useState(true)
    const [items, setItems] = useState(() => createRange(store.pageContent.length, (index) => (index).toString()));

    const Clicked = (type) => {
        setItems([...items, store.pageContent.length.toString()])
        store.pushNewItemToPageContent(type)
    }

    const components = [
        { label: "Текст", type: "text" },
        { label: "Заголовок", type: "h" },
    ]

    return (
        <Grid
            className={classes.gridRoot}
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            {/* Дерево */}
            <Grid
                item
                className={classes.gridSidebar}
                xs={12} sm={12} md={3} lg={2} xl={1}
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
            >
                <Typography className={classes.treeLabal}> Дерево модуля </Typography>
                <Divider className={classes.Divider} />
                <Grid
                    item
                    className={classes.gridWrapper}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    {store.nowEditCourse.points.map((item, idpnt) =>
                        <Paper elevation={3} className={classes.PaperItem} key={idpnt}>
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
                                    wrap="nowrap"
                                >
                                    <Grid item xs zeroMinWidth>
                                        <Typography noWrap variant="subtitle2" className={classes.pointLabel}> {item.label} {idpnt}</Typography>
                                    </Grid>
                                    <Grid item>
                                        <IconButton onClick={() => store.setOpenPages(idpnt)}>
                                            {item.openPages && <ArrowDropDownIcon className={classes.icon} />}
                                            {!item.openPages && <ArrowDropUpIcon className={classes.icon} />}
                                        </IconButton>
                                        <IconButton onClick={() => store.deletePoint(idpnt)}>
                                            <CloseIcon className={classes.icon} />
                                        </IconButton>
                                    </Grid>
                                </Grid>
                                {item.openPages && <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-end"
                                >
                                    {item.pages.map((item, idpgs) =>
                                        <Paper className={classes.PaperPage} key={idpgs}>
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
                                                    wrap="nowrap"
                                                >
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography noWrap variant="subtitle2" className={classes.pointLabel}> {`Страница ${idpgs}`} </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton onClick={() => store.deletePage(idpnt, idpgs)}>
                                                            <CloseIcon className={classes.icon} />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Paper>)}
                                </Grid>}
                            </Grid>
                            {item.openPages && <Grid
                                className={classes.gridAction}
                                container
                                direction="row"
                                justify="center"
                                alignItems="center"
                            >
                                <Button onClick={() => store.pushNewPage(idpnt)}>
                                    <Tooltip title="Добавить страницу">
                                        <AddIcon className={classes.icon} />
                                    </Tooltip>
                                </Button>
                            </Grid>}
                        </Paper>

                    )}
                    <Tooltip title="Добавить точку">
                        <Grid
                            className={classes.gridAction}
                            onClick={() => store.pushNewPoint()}
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Image
                                quality={100}
                                alt="howtocreateamodule"
                                src="/illustrations/HowCreateCourse.png"
                                //layout='fill'
                                width={196}
                                height={196}
                            />
                            <Button>
                                <AddIcon className={classes.icon} />
                                {/* <Typography className={classes.pointLabel}>  </Typography> */}
                            </Button>
                        </Grid>
                    </Tooltip>
                </Grid>
            </Grid>

            {/* Контент */}

            <Grid
                xs={12} sm={12} md={6} lg={8} xl={10}
                item
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.gridMain}
            >
                {/* <Page/> */}
                {store.pageContent.length != 0 && <Sortable items={items} setItems={setItems} store={store} handle />}
                {store.pageContent.length === 0 &&
                    <Grid
                        item
                        container
                        direction="column"
                        className={classes.gridMainImgWrapper}
                        justify="center"
                        alignItems="center"
                    >
                        <Image
                            quality={100}
                            alt="howtocreateamodule"
                            src="/illustrations/mathTeacher.png"
                            //layout='fill'
                            width={320}
                            height={320}
                        />
                    </Grid>
                }
            </Grid>

            {/* Компоненты */}

            <Grid
                item
                className={classes.gridSidebar}
                xs={12} sm={12} md={3} lg={2} xl={1}
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
            >
                <Typography className={classes.treeLabal}> Компоненты </Typography>
                <Divider className={classes.Divider} />
                <Grid
                    item
                    className={classes.gridWrapper}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    {components.map((item, id) =>
                        <Paper elevation={3} className={classes.PaperItem} key={id}>
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
                                    wrap="nowrap"
                                >
                                    <Grid item xs zeroMinWidth>
                                        <Typography noWrap variant="subtitle2" className={classes.pointLabel}> {item.label} </Typography>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.Divider} />
                                <Grid className={classes.gridSubtitle} item xs>
                                    <Typography variant="subtitle2" className={classes.pointLabel}> {`Описание ${id}`} </Typography>
                                </Grid>
                                <Grid
                                    className={classes.gridAction}
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Button onClick={() => Clicked(item.type)}>
                                        <Tooltip title="Добавить Компонент">
                                            <AddIcon className={classes.icon} />
                                        </Tooltip>
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    )}
                    <Tooltip title="Компоненты - небольшие строительные блоки для создания страниц">
                        <Grid
                            className={classes.gridAction}
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                        >
                            <Image
                                quality={100}
                                alt="howtocreateamodule"
                                src="/illustrations/HowCoursesWork.png"
                                //layout='fill'
                                width={196}
                                height={196}
                            />
                        </Grid>
                    </Tooltip>
                </Grid>
            </Grid>
        </Grid>

    )
}))

export default StepTwo