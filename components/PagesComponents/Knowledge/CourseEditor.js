import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme } from '@material-ui/core';

// import { useContainedCardHeaderStyles } from '@mui-treasury/styles/cardHeader/contained';
// import { useSoftRiseShadowStyles } from '@mui-treasury/styles/shadow/softRise';
// import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
// import Page from 'react-page-loading'

import { SnackbarProvider, useSnackbar } from 'notistack';

import { inject, observer } from 'mobx-react'

import AddIcon from '@material-ui/icons/Add';
import ListIcon from '@material-ui/icons/List';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import FlagIcon from '@material-ui/icons/Flag';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import Image from 'next/image'
//import DialogCourseList from './CourseEditor/DialogCourseList';
//import DialogCourseCreation from './CourseEditor/DialogCourseCreation';

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
        color: theme.main.palette.buttons.text,
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

const CourseEditor = inject('store')(observer(({ store }) => {
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

        <Grid container className={classes.container}>
            <Grid xs={12} sm={12} md={6} lg={4} xl={3} item className={classes.gridCard} container>
                <Card className={classes.card}>
                    <Grid
                        className={classes.gridCreateCourseAC}
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Button onClick={() => store.setOpenDialogCourseCreation(true)} className={classes.createCourseAC}>
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                            >
                                <Typography className={classes.courseCreationLable}> Создать курс </Typography>
                                <AddIcon className={classes.AddIcon} />
                            </Grid>
                        </Button>
                        <Button onClick={() => store.setOpenDialogAboutCourses(true)} className={classes.moreAboutCourses}>
                            Подробнее об устройстве курсов
                        </Button>
                    </Grid>

                </Card>
            </Grid >
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
                                <Typography className={classes.courseAlrdCreationLable}>Перейти к списку неопубликованных курсов</Typography>
                                <ListIcon className={classes.ListIcon} />
                            </Grid>
                        </Button>
                        <Button onClick={() => store.setOpenDialogAboutCourses(true)} className={classes.moreAboutCourses}>
                            Подробнее об устройстве курсов
                        </Button>
                    </Grid>

                </Card>
            </Grid >
            {/* <DialogCourseList />
            <DialogAboutCourses />
            <DialogCourseCreation /> */}
            {
                store.ownCoursesList.length != 0 && store.ownCoursesList.map((course) => (
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
                                    className={classes.media}
                                    image={coursesImgList[course.name]}
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
                                        <Popper className={classes.popper} id={undefined} open={course.openMenu} anchorEl={course.openMenuTarget}>
                                            <Paper className={classes.popper}>
                                                <MenuList
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                >
                                                    <MenuItem onClick={() => clickedHiddenCourse(course.id, course.starred)}>Скрыть курс</MenuItem>
                                                    <MenuItem onClick={() => clearHidden()}>Пожаловаться</MenuItem>
                                                    {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                                                </MenuList>
                                            </Paper>
                                        </Popper>
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
                                                {!course.started && <Typography variant="subtitle1">Приступить к курсу</Typography>}
                                                {course.started && <Typography variant="subtitle1">Продолжить курс</Typography>}
                                            </Button>
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </Grid>
                ))

            }
            {store.ownCoursesList.length == 0 &&
                <Grid
                    xs={12} sm={12} md={6} lg={4} xl={3}
                    item
                    className={classes.gridCard}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <div>
                        <Image
                            alt="searchicon"
                            src="/knowledge/search.png"
                            //layout="fill"
                            width={200}
                            height={200}
                        //objectFit="cover"
                        //quality={100}
                        />
                    </div>
                    <Typography className={classes.lastLabel}> Вы ещё не создали ни одного курса, поэтому здесь пусто </Typography>
                </Grid >}
        </Grid >
    )
}));



export default CourseEditor;