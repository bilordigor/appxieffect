/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme } from '@material-ui/core';

// import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
// import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
// import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';

import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import FlagIcon from '@material-ui/icons/Flag';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';


import { SnackbarProvider, useSnackbar } from 'notistack';

import { inject, observer } from 'mobx-react'

import DialogHiddenList from './Other/DialogHiddenList';


const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 16,
        marginBottom: 16,
        height: '100%',
        width: '100%',
    },
    gridCard: {
        padding: 8,
    },
    card: {
        position: 'relative',
        //paddingLeft: 4,
        border: '2px solid',
        borderColor: theme.palette.primary.dark,
        borderRadius: 32,
        transition: '0.4s',
        '&:hover': {
            borderColor: theme.palette.primary.light,
        },
        // marginTop: theme.spacing(8),

        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: theme.palette.blueGrey["5"],
    },
    content: {
        paddingTop: 6,
        textAlign: 'left',
        overflowX: 'auto',
        '& table': {
            marginBottom: 0,
        }
    },
    media:
    {
        height: 180,
        width: 320,
        paddingTop: '56.25%', // 16:9
    },
    boxCardHeader: {
        paddingTop: -8,
    },
    cardHeader: {
        color: theme.palette.primary.contrastText,
    },
    avatar: {
        borderRadius: 8,
        backgroundColor: theme.palette.blueGrey["7"],
    },
    overline: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: theme.palette.primary.contrastText,
    },
    name: {
        fontSize: 16,
        fontWeight: 500,
        color: theme.palette.primary.contrastText,
    },
    gridcreater: {
        paddingLeft: theme.spacing(1.5),
    },
    userownerinfo: {
        paddingTop: theme.spacing(1.5),
        width: 'auto',
        marginRight: 'auto',
    },
    CardActionsCenterButton: {
        marginTop: "5px",
        height: "40px",
        marginBottom: "5px",
    },
    CardContentGrid: {
        width: "100%"
    },
    CardContentSmallActionButtom: {
        marginTop: "8px",
    },
    gridDivider: {
        marginTop: 100,
    },
    icons: {
        color: theme.palette.primary.contrastText,
    },
    iconsStarPush: {
        color: "#ffeb3b",
    },
    iconsPinPush: {
        color: "#8bc34a",
    },
    Menu: {
        color: theme.palette.primary.contrastText,
    },
    media: {
        height: 320,
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        marinLeft: 0,
        marginRight: 0,
    },
    title: {
        fontSize: 28,
        color: theme.palette.primary.contrastText,
    },
    subtitle: {
        fontSize: 20,
        color: theme.palette.primary.contrastText,
    },
    Page: {
        height: 320,
        width: '100%',
        paddingLeft: 0,
        paddingRight: 0,
        marinLeft: 0,
        marginRight: 0,
    },
    popper: {
        zIndex: 1000,
        //position: 'fixed',
    },
    gridCreateCourseAC: {
        padding: 32,
        width: '99%',
        minHeight: "480px",
    },
    courseCreationLable: {
        color: theme.palette.primary.contrastText,
    },
    AddIcon: {
        color: theme.palette.primary.contrastText,
    },
    moreAboutCourses: {
        color: theme.palette.primary.contrastText,
    },
    courseAlrdCreationLable: {
        color: theme.palette.primary.contrastText,
    },
    ListIcon: {
        color: theme.palette.primary.contrastText,
    },
    lastLabel: {
        color: theme.palette.primary.contrastText,
    },
    moreAboutCourses: {
        color: theme.palette.primary.contrastText,
        marginTop: 4,
    },
    courseAlrdCreationLable: {
        fontSize: 20,
        color: theme.palette.primary.contrastText,
    }
}));

const coursesThemeList = {
    "math": "Математика",
    "algebra": "Алгебра",
    "geometry": "Геометрия",
    "languages": "Языки",
    "physics": "Физика",
    "chemistry": "Химия",
    "biology": "Биология",
    "geography": "География",
    "history": "История",
    "social-science": "Обществознание",
    "philosophy": "Философия",
    "literature": "Литература",
    "arts": "Искусства",
    "informatics": "Информатика",
}

const coursesImgList = {
    "Робототехника": "/education/robotechnik.jpg",
    "Безопасность в интернете": "/education/secureInInternet.jpg",
    "Математика ЕГЭ": "/education/mathEGE.jpg",
    "English ABCs": "/education/EnglishABC.jpg",
    "Веб Дизайн": "/education/webdesign.jpg",
    "Классическая Музыка": "/education/musicClassic.jpg",
    "География": "/education/geography.jpg",
    "Геодезия": "/education/geodesia.jpg",
    "Океанология": "/education/oceanology.jpg",
    "Социология": "/education/sociology.jpg",
    "нформатика 7 класс": "/education/informatica.jpg",
    "Литература Европы XX века": "/education/literatureXX.jpg",
    "Python": "/education/python.jpg",
    "Ораторское искусство": "/education/publicSpeaking.jpg",
    "стория ЕГЭ": "/education/historyEGE.jpg",
    "Немецкий язык": "/education/deutsch.jpg",
    "Классическая философия": "/education/classicPhilosophy.jpg",
    "Литература": "/education/literature.jpg",
    "стория России": "/education/historyRussia.jpg",
    "Арифметика": "/education/arifmetic.jpg",
    "Архитектура XIX века": "/education/architecture.jpg",
    "Матан": "/education/math.jpg",
    "Физика: термодинамика": "/education/phi.jpeg",
}


const useStylesDialogAboutCourses = makeStyles((theme) => ({
    button: {
        color: theme.palette.primary.contrastText,
    }
}));

const Other = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = React.useState(false)

    useEffect(() => {
        if (!store.allHiddenCoursesLoad) {
            store.setHiddenCoursesCounter(0)
            store.loadingMoreHiddenCourses()
        }
    }, [])

    return (
        <Grid container className={classes.cardbegin}>
            <Grid xs={12} sm={12} md={6} lg={4} xl={3} item className={classes.gridCard} container>
                <Card className={classes.card}>
                    <Grid
                        className={classes.gridCreateCourseAC}
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Button onClick={() => setOpen(true)} className={classes.createCourseAC}>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <Typography className={classes.courseAlrdCreationLable}>Перейти к списку скрытых курсов</Typography>
                                <ListIcon className={classes.ListIcon} />
                            </Grid>
                        </Button>
                        {/* <Button onClick={() => store.setOpenDialogAboutCourses(true)} className={classes.moreAboutCourses}>
                            Подробнее об устройстве курсов
                        </Button> */}
                    </Grid>
                    {open && <DialogHiddenList open={open} setOpen={setOpen} />}
                </Card>
            </Grid >
        </Grid >
    )
}));



export default Other;