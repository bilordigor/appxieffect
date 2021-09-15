/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import clsx from 'clsx';
import { Divider, CardContent, Popper, MenuList, Avatar, withStyles, Paper, Accordion, IconButton, Chip, AccordionSummary, AccordionDetails, CardHeader, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { SnackbarProvider, useSnackbar } from 'notistack';
import { inject, observer } from 'mobx-react'

const CustomTooltip = withStyles((theme) => ({
    tooltip: {
        //backgroundColor: theme.palette.common.white,
        //color: 'rgba(0, 0, 0, 0.87)',
        //boxShadow: theme.shadows[1],
        fontSize: 14,
    },
}))(Tooltip);

const useStyles = makeStyles((theme) => ({
    container: {
        marginTop: 16,
        marginBottom: 16,
        height: '100%',
        width: '100%',
    },
    containerColumn: {
        maxWidth: 400,
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
    cardColumn: {
        maxWidth: 700,
    },
    content: {
        marginTop: 2,
        paddingTop: 0,
    },
    cardHeader: {
        color: theme.palette.primary.contrastText,
        marginBottom: 0,
        paddingBottom: 0,
    },
    CardActionsCenterButton: {
        marginTop: "5px",
        height: "40px",
        marginBottom: "5px",
    },
    title: {
        fontSize: 28,
        color: theme.palette.primary.contrastText,
    },
    Accordion: {
        margin: 0,
        padding: 0,
        background: theme.palette.blueGrey["5"],
    },
    AccordionSummary: {
        marginLeft: 2,
        marginRight: 2,
        padding: 0,
    },
    Chip: {
        //border: '2px solid',
        marginRight: 4,
    },
    CardActions: {
        marginTop: "auto",
        marginBottom: 0,
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
    Divider: {
        marginTop: 4,
        marginBottom: 4,
        height: 1,
        width: "100%",
        backgroundColor: theme.palette.primary.contrastText,
    },
    popper: {
        zIndex: 1000,
        //position: 'fixed',
    },
    pageName: {
        cursor: "default",
        marginTop: 16,
        marginLeft: 16,
        fontSize: 24,
        color: theme.palette.primary.contrastText,
    },
    pageDescription: {
        cursor: "default",
        marginTop: 12,
        marginLeft: 0,
        fontSize: 16,
        color: theme.palette.primary.contrastText,
    },
    Tooltip: {
        //fontSize: 24,
    }
}));

const useStylesViews = makeStyles((theme) => ({
    icon: {
        marginLeft: 12,
        marginRight: 8,
        color: theme.palette.primary.contrastText,
    }
}));

const Views = React.memo(({ views }) => {
    const classes = useStylesViews();
    if (views < 1000) {
        return (
            <>
                <VisibilityIcon className={classes.icon} />
                <Typography> {`${views}`} </Typography>
            </>
        )
    }
    if (views >= 1000 && views < 1000000) {
        return (
            <>
                <VisibilityIcon className={classes.icon} />
                <Typography> {`${Math.round(views / 1000)}к`} </Typography>
            </>
        )
    }
    if (views > 1000000) {
        return (
            <>
                <VisibilityIcon className={classes.icon} />
                <Typography> {`${Math.round(views / 1000000)} млн`} </Typography>
            </>
        )
    }
})


const PagesList = inject('knowledgeStore')(observer(({ knowledgeStore, dataType, size }) => {
    const classes = useStyles();
    const theme = useTheme();

    const { enqueueSnackbar } = useSnackbar();

    const kindSelect = (value) => {
        if (value === "practice") return "Практика"
        if (value === "task") return "Задание"
        if (value === "theory") return "Теория"
    }

    return (
        <Grid
            container
            direction={dataType === "grid" ? "column" : "row"}
            justify="center"
            alignItems="center"
            className={classes.container}
        >
            {
                knowledgeStore.pageList.pages.map((page, index) => (
                    <Grid xs={12} sm={12} md={size.md} lg={size.lg} xl={size.xl} item
                        className={clsx(classes.gridCard, { [classes.cardColumn]: dataType === "grid" })}
                        container key={index}>
                        <Card className={cx(classes.card)}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid item xs zeroMinWidth>
                                    <CustomTooltip className={classes.Tooltip} arrow title={`Название: ${page.name}`}>
                                        <Typography className={classes.pageName} noWrap>{page.name}</Typography>
                                    </CustomTooltip>
                                </Grid>
                            </Grid>
                            <CardContent className={classes.content}>
                                <Grid
                                    container
                                    direction="column"
                                    justify="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justify="flex-start"
                                        alignItems="center"
                                    >
                                        <Chip className={classes.Chip} label={page.theme} size="small" color="primary" />
                                        <Chip className={classes.Chip} label={kindSelect(page.kind)} size="small" color="primary" />
                                        <Views views={page.views} />
                                    </Grid>
                                    {/* <Divider className={classes.Divider} /> */}
                                    <Grid container wrap="nowrap" spacing={2}>
                                        <Grid item xs zeroMinWidth>
                                            <CustomTooltip className={classes.Tooltip} arrow title={`Описание`}>
                                                <Typography className={classes.pageDescription} noWrap>{page.description != null ? page.description : "Автор не оставил описание страницы"}</Typography>
                                            </CustomTooltip>
                                        </Grid>
                                    </Grid>
                                    {/* <Divider className={classes.Divider}/> */}
                                    <Grid container item direction="row" justify="flex-end" xs={12} className={classes.CardContentGrid}>
                                        <Grid container direction='row' className={classes.userownerinfo}>
                                            {/* {course.createrAvatar} */}
                                            <Grid><Avatar className={classes.avatar}> {page["author_name"][0].toUpperCase()} </Avatar></Grid>
                                            <Grid className={classes.gridcreater}>
                                                <Typography className={classes.overline}>Создатель</Typography>
                                                <Typography className={classes.name}>{page["author_name"]}</Typography>
                                            </Grid>
                                            {/* {course["author-name"]} */}
                                        </Grid>

                                        {/* <Grid className={classes.CardContentSmallActionButtom}>
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
                                        </Grid> */}
                                        <Grid className={classes.CardContentSmallActionButtom}>
                                            {/* <IconButton variant="contained" color="primary" onClick={(event) => setOpenMenu(event.currentTarget)}>
                                                <MoreVertIcon className={classes.icons} />
                                            </IconButton> */}
                                            {/* <Popper className={classes.popper} id={undefined} open={Boolean(openMenu)} onClose={() => setOpenMenu(null)} anchorEl={openMenu}>
                                                <Paper className={classes.popper}>
                                                    <MenuList
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                    >
                                                        {/* <MenuItem onClick={() => clickedHiddenCourse(course.id, course.starred)}>Скрыть курс</MenuItem> */}
                                            {/* <MenuItem onClick={null}>Пожаловаться</MenuItem> */}
                                            {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                                            {/* </MenuList>
                                                </Paper>
                                            </Popper>  */}
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Divider />
                            <CardActions className={classes.CardActions}>
                                <Grid spacing={1} container justify="center" >
                                    <Grid>
                                        <Link
                                            href={{
                                                pathname: '/knowledge/page/[id]',
                                                query: { id: page.id },
                                            }}
                                            passHref>
                                            <Button variant="contained" color="primary" className={classes.CardActionsCenterButton}>
                                                <Typography variant="subtitle1">Перейти к странице</Typography>
                                                {/* <Typography variant="subtitle1">Продолжить модуль</Typography>} */}
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



export default PagesList;