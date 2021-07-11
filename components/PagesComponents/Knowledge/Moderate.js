import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme } from '@material-ui/core';

// import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
// import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
// import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import PushPinIcon from '@material-ui/icons/PushPin';
import PushPinOutlinedIcon from '@material-ui/icons/PushPinOutlined';
import Page from 'react-page-loading'

import { SnackbarProvider, useSnackbar } from 'notistack';

import { inject, observer } from 'mobx-react'

import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';

import DialogCourseList from './CourseEditor/DialogCourseList';
import DialogCourseCreation from './CourseEditor/DialogCourseCreation';

const useStyles = makeStyles((theme) => ({
    card: {
        position: 'relative',
        //paddingLeft: 4,
        // border: '4px solid',
        // borderColor: theme.main.palette.content.border,
        borderRadius: 4,
        transition: '0.4s',
        '&:hover': {
            borderColor: theme.main.palette.main.main,
        },
        // marginTop: theme.spacing(8),

        transition: '0.3s',
        width: '99%',
        overflow: 'initial',
        background: theme.main.palette.content.background,
    },
    content: {
        paddingTop: 6,
        textAlign: 'left',
        overflowX: 'auto',
        '& table': {
            marginBottom: 0,
        }
    },
    gridCard: {
        paddingRight: 2,
        paddingLeft: 2,
        paddingBottom: 20,
    },
    cardbegin: {
        zIndex: 999,

        // [theme.breakpoints.only('xs')]: {
        //     paddingLeft: theme.spacing(2),
        // },
        //marginBottom: 16,
        height: '100%',
        width: '100%',
        marginRight: '-50px',
        // paddingLeft: theme.spacing(12),
        // paddingRight: theme.spacing(2),
        // backgroundColor: "blue"
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
        color: theme.main.palette.content.text,
    },
    avatar: {
        borderRadius: 8,
        backgroundColor: theme.main.palette.content.secondary,
    },
    overline: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
        color: theme.main.palette.content.text,
    },
    name: {
        fontSize: 16,
        fontWeight: 500,
        color: theme.main.palette.content.text,
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
        color: theme.main.palette.content.icon,
    },
    iconsStarPush: {
        color: "#ffeb3b",
    },
    iconsPinPush: {
        color: "#8bc34a",
    },
    Menu: {
        color: theme.main.palette.content.border,
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
        color: theme.main.palette.content.text,
    },
    subtitle: {
        fontSize: 20,
        color: theme.main.palette.content.text,
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
    createCourseAC: {
        width: '99%',
        minHeight: "420px",
        border: "5px dashed #777"
    },
    courseCreationLable: {
        fontSize: 28,
        color: theme.main.palette.buttons.text,
    },
    AddIcon: {
        color: theme.main.palette.buttons.text,
        fontSize: 36,
    },
    ListIcon: {
        color: theme.main.palette.buttons.text,
        fontSize: 32,
    },
    moreAboutCourses: {
        color: theme.main.palette.buttons.text,
        marginTop: 4,
    },
    courseAlrdCreationLable: {
        fontSize: 20,
        color: theme.main.palette.buttons.text,
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
        color: theme.palette.primary.main,
    }
}));

const DialogAboutCourses = inject('store')(observer(({ store }) => {
    const classes = useStylesDialogAboutCourses();
    const theme = useTheme();


    return (
        <Dialog
            open={store.openDialogAboutCourses}
            onClose={() => store.setOpenDialogAboutCourses(false)}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">Подробнее о курсах</DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText
                    id="scroll-dialog-description"
                    // ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    {[...new Array(50)]
                        .map(
                            () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
                        )
                        .join('\n')}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className={classes.button} onClick={() => store.setOpenDialogAboutCourses(false)}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    )
}));

const Moderate = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    // const options = [
    //     'Скрыть курс',
    //     'Пожаловаться',
    //     'Добавить в Избранное',
    //     'Закрепить',
    // ];

    const { enqueueSnackbar } = useSnackbar();

    const setStarred = (id, bool) => {
        console.log("idSt", id, bool)
        let answer
        let value
        if (bool) {
            answer = { "a": "unstar" }
            value = false
        } else {
            answer = { "a": "star" }
            value = true
        }
        console.log(answer)
        store.postDataScr(`${store.url}/courses/${id}/preference/`, answer)
            .then((data) => {
                //console.log(data)
                if (data != undefined) {
                    if (data.a == true) {
                        store.setDataCoursesList(id, "starred", value)
                        if (!bool) enqueueSnackbar('Курс успешно добавлен в избранное', { variant: 'success' });
                        if (bool) enqueueSnackbar('Курс успешно убран из избранного', { variant: 'success' });
                    } else {
                        enqueueSnackbar('Что-то пошло не так', { variant: 'error' });
                    }
                }
            });
    }

    const clearHidden = () => {
        store.getDataScr(`${store.url}/test/`).then(() => {
        })
    }

    // const clickedMoreVertIcon = (id, openMenu, event) => {
    //     if (openMenu == undefined) {
    //         store.storeClickedMoreVertIcon(id, true, event.currentTarget)
    //     } else {
    //         store.storeClickedMoreVertIcon(id, !openMenu, event.currentTarget)
    //     }
    // }

    // useEffect(() => {
    //     store.loadingMoreOwnCourses()

    // }, []);

    const clickedEditCourse = (id) => {
        store.getDataScr(`${store.url}/modules/${id}/`)
            .then((data) => {
                console.log(data)
            });
    }

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
                        <Button onClick={() => store.setDialogCourseList(true)} className={classes.createCourseAC}>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <Typography className={classes.courseAlrdCreationLable}>Перейти к списку курсов на модерацию</Typography>
                                <ListIcon className={classes.ListIcon} />
                            </Grid>
                        </Button>
                        <Button onClick={() => store.setOpenDialogAboutCourses(true)} className={classes.moreAboutCourses}>
                            Подробнее о модерации
                        </Button>
                    </Grid>

                </Card>
            </Grid >
            <DialogCourseList />
            <DialogAboutCourses />
            <DialogCourseCreation />
        </Grid >
    )
}));



export default Moderate;