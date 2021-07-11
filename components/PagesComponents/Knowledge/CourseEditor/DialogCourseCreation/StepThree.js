import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';

import { SnackbarProvider, useSnackbar } from 'notistack';

import { inject, observer } from 'mobx-react'

import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import SaveIcon from '@material-ui/icons/Save';
import CloseIcon from '@material-ui/icons/Close';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: 4,
        marginRight: 4,
        // color: theme.main.palette.buttons.text,
    },
    mobileStepper: {
        // width: "100%",
        // backgroundColor: theme.main.palette.content.background,
    },
    icon: {
        // color: theme.main.palette.buttons.icon,
    },
    mainLabel: {
        fontSize: 20,
    },
    appBar: {
        position: 'relative',
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    gridMain: {
        //height: '100vh',
        width: 'calc(100vw-48px)',
    },
    stepLabel: {
        fontSize: 24,
        cursor: 'default',
    },
    stepSecondLabel: {
        fontSize: 20,
        // color: theme.main.palette.content.border,
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
        // color: theme.main.palette.content.border,
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
        // color: theme.main.palette.content.border,
        width: '100%',
        height: '2px',
    },
    gridInput: {
        padding: "0px 0px",
        width: '100%'
    },
    gridAddButton: {
        paddingLeft: 24,
        paddingBottom: 24,
    }
}));

const StepThree = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [moduleLabel, setModuleLabel] = React.useState('')
    const [moduleType, setModuleType] = React.useState('standard')
    const [moduleThreshold, setModuleThreshold] = React.useState('')
    const [modulePoints, setModulePoints] = React.useState('')


    const deleteModule = (name) => {
        store.deleteModuleInMenu(name)
        store.deleteModuleInMap(name)
    }

    const AddModule = () => {
        if (moduleLabel != '' && moduleThreshold != '') {
            store.pushNewModuleToMenu(moduleLabel, moduleType, moduleThreshold, modulePoints)
            setModuleLabel('')
            setModuleType('standard')
            setModuleThreshold('')
            setModulePoints('')
        }
    }

    return (
        <Grid
            xs={12} sm={12} md={6} lg={6} xl={6}
            container
            item
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Typography className={classes.stepLabel}> Шаг 2. Создание модулей </Typography>
            <Typography className={classes.stepSecondLabel}> Создайте Модули вашего курса </Typography>
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="flex-start"
            >
                <Grid className={classes.gridInput}>
                    <Input
                        className={classes.input}
                        placeholder="Название модуля"
                        value={moduleLabel}
                        onChange={(event) => setModuleLabel(event.target.value)}
                        fullWidth={true}
                    />
                </Grid>
                <Grid className={classes.gridInput}>
                    <FormControl className={classes.FormControl} fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Тип модуля
                        </InputLabel>
                        <NativeSelect
                            // defaultValue={'Не выбрано'}
                            value={moduleType}
                            onChange={(event) => setModuleType(event.target.value)}
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                        >
                            <option value={'standard'}> Стандартный </option>
                            <option value={'theory'} > Теоретический </option>
                            <option value={'practice'}> Практический </option>
                            <option value={'test'}> Тестовый </option>

                        </NativeSelect>
                    </FormControl>
                </Grid>
                <Grid className={classes.gridInput}>
                    <Input
                        className={classes.input}
                        placeholder="Порог (целое число)"
                        value={moduleThreshold}
                        onChange={(event) => setModuleThreshold(event.target.value)}
                        fullWidth={true}
                    />
                </Grid>
                {moduleType === "standard" && <Grid className={classes.gridInput}>
                    <Input
                        className={classes.input}
                        placeholder="Очки (целое число)"
                        value={modulePoints}
                        onChange={(event) => setModulePoints(event.target.value)}
                        fullWidth={true}
                    />
                </Grid>}
                <Grid className={classes.gridAddButton}>
                    <Button onClick={AddModule} variant="contained">
                        Добавить
                    </Button>
                </Grid>

            </Grid>


            {store.nowEditCourse.menu.length === 0 && <Typography className={classes.noOneModuleLabel}> Не создано ни одного модуля </Typography>}
            {
                store.nowEditCourse.menu.length != 0 && <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    {
                        store.nowEditCourse.menu.map((module, id) => (
                            <Grid
                                container
                                direction="column"
                                justify="center"
                                alignItems="center"
                                className={classes.gridListItem}
                                key={id}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-between"
                                    alignItems="center"
                                >
                                    <Grid>
                                        <Typography className={classes.listMainLabel}> {module.name} </Typography>
                                    </Grid>
                                    <Grid>

                                        <IconButton onClick={() => deleteModule(module.name)}>
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
                </Grid>
            }
        </Grid >
    )
}))

export default StepThree