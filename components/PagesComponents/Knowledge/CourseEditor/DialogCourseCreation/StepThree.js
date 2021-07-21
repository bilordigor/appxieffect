import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Slider, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';

import { SnackbarProvider, useSnackbar } from 'notistack';

import { inject, observer } from 'mobx-react'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AvatarEditor from 'react-avatar-editor'
import { useFileUpload } from "use-file-upload"

const useStyles = makeStyles((theme) => ({
    stepLabel: {
        marginLeft: 16,
        fontSize: 24,
        cursor: 'default',
    },
    stepSecondLabel: {
        marginLeft: 16,
        fontSize: 20,
        cursor: 'default',
        // color: theme.main.palette.content.border,
    },
    slider: {
        width: "250px",
        padding: 16,
    },
    gridDialogAv: {
        height: '100%',
        padding: 16,
        //width: "550px",
    },
    uploadButton: {
        marginTop: 8,
    },
    wrapperGrid: {
        margin: 0,
    },
    changeLabel: {
        marginTop: 16,
    }
}));

const StepThree = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const options = ['Участник', 'Ученик', 'Преподаватель', 'Автор', 'Родитель'];

    const { enqueueSnackbar } = useSnackbar();

    const [value, setValue] = React.useState(10);

    const handleChangeValue = (event, newValue) => {
        setValue(newValue);
    };

    const [files, selectFiles] = useFileUpload();

    const setEditorRef = React.useRef(null);

    const saveNewAvatar = () => {
        const canvas = setEditorRef.current.getImage()
        const img = canvas.toDataURL()
        console.log(img)
        //setF(i)
        store.setSettings('avatar', img)
        store.postDataScr(`${store.url}/avatar/`, img)
            .then((data) => {
                console.log(data)
                // if (data.message != undefined) {
                //   console.log(data.message)
                // }
                if (data != undefined) {
                    //console.log(data.a)
                    //store.setSettings("avatar", data)
                } else {
                    console.log("Проблемы с сервером")
                }

            });
        //selectPr(canvas)
        setOpen1(false);
    }

    const saveNewUsername = () => {
        store.postDataScr(`${store.url}/settings/`, {
            "changed": { "username": store.settings.username }
        })
            .then((data) => {
                if (data.a) {
                    enqueueSnackbar('Успешно', {
                        variant: 'success',
                    });
                } else {
                    enqueueSnackbar('Ошибка', {
                        variant: 'error',
                    });
                }
            })
    }

    return (
        <>
            <Grid
                xs={12} sm={12} md={6} lg={6} xl={6}
                container
                item
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
            >
                <Typography className={classes.stepLabel}> Шаг 3. </Typography>
                <Typography className={classes.stepSecondLabel}> Добавьте изображение для вашего модуля </Typography>
                <Grid
                    className={classes.wrapperGrid}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    <Grid
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                        className={classes.gridDialogAv}
                    >

                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <AvatarEditor
                                ref={setEditorRef}
                                image={files?.source == undefined ? "/illustrations/defaultModuleImg.png" : files.source}
                                width={320}
                                height={180}
                                border={25}
                                borderRadius={0}
                                color={[114, 137, 218, 0.6]} // RGBA
                                scale={value / 10}
                                rotate={0}
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Button
                                onClick={() =>
                                    selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                                        console.log("Files Selected", { name, size, source, file });
                                    })
                                }
                                className={classes.uploadButton}
                                variant="contained"
                                color="primary"
                            >
                                Загрузить изображение
                            </Button>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Typography className={classes.changeLabel}> Изменить масштаб изображения </Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justify="flex-start"
                            alignItems="center"
                        >
                            <Slider
                                className={classes.slider}
                                value={value}
                                min={10}
                                max={30}
                                onChange={handleChangeValue}
                                aria-labelledby="continuous-slider"
                            />
                        </Grid>
                    </Grid>

                </Grid>

            </Grid >
            <Grid
                className={classes.stepWrapper}
                xs={12} sm={12} md={6} lg={6} xl={6}
                container
                item
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
            >
                <Typography className={classes.stepLabel}> Шаг 4. </Typography>
                <Typography className={classes.stepSecondLabel}> Теперь осталось только опубликовать модуль.  Прежде чем модуль станет доступен, он пройдёт модерацию. Это займёт некоторое время </Typography>
                <Grid
                    className={classes.wrapperGrid}
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="flex-start"
                >
                    

                </Grid>

            </Grid >
        </>
    )
}))

export default StepThree