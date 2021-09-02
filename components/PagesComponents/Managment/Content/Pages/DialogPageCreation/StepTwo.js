import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import clsx from 'clsx';
import { Tabs, Tab, withStyles, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';

import { SnackbarProvider, useSnackbar } from 'notistack';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
// import HorizontalRuleIcon from '@material-ui/icons/HorizontalRule';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import CloseIcon from '@material-ui/icons/Close';
import { inject, observer } from 'mobx-react'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks5Icon from '@material-ui/icons/Looks5';
import Looks6Icon from '@material-ui/icons/Looks6';
import ClearIcon from '@material-ui/icons/Clear';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';

import "react-contexify/dist/ReactContexify.css";
import Sortable from '../../../../../OtherComponents/Page/Sortable';

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
        margin: theme.spacing(0.5),
        border: 'none',
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}))(ToggleButtonGroup);

const useStylesTool = makeStyles((theme) => ({
    paper: {
        marginLeft: 16,
    }
}));

const ToolbarComp = ({ value, index, setComponentsData }) => {
    const classes = useStylesTool();

    const handleAlertType = (event, newFormats) => {
        //console.log(index, "fontSize", newFormats)
        setComponentsData(index, "alertType", newFormats)
    };

    const handleFontSize = (event, newFormats) => {
        //console.log(index, "fontSize", newFormats)
        setComponentsData(index, "fontSize", newFormats)
    };

    const handleTextAlign = (event, newAlignment) => {
        setComponentsData(index, "textAlign", newAlignment)
    };

    const handleFontStyle = () => {
        if (value.fontStyle === "normal") return setComponentsData(index, "fontStyle", "italic")
        return setComponentsData(index, "fontStyle", "normal");
    };

    const handleFontWeight = () => {
        if (value.fontWeight === "normal") return setComponentsData(index, "fontWeight", "bold");
        return setComponentsData(index, "fontWeight", "normal");
    };

    const handleTextDecoration = () => {
        if (value.textDecoration === "none") return setComponentsData(index, "textDecoration", "underline");
        return setComponentsData(index, "textDecoration", "none");
    };

    if (value?.type === "h") {
        return (
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                className={classes.paper}>

                <StyledToggleButtonGroup
                    size="small"
                    value={value.fontSize}
                    exclusive
                    onChange={handleFontSize}
                    aria-label="text alignment"
                >
                    <ToggleButton value={72}>
                        <LooksOneIcon />
                    </ToggleButton>
                    <ToggleButton value={60}>
                        <LooksTwoIcon />
                    </ToggleButton>
                    <ToggleButton value={48}>
                        <Looks3Icon />
                    </ToggleButton>
                    <ToggleButton value={36}>
                        <Looks4Icon />
                    </ToggleButton>
                    <ToggleButton value={30}>
                        <Looks5Icon />
                    </ToggleButton>
                    <ToggleButton value={24}>
                        <Looks6Icon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <StyledToggleButtonGroup
                    size="small"
                    value={value.textAlign}
                    exclusive
                    onChange={handleTextAlign}
                    aria-label="text alignment"
                >
                    <ToggleButton value="left" aria-label="left aligned">
                        <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                        <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                        <FormatAlignRightIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <StyledToggleButtonGroup
                    size="small"
                    // value={formats}
                    // onChange={handleFormat}
                    aria-label="text formatting"
                >
                    <ToggleButton selected={value.fontWeight === "bold" ? true : false} onClick={handleFontWeight} value="bold" aria-label="bold">
                        <FormatBoldIcon />
                    </ToggleButton>
                    <ToggleButton selected={value.fontStyle === "italic" ? true : false} onClick={handleFontStyle} value="italic" aria-label="italic">
                        <FormatItalicIcon />
                    </ToggleButton>
                    <ToggleButton selected={value.textDecoration === "underline" ? true : false} onClick={handleTextDecoration} value="underlined" aria-label="underlined">
                        <FormatUnderlinedIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
            </Grid >
        )
    }
    if (value?.type === "text") {
        return (
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                className={classes.paper}>
                <StyledToggleButtonGroup
                    size="small"
                    value={value.fontSize}
                    exclusive
                    onChange={handleFontSize}
                    aria-label="text alignment"
                >
                    <ToggleButton value={26}>
                        <LooksOneIcon />
                    </ToggleButton>
                    <ToggleButton value={22}>
                        <LooksTwoIcon />
                    </ToggleButton>
                    <ToggleButton value={18}>
                        <Looks3Icon />
                    </ToggleButton>
                    <ToggleButton value={14}>
                        <Looks4Icon />
                    </ToggleButton>
                    <ToggleButton value={12}>
                        <Looks5Icon />
                    </ToggleButton>
                    <ToggleButton value={10}>
                        <Looks6Icon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <StyledToggleButtonGroup
                    size="small"
                    value={value.textAlign}
                    exclusive
                    onChange={handleTextAlign}
                    aria-label="text alignment"
                >
                    <ToggleButton value="left" aria-label="left aligned">
                        <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                        <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                        <FormatAlignRightIcon />
                    </ToggleButton>
                    <ToggleButton value="justify" aria-label="right aligned">
                        <FormatAlignJustifyIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <StyledToggleButtonGroup
                    size="small"
                    aria-label="text formatting"
                >
                    <ToggleButton selected={value.fontWeight === "bold" ? true : false} onClick={handleFontWeight} value="bold" aria-label="bold">
                        <FormatBoldIcon />
                    </ToggleButton>
                    <ToggleButton selected={value.fontStyle === "italic" ? true : false} onClick={handleFontStyle} value="italic" aria-label="italic">
                        <FormatItalicIcon />
                    </ToggleButton>
                    <ToggleButton selected={value.textDecoration === "underline" ? true : false} onClick={handleTextDecoration} value="underlined" aria-label="underlined">
                        <FormatUnderlinedIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
            </Grid>
        )
    }
    if (value?.type === "alert") {
        return (
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                className={classes.paper}>
                <StyledToggleButtonGroup
                    size="small"
                    value={value.alertType}
                    exclusive
                    onChange={handleAlertType}
                >
                    <ToggleButton value={"success"}>
                        <CheckCircleIcon />
                    </ToggleButton>
                    <ToggleButton value={"info"}>
                        <InfoIcon />
                    </ToggleButton>
                    <ToggleButton value={"warning"}>
                        <WarningIcon />
                    </ToggleButton>
                    <ToggleButton value={"error"}>
                        <ErrorIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <StyledToggleButtonGroup
                    size="small"
                    value={value.fontSize}
                    exclusive
                    onChange={handleFontSize}
                    aria-label="text alignment"
                >
                    <ToggleButton value={26}>
                        <LooksOneIcon />
                    </ToggleButton>
                    <ToggleButton value={22}>
                        <LooksTwoIcon />
                    </ToggleButton>
                    <ToggleButton value={18}>
                        <Looks3Icon />
                    </ToggleButton>
                    <ToggleButton value={14}>
                        <Looks4Icon />
                    </ToggleButton>
                    <ToggleButton value={12}>
                        <Looks5Icon />
                    </ToggleButton>
                    <ToggleButton value={10}>
                        <Looks6Icon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <StyledToggleButtonGroup
                    size="small"
                    value={value.textAlign}
                    exclusive
                    onChange={handleTextAlign}
                    aria-label="text alignment"
                >
                    <ToggleButton value="left" aria-label="left aligned">
                        <FormatAlignLeftIcon />
                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">
                        <FormatAlignCenterIcon />
                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">
                        <FormatAlignRightIcon />
                    </ToggleButton>
                    <ToggleButton value="justify" aria-label="right aligned">
                        <FormatAlignJustifyIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <StyledToggleButtonGroup
                    size="small"
                    aria-label="text formatting"
                >
                    <ToggleButton selected={value.fontWeight === "bold" ? true : false} onClick={handleFontWeight} value="bold" aria-label="bold">
                        <FormatBoldIcon />
                    </ToggleButton>
                    <ToggleButton selected={value.fontStyle === "italic" ? true : false} onClick={handleFontStyle} value="italic" aria-label="italic">
                        <FormatItalicIcon />
                    </ToggleButton>
                    <ToggleButton selected={value.textDecoration === "underline" ? true : false} onClick={handleTextDecoration} value="underlined" aria-label="underlined">
                        <FormatUnderlinedIcon />
                    </ToggleButton>
                </StyledToggleButtonGroup>
            </Grid>
        )
    }
    return (
        <Grid
            container
            direction="row"
            justify="flex-start"
            alignItems="center"
            className={classes.paper}>

        </Grid>
    )
}

const defaultInitializer = (index) => index;
function createRange(length, initializer = defaultInitializer) {
    return [...new Array(length)].map((_, index) => initializer(index));
}

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        margin: 0,
        padding: 0,
        width: "100vw",
        //height: "calc(100vh - 136px)",
    },
    gridMain: {
        margin: 0,
        //paddingLeft: 4,
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
            background: "traimport",
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
    },
    componentLabel: {
        marginLeft: 12,
        color: theme.palette.primary.contrastText,
    },
    infoLabel: {
        color: theme.palette.primary.contrastText,
    },
    ToolbarSpacer: {
        height: 72,
        width: "100%",
    }
}));

const StepTwo = inject('store')(observer(({ selectId, setSelectId, deleteItemInPages, setComponentsData, pushNewItemToPages, dialogPageCreationData, changeDialogPageCreationData, store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const components = [
        { title: "Текст", subtitle: "Блок текста с возможностью форматирования", type: "text" },
        { title: "Заголовок", subtitle: "Блок с заголовка и возможностью форматирования", type: "h" },
        { title: "Уведомление", subtitle: "Текст, выделенный цветом", type: "alert" },
        { title: "Разделитель", subtitle: "Горизонтальная черта, разделяет соседние блоки", type: "divider" },
    ]

    return (
        <Grid
            className={classes.gridRoot}
            container
            direction="row"
            justify="center"
            alignItems="center"
        >
            {/* Контент */}

            <Grid
                xs={12} sm={12} md={8} lg={8} xl={10}
                item
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
            >
                {selectId != null && <ToolbarComp index={selectId} value={dialogPageCreationData.components[selectId]} setComponentsData={setComponentsData} />}
                {/* {selectId == null && <div className={classes.ToolbarSpacer}>

                </div>} */}
                {dialogPageCreationData.components.length === 0 && <Grid
                    item
                    container
                    direction="column"
                    className={classes.gridMainImgWrapper}
                    justify="flex-start"
                    alignItems="center"
                >
                    <Typography variant="h5" className={classes.infoLabel}> Страница пока пуста </Typography>
                    <Typography variant="h5" className={classes.infoLabel}> Добавьте компоненты </Typography>
                    <Image
                        quality={100}
                        alt="howtocreateamodule"
                        src="/illustrations/mathTeacher.png"
                        //layout='fill'
                        width={480}
                        height={480}
                    />
                </Grid>}
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    className={classes.gridMain}
                >
                    {dialogPageCreationData.components.length != 0 && <Sortable setSelectId={setSelectId} deleteItemInPages={deleteItemInPages} setComponentsData={setComponentsData} store={store} items={dialogPageCreationData.components} changeDialogPageCreationData={changeDialogPageCreationData} handle />}
                </Grid>
            </Grid>

            {/* Компоненты */}

            <Grid
                className={classes.gridSidebar}
                xs={12} sm={12} md={4} lg={4} xl={2}
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
                                        <Typography noWrap variant="subtitle2" className={classes.componentLabel}> {item.title} </Typography>
                                    </Grid>
                                </Grid>
                                <Divider className={classes.Divider} />
                                <Grid className={classes.gridSubtitle} item xs>
                                    <Typography variant="subtitle2" className={classes.componentLabel}> {item.subtitle} </Typography>
                                </Grid>
                                <Grid
                                    className={classes.gridAction}
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="center"
                                >
                                    <Button onClick={() => pushNewItemToPages(item.type)}>
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