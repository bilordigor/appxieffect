import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import FlagIcon from '@material-ui/icons/Flag';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { inject, observer } from 'mobx-react'

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
    // media:
    // {
    //     height: 180,
    //     width: 320,
    //     paddingTop: '56.25%', // 16:9
    // },
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
    icons: {
        color: theme.palette.primary.contrastText,
    },
    iconsStarPush: {
        color: "#ffeb3b",
    },
    iconsPinPush: {
        color: "#8bc34a",
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
    "Робототехника": "/knowledge/robotechnik.jpg",
    "Безопасность в интернете": "/knowledge/secureInInternet.jpg",
    "Математика ЕГЭ": "/knowledge/mathEGE.jpg",
    "English ABCs": "/knowledge/EnglishABC.jpg",
    "Веб Дизайн": "/knowledge/webdesign.jpg",
    "Классическая Музыка": "/knowledge/musicClassic.jpg",
    "География": "/knowledge/geography.jpg",
    "Геодезия": "/knowledge/geodesia.jpg",
    "Океанология": "/knowledge/oceanology.jpg",
    "Социология": "/knowledge/sociology.jpg",
    "Информатика 7 класс": "/knowledge/informatica.jpg",
    "Литература Европы XX века": "/knowledge/literatureXX.jpg",
    "Python": "/knowledge/python.jpg",
    "Ораторское искусство": "/knowledge/publicSpeaking.jpg",
    "История ЕГЭ": "/knowledge/historyEGE.jpg",
    "Немецкий язык": "/knowledge/deutsch.jpg",
    "Классическая философия": "/knowledge/classicPhilosophy.jpg",
    "Литература": "/knowledge/literature.jpg",
    "История России": "/knowledge/historyRussia.jpg",
    "Арифметика": "/knowledge/arifmetic.jpg",
    "Архитектура XIX века": "/knowledge/architecture.jpg",
    "Матан": "/knowledge/math.jpg",
    "Физика: термодинамика": "/knowledge/phi.jpeg",
}

const ModulesList = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const { enqueueSnackbar } = useSnackbar();

    const options = [
        'Скрыть курс',
        'Пожаловаться',
        'Добавить в Избранное',
        'Закрепить',
    ];

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
        store.fetchDataScr(`${store.url}/modules/${id}/preference/`, "POST", answer)
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

    const setPinned = (id, bool) => {
        console.log(id, bool)
        let answer
        let value
        if (bool) {
            answer = { "a": "unpin" }
            value = false
        } else {
            answer = { "a": "pin" }
            value = true
        }
        console.log(answer)
        store.fetchDataScr(`${store.url}/modules/${id}/preference/`, "POST", answer,)
            .then((data) => {
                //console.log(data)
                if (data != undefined) {

                    if (data.a == true) {
                        store.setDataCoursesList(id, "pinned", value)
                        if (!bool) enqueueSnackbar('Курс успешно закреплён', { variant: 'success' });
                        if (bool) enqueueSnackbar('Курс успешно откреплён', { variant: 'success' });
                    } else {
                        enqueueSnackbar('Что-то пошло не так', { variant: 'error' });
                    }
                }
            });
    }

    const clickedHiddenCourse = (id, bool) => {
        store.storeClickedMoreVertIcon(id, false)
        console.log("id", id)
        let answer = { "a": "hide" }
        store.fetchDataScr(`${store.url}/modules/${id}/preference/`, "POST", answer,)
            .then((data) => {
                console.log(data)
                if (data != undefined) {

                    if (data.a == true) {
                        store.setOneCourseHidden(id)
                        store.setHiddenCoursesCounter(0)
                        store.setAllHiddenCoursesLoad(false)
                        store.clearHiddenCourses()
                        store.loadingMoreHiddenCourses()
                        enqueueSnackbar('Курс успешно скрыт', { variant: 'success' });
                    } else {
                        enqueueSnackbar('Что-то пошло не так', { variant: 'error' });
                    }
                }
            });

    }

    const clearHidden = () => {
        // store.getDataScr(`${store.url}/test/`).then(() => {
        // })
    }

    const clickedMoreVertIcon = (id, openMenu, event) => {
        if (openMenu == undefined) {
            store.storeClickedMoreVertIcon(id, true, event.currentTarget)
        } else {
            store.storeClickedMoreVertIcon(id, !openMenu, event.currentTarget)
        }
    }

    return (
        <Grid container className={classes.container}>
            {
                store.coursesList.map((course, index) => (
                    <Grid xs={12} sm={12} md={6} lg={4} xl={3} item className={classes.gridCard} container key={course.id}>
                        <Card className={cx(classes.card)} key={course.id}>
                            <Box className={classes.boxCardHeader}>
                                <CardHeader
                                    className={classes.cardHeader}
                                    title={<Typography className={classes.title}>{course.name}</Typography>}
                                    subheader={<Typography className={classes.subtitle}>{coursesThemeList[course.theme]}</Typography>}
                                />
                            </Box>
                            <div className={classes.Page}>
                                <CardMedia
                                    src="img"
                                    className={classes.media}
                                    image={coursesImgList[course.name] != undefined ? coursesImgList[course.name] : "/illustrations/astronaut.png"}
                                />
                                {/* <Skeleton animation={false} variant="rectangular"  height={320} />  */}
                            </div>

                            <CardContent className={classes.content}>
                                {/* <img
                                    className={classes.media}
                                    src={course.courseAvatar}
                                /> */}
                                <Grid container item direction="row" justify="flex-end" xs={12} className={classes.CardContentGrid}>
                                    <Grid container direction='row' className={classes.userownerinfo}>
                                        {/* {course.createrAvatar} */}
                                        <Grid><Avatar className={classes.avatar}> Ξ </Avatar></Grid>
                                        <Grid className={classes.gridcreater}>
                                            <Typography className={classes.overline}>Создатель</Typography>
                                            <Typography className={classes.name}>Ξ Effect</Typography>
                                        </Grid>
                                        {/* {course["author-name"]} */}
                                    </Grid>

                                    <Grid className={classes.CardContentSmallActionButtom}>
                                        <IconButton onClick={() => setStarred(course.id, course.starred)} color="primary" aria-label="add an alarm">
                                            {!course.starred && <StarBorderIcon className={classes.icons} />}
                                            {course.starred && <StarIcon className={classes.iconsStarPush} />}
                                        </IconButton>
                                    </Grid>
                                    <Grid className={classes.CardContentSmallActionButtom}>
                                        <IconButton onClick={() => setPinned(course.id, course.pinned)} color="primary" aria-label="add an alarm">
                                            {!course.pinned && <FlagOutlinedIcon className={classes.icons} />}
                                            {course.pinned && <FlagIcon className={classes.iconsPinPush} />}
                                        </IconButton>
                                    </Grid>
                                    <Grid className={classes.CardContentSmallActionButtom}>
                                        <IconButton variant="contained" color="primary" onClick={(event) => clickedMoreVertIcon(course.id, course.openMenu, event)}>
                                            <MoreVertIcon className={classes.icons} />
                                        </IconButton>
                                        {/* <Popper className={classes.popper} id={index} open={course.openMenu} anchorEl={course.openMenuTarget}>
                                            <Paper className={classes.popper}>
                                                <MenuList
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                > */}
                                        {/* <MenuItem onClick={() => clickedHiddenCourse(course.id, course.starred)}>Скрыть курс</MenuItem> */}
                                        {/* <MenuItem onClick={() => clearHidden()}>Пожаловаться</MenuItem> */}
                                        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                                        {/* </MenuList>
                                            </Paper>
                                        </Popper> */}
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions>
                                <Grid spacing={1} container justify="center" className={classes.CardActions}>
                                    <Grid>
                                        <Link
                                            href={{
                                                pathname: '/knowledge/course/[id]',
                                                query: { id: course.id },
                                            }}
                                            passHref>
                                            <Button variant="contained" color="primary" className={classes.CardActionsCenterButton}>
                                                {!course.started && <Typography variant="subtitle1">Приступить к модулю</Typography>}
                                                {course.started && <Typography variant="subtitle1">Продолжить модуль</Typography>}
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                ))

            }
        </Grid>
    )
}));



export default ModulesList;