import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Input, InputLabel, NativeSelect, FormControl, Grid, FormControlLabel, Switch, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';

import { SnackbarProvider, useSnackbar } from 'notistack';

import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((theme) => ({
    gridWrapper: {
        margin: 16,
        width: "calc(100% - 32px)",
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1,
    },
    stepLabel: {
        fontSize: 24,
        color: theme.palette.primary.contrastText,
        cursor: 'default',
    },
    stepSecondLabel: {
        fontSize: 20,
        color: theme.palette.primary.contrastText,
    },
    input: {
        // width: "calc(100% - 64px)",
        color: theme.palette.primary.contrastText,
        // // height: "32px",
        // margin: 16,
    },
    FormControl: {
        width: "calc(100% - 64px)",
        color: theme.palette.primary.contrastText,
        // height: "32px",
        marginTop: 8,
        marginLeft: 16,
        marginRight: 16,
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
}));

const StepOne = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [checked, setChecked] = React.useState(false)

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
            <Typography className={classes.stepLabel}> Шаг 1. Основная информация</Typography>
            <Typography className={classes.stepSecondLabel}> Заполните основную информацию о вашем новой страницы</Typography>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Название страницы
                </InputLabel>
                <Input
                    required
                    className={classes.input}
                    value={store.nowEditModule.name}
                    onChange={(event) => store.setnowEditModule("name", event.target.value)}
                // margin='dense'
                //multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Описание страницы
                </InputLabel>
                <Input
                    required
                    className={classes.input}
                    value={store.nowEditModule.description}
                    onChange={(event) => store.setnowEditModule("description", event.target.value)}
                    multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Тематика страницы
                </InputLabel>
                <Input
                    required
                    className={classes.input}
                    value={store.nowEditModule.description}
                    onChange={(event) => store.setnowEditModule("description", event.target.value)}
                    multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <Typography className={classes.categoryLabel}> Теперь выберете тип, к которому относится ваша страница </Typography>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Тип страницы
                </InputLabel>
                <NativeSelect
                    className={classes.NativeSelect}
                    // defaultValue={'Не выбрано'}
                    value={store.nowEditModule.category}
                    onChange={(event) => store.setnowEditModule("category", event.target.value)}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={'not selected'}> Не выбрано </option>
                    <option value={'middle-school'}> Теория </option>
                    <option value={'main-school'}> Практика </option>
                    <option value={'high-school'}> Тестовое задание </option>
                </NativeSelect>
            </FormControl>
            {/* <FormControl className={classes.FormControl} fullWidth>
                <FormControlLabel
                    control={
                        <Switch
                            checked={checked}
                            onChange={() => setChecked(prev => !prev)}
                            name="checkedB"
                            color="primary"
                        />
                    }
                    label="Чертёж"
                />
            </FormControl> */}
        </Grid>
    )
}))

export default StepOne