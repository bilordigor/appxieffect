import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { FormControl, FormControlLabel, Grid, Switch, Button, Typography, useTheme, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

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
    gridWrapper: {
        margin: 16,
        width: "calc(100% - 32px)",
    },
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
    FormControl: {
        width: "calc(100% - 64px)",
        color: theme.palette.primary.contrastText,
        // height: "32px",
        marginTop: 8,
        marginLeft: 16,
    },
    categoryLabel: {
        paddingTop: 12,
        fontSize: 20,
        color: theme.palette.primary.contrastText,
    },
    InputLabel: {
        color: theme.palette.primary.contrastText,
    },
    NativeSelect: {
        color: theme.palette.primary.main
    },
    Button: {
        marginTop: 8,
        marginLeft: 16,
    }
}));

const StepThree = inject('managmentStore')(observer(({ managmentStore }) => {
    const classes = useStyles();


    return (
        <Grid
            className={classes.gridWrapper}
            xs={12} sm={12} md={6} lg={6} xl={6}
            container
            item
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Typography className={classes.stepLabel}> Шаг 3. Публикация</Typography>
            <Typography className={classes.stepSecondLabel}> Теперь осталось только опубликовать вашу страницу, для этого необходимо заполнить информацию:</Typography>
            <FormControl className={classes.FormControl} fullWidth>
                <FormControlLabel
                    control={
                        <Switch
                            checked={managmentStore.pageCreation.reusable}
                            onChange={(event) => managmentStore.setPageCreation("reusable", !managmentStore.pageCreation.reusable)}
                            name="reusable"
                            color="primary"
                        />
                    }
                    label="Позволить другим авторам использовать эту страницу в своих модулях"
                />
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <FormControlLabel
                    control={
                        <Switch
                            checked={managmentStore.pageCreation.public}
                            onChange={(event) => managmentStore.setPageCreation("public", !managmentStore.pageCreation.public)}
                            name="public"
                            color="primary"
                        />
                    }
                    label="Сделать страницу публичной. Все пользователи смогут её увидеть "
                />
            </FormControl>
            <Button onClick={() => managmentStore.savePage(true)} variant="contained" color="primary" className={classes.Button}>
                Завершить работу над страницей
            </Button>
        </Grid>
    )
}))

export default StepThree