import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Dialog, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles'
import { SnackbarProvider, useSnackbar } from 'notistack';

import { inject, observer } from 'mobx-react'


import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: 4,
        marginRight: 4,
        color: theme.palette.primary.contrastText,
    },
    mobileStepper: {
        width: "100%",
        backgroundColor: theme.palette.blueGrey["5"],
    },
    icon: {
        color: theme.palette.primary.contrastText,
    },
    mainLabel: {
        fontSize: 20,
    },
    listMainLabel: {
        cursor: 'default',
    },
    gridListItem: {
        paddingTop: 12,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 4,
        // borderRadius: 8,
        // border: `${theme.main.palette.content.border} solid 2px`,
        // '&:hover': {
        //     border: `${theme.main.palette.content.border} solid 2px`,
        // },
    },
    divider: {
        marginTop: '-4px',
        color: theme.palette.primary.dark,
        width: '100%',
        height: '2px',
    },
    EditIcon: {
        color: theme.palette.primary.contrastText,
    },
    DeleteForeverIcon: {
        color: theme.palette.primary.contrastText,

    },
    loadMoreButton: {
        borderRadius: '16px'
    },
    dialogTitle: {
        backgroundColor: theme.palette.blueGrey["6"],
        color: theme.palette.primary.contrastText,
    },
    dialogContent: {
        backgroundColor: theme.palette.blueGrey["6"],
    },
    dialogContentText: {
        color: theme.palette.primary.contrastText,
    },
    dialogActions: {
        backgroundColor: theme.palette.blueGrey["6"],
    },

}));

const DialogHiddenList = inject('store')(observer(({ store, open, setOpen }) => {
    const classes = useStyles();
    const theme = useTheme();

    const deleteCourseFromHiddenList = (id) => {
        let answer = { "a": "show" }
        store.fetchDataScr(`${store.url}/modules/${id}/preference/`, "POST", answer, )
            .then((data) => {
                console.log(data)
                if (data != undefined) {

                    if (data.a) {
                        store.hiddenCoursesFilter(id)
                        store.clearCoursesList()
                        store.counterZero()
                        store.setAllLoading(false)
                        store.setIsLoading(true)
                        store.loadingMoreCourses()

                    } else {
                        console.log("Упс")
                    }
                }
            });
    }

    const loadMore = () => {
        store.setHiddenCoursesCounter(store.hiddenCoursesCounter + 1)
        store.loadingMoreHiddenCourses()
    }


    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle className={classes.dialogTitle} id="scroll-dialog-title">
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid>
                        <Typography className={classes.mainLabel}> Список скрытых вами курсов </Typography>
                    </Grid>
                    <Grid>
                        <Tooltip title="Закрыть">
                            <IconButton onClick={() => setOpen(false)}>
                                <CloseIcon className={classes.icon} />
                            </IconButton>
                        </Tooltip>
                    </Grid>

                </Grid>
            </DialogTitle>
            <DialogContent className={classes.dialogContent} dividers={true}>
                <DialogContentText
                    className={classes.dialogContentText}
                    id="scroll-dialog-description"
                    // ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    {store.hiddenCourses.length === 0 && <Typography> У вас нет скрытых курсов </Typography>}
                    {store.hiddenCourses.length != 0 && <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        {
                            store.hiddenCourses.length != 0 && store.hiddenCourses.map((course) => (
                                <Grid
                                    key={course.name}
                                    container
                                    direction="column"
                                    justify="center"
                                    alignItems="center"
                                    className={classes.gridListItem}

                                >
                                    <Grid
                                        container
                                        direction="row"
                                        justify="space-between"
                                        alignItems="center"
                                    >
                                        <Grid>
                                            <Typography className={classes.listMainLabel}> {course.name} </Typography>
                                        </Grid>
                                        <Grid>
                                            <IconButton onClick={() => deleteCourseFromHiddenList(course.id)}>
                                                <Tooltip title="убрать из скрытого">
                                                    <CloseIcon className={classes.EditIcon} />
                                                </Tooltip>
                                            </IconButton>
                                        </Grid>
                                    </Grid>
                                    <Divider className={classes.divider} />
                                </Grid>

                            ))
                        }

                    </Grid>}
                </DialogContentText>
                {
                    store.hiddenCourses.length != 0 && !store.allHiddenCoursesLoad && <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Button variant="contained" onClick={() => loadMore()} className={classes.loadMoreButton}> Загрузить ещё </Button>
                    </Grid>

                }
            </DialogContent>
            <DialogActions className={classes.dialogActions}>

            </DialogActions>
        </Dialog>
    )
}));

export default DialogHiddenList