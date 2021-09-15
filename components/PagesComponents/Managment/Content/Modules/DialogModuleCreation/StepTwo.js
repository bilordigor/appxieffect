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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import {
    Menu,
    Item,
    Separator,
    Submenu,
    useContextMenu,
    theme
} from "react-contexify";



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
        height: "calc(100vh - 166px)",
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
        cursor: "pointer",
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
    },
    iconButton: {
        width: "24px",
        height: "24px",
    },
    InputLabel: {
        color: theme.palette.primary.contrastText,
    },
    NativeSelect: {
        color: theme.palette.primary.main
    },
    FormControl: {
        width: "100%",
        maxWidth: "320px",
        color: theme.palette.primary.contrastText,
        // height: "32px",
        margin: 16,
    },
    helplabelTree: {
        padding: 16,
        fontSize: 14,
        textAlign: "justify",
    }
}));

const defaultInitializer = (index) => index;
function createRange(length, initializer = defaultInitializer) {
    return [...new Array(length)].map((_, index) => initializer(index));
}

const StepTwo = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [idPage, setIdPage] = React.useState(null)
    const [idPoint, setIdPoint] = React.useState(null)
    const [mainWindowType, setMainWindowType] = React.useState('none')

    const handlePoint = (idpnt) => {
        setMainWindowType("point")
        setIdPage(undefined)
        setIdPoint(idpnt)
        console.log("Point")
    }

    const handlePage = (e, id, idpnt, idpgs) => {
        e.stopPropagation();
        e.cancelBubble = true;
        store.setNowEditPageMeta("id", id)
        if (id <= 0) {
            store.setNowEditPageMeta("type", "newPages")
        }
        if (id > 0) {
            store.setNowEditPageMeta("type", "loadPages")
            if (store.loadedPages[store.nowEditPageMeta.id] === undefined) {
                store.downloadLoadedPages(store.nowEditPageMeta.id)
            }
        }
        setMainWindowType("page")
        setIdPage(idpgs)
        setIdPoint(idpnt)
        console.log("Page", mainWindowType, idPoint, idPage)
        console.log("Page1", store.nowEditPageMeta, store.newPages)
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
                className={classes.gridSidebar}
                xs={12} sm={12} md={3} lg={2} xl={1}
                item
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
            >
                <Grid item container direction="row" justify="space-between" style={{ padding: 4 }}>
                    <Typography className={classes.treeLabal}> Дерево модуля </Typography>
                    <Tooltip title="Модули разделены на логические еденицы - точки, которые содержат страницы с контентом.
                        Создайте несколько точек и наполните их страницами. Выше находиться &quot;дерево модуля&quot;, которое позволит вам быстро переключаться между точками и страницами.
                        Не забудьте дать названия точкам и модулям. Просто нажмите и отредактируйте текст.">
                        <HelpOutlineIcon style={{ marginRight: 12 }} className={classes.icon} />
                    </Tooltip>
                </Grid>
                <Divider className={classes.Divider} />
                <Grid
                    item
                    className={classes.gridWrapper}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                >
                    {store.nowEditModule.points.map((item, idpnt) =>
                        <Paper onClick={() => handlePoint(idpnt)} elevation={3} className={classes.PaperItem} key={idpnt}>
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
                                        <ClickAwayListener onClickAway={() => store.setReadOnlyPoint(idpnt, true)}>
                                            <Input
                                                placeholder="Название точки"
                                                className={classes.pointLabel}
                                                onClick={() => store.setReadOnlyPoint(idpnt, false)}
                                                onChange={(event) => store.setLabelPoint(idpnt, event.target.value)}
                                                readOnly={item.readOnly}
                                                disableUnderline
                                                value={item.label}
                                            />
                                        </ClickAwayListener>
                                    </Grid>
                                    <Grid item>
                                        <IconButton className={classes.iconButton} onClick={() => store.setOpenPages(idpnt)}>
                                            {item.openPages && <ArrowDropDownIcon className={classes.icon} />}
                                            {!item.openPages && <ArrowDropUpIcon className={classes.icon} />}
                                        </IconButton>
                                        <IconButton className={classes.iconButton} onClick={() => store.deletePoint(idpnt)}>
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
                                        <Paper onClick={(e) => handlePage(e, item.id, idpnt, idpgs)} className={classes.PaperPage} key={idpgs}>
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
                                                        <ClickAwayListener onClickAway={() => store.setReadOnlyPage(idpnt, idpgs, true)}>
                                                            <Input
                                                                placeholder="Название страницы"
                                                                className={classes.pointLabel}
                                                                onClick={() => store.setReadOnlyPage(idpnt, idpgs, false)}
                                                                onChange={(event) => store.setLabelPage(idpnt, idpgs, event.target.value)}
                                                                readOnly={item.readOnly}
                                                                disableUnderline
                                                                value={item.label}
                                                            />
                                                        </ClickAwayListener>
                                                    </Grid>
                                                    <Grid item>
                                                        <IconButton className={classes.iconButton} onClick={() => store.deletePage(idpnt, idpgs)}>
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
                    {/* <Typography className={classes.helplabelTree}>
                        Модули разделены на логические еденицы - точки, которые содержат страницы с контентом.
                        Создайте несколько точек и наполните их страницами. Выше находиться &quot;дерево модуля&quot;, которое позволит вам быстро переключаться между точками и страницами.
                        Не забудьте дать названия точкам и модулям. Просто нажмите и отредактируйте текст.
                    </Typography> */}
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
                <Grid
                    item
                    container
                    direction="column"
                    className={classes.gridMainImgWrapper}
                    justify="flex-start"
                    alignItems="center"
                >
                    {mainWindowType === "point" &&
                        <Grid
                            item
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Typography> Мета информация для точки. </Typography>
                            <FormControl className={classes.FormControl}>
                                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                                    Тип точки
                                </InputLabel>
                                <NativeSelect
                                    className={classes.NativeSelect}
                                    value={store.nowEditModule.points[idPoint].type}
                                    onChange={(event) => store.setPointType(idPoint, event.target.value)}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option className={classes.option} value={'not selected'}>Не выбрано</option>
                                    <option value={'theory'}> Теория</option>
                                    <option value={'practice'}> Практика </option>
                                    <option value={'test'}> Тест</option>
                                </NativeSelect>
                            </FormControl>

                        </Grid>}
                    {(mainWindowType === "none" || mainWindowType === "point") && <Image
                        quality={100}
                        alt="howtocreateamodule"
                        src="/illustrations/mathTeacher.png"
                        //layout='fill'
                        width={480}
                        height={480}
                    />}
                    {mainWindowType === "page" &&
                        <Grid
                            item
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                        >
                            {/* <Typography> Мета информация для точки. </Typography> */}
                            <FormControl className={classes.FormControl}>
                                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                                    Тип страницы
                                </InputLabel>
                                <NativeSelect
                                    className={classes.NativeSelect}
                                    value={store.nowEditModule.points[idPoint].type}
                                    onChange={(event) => store.setPointType(idPoint, event.target.value)}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option className={classes.option} value={'page'}> Страница </option>
                                    <option value={'drawing'}> Чертёж </option>
                                </NativeSelect>
                            </FormControl>

                        </Grid>}
                </Grid>
               

            </Grid>

            {/* Компоненты */}

            <Grid
                className={classes.gridSidebar}
                xs={12} sm={12} md={3} lg={2} xl={1}
                item
                container
                direction="column"
                justify="center"
                alignItems="flex-start"
            >
                <Grid item container direction="row" justify="space-between" style={{ padding: 4 }}>
                    <Typography className={classes.treeLabal}> Компоненты </Typography>
                    <Tooltip title="Компоненты - небольшие строительные блоки для создания страниц. Добавьте на текущую страницу, нажав на '+' на нужном компоненте.">
                        <HelpOutlineIcon style={{ marginRight: 12 }} className={classes.icon} />
                    </Tooltip>
                </Grid>
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
                                {/* <Grid className={classes.gridSubtitle} item xs>
                                    <Typography variant="subtitle2" className={classes.pointLabel}> {`Описание ${id}`} </Typography>
                                </Grid> */}
                                <Grid
                                    className={classes.gridAction}
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Button onClick={() => store.pushNewItemToPages(item.type)}>
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