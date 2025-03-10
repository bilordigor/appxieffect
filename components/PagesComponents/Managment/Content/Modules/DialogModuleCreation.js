import React, { useState, useEffect } from 'react';
import Link from "next/link";
import clsx from 'clsx';
import { Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';

import { inject, observer } from 'mobx-react'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';



import { useSwipeable } from 'react-swipeable';
import StepOne from './DialogModuleCreation/StepOne';
import StepTwo from './DialogModuleCreation/StepTwo';
import StepThree from './DialogModuleCreation/StepThree';



const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: 4,
        marginRight: 4,
        color: theme.palette.primary.contrastText,
    },
    mobileStepper: {
        // width: "100%",
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.blueGrey["6"],
    },
    icon: {
        color: theme.palette.primary.contrastText,
    },
    mainLabel: {
        fontSize: 20,
    },
    appBar: {
        position: 'relative',
        zIndex: 1,
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    gridMain: {
        margin: 0,
        padding: 0,
        //height: '100vh',
        // width: 'calc(100vw-48px)',
    },
    gridMainStepFour: {
        margin: 0,
        padding: 0,
        // width: '100vw',
        // marginTop: "-20px",
        // marginLeft: "-24px",
    },
    stepLabel: {
        fontSize: 24,
        cursor: 'default',
    },
    stepSecondLabel: {
        fontSize: 20,
        color: theme.palette.primary.contrastText,
    },
    input: {
        width: "calc(100% - 64px)",
        // height: "32px",
        margin: 16,
    },
    FormControl: {
        width: "calc(100% - 64px)",
        // height: "32px",
        margin: 16,
    },
    categoryLabel: {
        paddingTop: 12,
        fontSize: 20,
        color: theme.palette.primary.contrastText,
    },
    inputAddModule: {
        minWidth: "256px",
        // height: "32px",
        margin: 16,
    },
    noOneModuleLabel: {
        paddingTop: 8,
        paddingLeft: 20,
    },
    gridListItem: {
        paddingTop: 12,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 4,
        // borderRadius: 8,
        // border: `${theme.main.palette.content.border} solid 2px`,
        // '&:hover': {
        //     border: `${theme.main.palette.content.border} solid 2px`,
        // },
    },
    divider: {
        marginTop: '-4px',
        color: theme.palette.primary.contrastText,
        width: '100%',
        height: '2px',
    },
    dialog: {
        zIndex: "10 !important",
        width: '100vw',
        height: '100vh',
    },
    dialogTitle: {
        backgroundColor: theme.palette.blueGrey["6"],
        color: theme.palette.primary.contrastText,
        zIndex: 1,
    },
    dialogContent: {
        margin: 0,
        padding: 0,
        backgroundColor: theme.palette.blueGrey["6"],
        zIndex: 1,
    },
    dialogContentText: {
        color: theme.palette.primary.contrastText,
    },
    dialogActions: {
        backgroundColor: theme.palette.blueGrey["6"],
        zIndex: 1,

    },
}));


const DialogModuleCreation = inject('store')(observer(({ dialogModuleCreation, setDialogModuleCreation, store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [activeStep, setActiveStep] = React.useState(0);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
        <Dialog
            className={classes.dialog}
            fullScreen
            open={dialogModuleCreation}
            onClose={() => setDialogModuleCreation(false)}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Grid>
                            <Typography className={classes.mainLabel}> Создание модуля </Typography>
                        </Grid>
                        <Grid>
                            <Tooltip title="Сохранить">
                                <IconButton>
                                    <SaveIcon onClick={() => store.saveChangeInModuleEditor()} className={classes.icon} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Закрыть. Перед закрытием сохраните, иначе прогресс будет потерян">
                                <IconButton onClick={() => setDialogModuleCreation(false)}>
                                    <CloseIcon className={classes.icon} />
                                </IconButton>
                            </Tooltip>
                        </Grid>

                    </Grid>
                </Toolbar>
            </AppBar>
            {/* <DialogTitle id="scroll-dialog-title">

            </DialogTitle> */}
            <DialogContent className={classes.dialogContent}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                    className={clsx(classes.gridMain, {
                        [classes.gridMainStepFour]: activeStep == 1,
                    })}
                >
                    {activeStep == 0 && <StepOne />}
                    {activeStep == 1 && <StepTwo />}
                    {activeStep == 2 && <StepThree />}

                </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="center"
                >
                    <MobileStepper
                        variant="dots"
                        steps={3}
                        position="static"
                        activeStep={activeStep}
                        className={classes.mobileStepper}
                        nextButton={
                            <Button className={classes.button} onClick={handleNext} disabled={activeStep === 2}>
                                Вперёд
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button className={classes.button} onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Назад
                            </Button>
                        }
                    />
                </Grid>
            </DialogActions>
        </Dialog >
    )
}));

export default DialogModuleCreation