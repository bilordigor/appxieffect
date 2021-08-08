/* eslint-disable react/display-name */
import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import clsx from 'clsx';
import { Divider, CardContent, Popper, MenuList, Avatar, MenuItem, Paper, Accordion, IconButton, Chip, AccordionSummary, AccordionDetails, CardHeader, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { SnackbarProvider, useSnackbar } from 'notistack';
import { inject, observer } from 'mobx-react'



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
        border: '2px solid',
        marginLeft: 4,
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
}));

const Views = React.memo(({ value }) => {
    const classes = useStyles();
    if (value < 1000) {
        return (
            <Typography> {`${value} просмотров`} </Typography>
        )
    }
    if (value >= 1000 && value < 1000000) {
        return (
            <Typography> {`${Math.round(value / 1000)} тыс. просмотров`} </Typography>
        )
    }
    if (value > 1000000) {
        return (
            <Typography> {`${Math.round(value / 1000000)} млн. просмотров`} </Typography>
        )
    }
})


const PagesList = inject('store')(observer(({ dataType, size, store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [openMenu, setOpenMenu] = React.useState(null)

    const { enqueueSnackbar } = useSnackbar();

    const pages = [
        { label: "Название", type: "тип", theme: "тема", description: "описание" },
        { label: "Название", type: "тип", theme: "тема", description: "описание" },
        { label: "Название", type: "тип", theme: "тема", description: "описание" },
        { label: "Название", type: "тип", theme: "тема", description: "описание" },
        { label: "Название", type: "тип", theme: "тема", description: "описание" },
        { label: "Название", type: "тип", theme: "тема", description: "описание" },
        { label: "Название", type: "тип", theme: "тема", description: "описание" },
        { label: "Название", type: "тип", theme: "тема", description: "описание" },
        { label: "Название", type: "тип", theme: "тема", description: "описание" },
    ];


    return (
        <Grid
            container
            direction={dataType === "grid" ? "column" : "row"}
            justifyContent="center"
            alignItems="center"
            className={classes.container}
        >
            {
                pages.map((page, index) => (
                    <Grid xs={12} sm={12} md={size.md} lg={size.lg} xl={size.xl} item
                        className={clsx(classes.gridCard, { [classes.cardColumn]: dataType === "grid" })}
                        container key={index}>
                        <Card className={cx(classes.card)}>
                            <CardHeader
                                className={classes.cardHeader}
                                title={<Typography className={classes.title}>{page.label}</Typography>}
                                subheader={<Views value={123456} />}
                            />
                            <CardContent className={classes.content}>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                    >
                                        <Chip className={classes.Chip} label="Теория" size="small" variant="outlined" color="primary" />
                                        <Chip className={classes.Chip} label="Математика ЕГЭ" size="small" variant="outlined" color="primary" />
                                    </Grid>
                                    {/* <Divider className={classes.Divider} /> */}
                                    <Grid>
                                        <Typography> Описание </Typography>
                                    </Grid>
                                    {/* <Divider className={classes.Divider}/> */}
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
                                            <IconButton variant="contained" color="primary" onClick={(event) => setOpenMenu(event.currentTarget)}>
                                                <MoreVertIcon className={classes.icons} />
                                            </IconButton>
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
                                                query: { id: index },
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