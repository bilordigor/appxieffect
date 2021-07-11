import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Dialog, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';

import { SnackbarProvider, useSnackbar } from 'notistack';

import { inject, observer } from 'mobx-react'

import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: 4,
        marginRight: 4,
        //color: theme.main.palette.buttons.text,
    },
    mobileStepper: {
        width: "100%",
        //backgroundColor: theme.main.palette.content.background,
    },
    icon: {
        //color: theme.main.palette.buttons.icon,
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
        //color: theme.main.palette.content.border,
        width: '100%',
        height: '2px',
    },
    EditIcon: {
        // color: theme.main.palette.help.green,
    },
    DeleteForeverIcon: {
        //color: theme.main.palette.help.redbutton,

    }

}));

const DialogCourseList = inject('store')(observer(({ store, openDialogCourseList, setOpenDialogCourseList }) => {
    const classes = useStyles();
    const theme = useTheme();

    const сourseList = [
        { name: "Математика" },
        { name: "Геометрия 8 класс" },
        { name: "Алгебра 7 класс" },
    ]


    return (
        <Dialog
            open={openDialogCourseList}
            onClose={() => setOpenDialogCourseList(false)}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <DialogTitle id="scroll-dialog-title">
                <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                >
                    <Grid>
                        <Typography className={classes.mainLabel}> Список ваших курсов </Typography>
                    </Grid>
                    <Grid>
                        <Tooltip title="Закрыть">
                            <IconButton onClick={() => setOpenDialogCourseList(false)}>
                                <CloseIcon className={classes.icon} />
                            </IconButton>
                        </Tooltip>
                    </Grid>

                </Grid>
            </DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText
                    id="scroll-dialog-description"
                    // ref={descriptionElementRef}
                    tabIndex={-1}
                >
                    {сourseList.length === 0 && <Typography> У вас нет созданных и неопубликованных курсов </Typography>}
                    {сourseList.length != 0 && <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        {store.newCoursesList.length === 0 && <Typography> Вы не создали ни одного курса  </Typography>}
                        {
                            store.newCoursesList.length != 0 && store.newCoursesList.map((course) => (
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
                                            <IconButton>
                                                <Tooltip title="редактировать">
                                                    <EditIcon className={classes.EditIcon} />
                                                </Tooltip>
                                            </IconButton>
                                            <IconButton onClick={() => store.deleteCourse(course.name)}>
                                                <Tooltip title="удалить безвозвратно">
                                                    <DeleteForeverIcon className={classes.DeleteForeverIcon} />
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
            </DialogContent>
            <DialogActions>

            </DialogActions>
        </Dialog>
    )
}));

export default DialogCourseList