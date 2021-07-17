import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';

import { SnackbarProvider, useSnackbar } from 'notistack';

import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((theme) => ({
    button: {
        marginLeft: 4,
        marginRight: 4,
        color: theme.palette.primary.contrastText,
    },
    mobileStepper: {
        // width: "100%",
        // backgroundColor: theme.main.palette.content.background,
    },
    icon: {
        color: theme.palette.primary.contrastText,
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

    return (
        <Grid
            xs={12} sm={12} md={6} lg={6} xl={6}
            container
            item
            direction="column"
            justify="flex-start"
            alignItems="flex-start"
        >
            <Typography className={classes.stepLabel}> Шаг 1. Основная информация</Typography>
            <Typography className={classes.stepSecondLabel}> Заполните основную информацию о вашем новом модуле</Typography>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Название модуля
                </InputLabel>
                <Input
                    required
                    className={classes.input}
                    value={store.nowEditCourse.name}
                    onChange={(event) => store.setNowEditCourse("name", event.target.value)}
                // margin='dense'
                //multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Описание модуля
                </InputLabel>
                <Input
                    required
                    className={classes.input}
                    value={store.nowEditCourse.title}
                    onChange={(event) => store.setNowEditCourse("title", event.target.value)}
                    multiline={true}
                // fullWidth={true}
                />
            </FormControl>
            <Typography className={classes.categoryLabel}> Теперь выберете категории, к которым относится ваш модуль </Typography>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Категория
                </InputLabel>
                <NativeSelect
                    className={classes.NativeSelect}
                    // defaultValue={'Не выбрано'}
                    value={store.nowEditCourse.category}
                    onChange={(event) => store.setNowEditCourse("category", event.target.value)}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={'not selected'}> Не выбрано</option>
                    <option value={'middle-school'} >Средняя школа</option>
                    <option value={'main-school'}>Основная школа</option>
                    <option value={'high-school'}>Высшая школа</option>
                    <option value={'clubs'}>Кружки</option>
                    <option value={'hobby'}>Хобби</option>
                    <option value={'bne'}>ОГЭ</option>
                    <option value={'une'}>ЕГЭ</option>
                    <option value={'university'}>Высшее образование</option>
                    <option value={'prof-skills'}>Профессиональные навыки</option>

                </NativeSelect>
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Тема
                </InputLabel>
                <NativeSelect
                    className={classes.NativeSelect}
                    value={store.nowEditCourse.theme}
                    onChange={(event) => store.setNowEditCourse("theme", event.target.value)}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option value={'not selected'}>Не выбрано</option>
                    <option value={'math'}>Математика</option>
                    <option value={'algebra'}>Алгебра</option>
                    <option value={'geometry'}>Геометрия</option>
                    <option value={'languages'}>Языки</option>
                    <option value={'physics'}>Физика</option>
                    <option value={'chemistry'}>Химия</option>
                    <option value={'biology'}>Биология</option>
                    <option value={'geography'}>География</option>
                    <option value={'history'}>История</option>
                    <option value={'social-science'}>Обществознание</option>
                    <option value={'philosophy'}>Философия</option>
                    <option value={'literature'}>Литература</option>
                    <option value={'arts'}>Искусства</option>
                    <option value={'informatics'}>Информатика</option>



                </NativeSelect>
            </FormControl>
            <FormControl className={classes.FormControl} fullWidth>
                <InputLabel className={classes.InputLabel} variant="standard" htmlFor="uncontrolled-native">
                    Сложность
                </InputLabel>
                <NativeSelect
                    className={classes.NativeSelect}
                    value={store.nowEditCourse.difficulty}
                    onChange={(event) => store.setNowEditCourse("difficulty", event.target.value)}
                    inputProps={{
                        name: 'age',
                        id: 'uncontrolled-native',
                    }}
                >
                    <option className={classes.option} value={'not selected'}>Не выбрано</option>
                    <option value={'review'}> Обзорный</option>
                    <option value={'newbie'}> Новичок</option>
                    <option value={'amateur'}> Любитель</option>
                    <option value={'enthusiast'}> Энтузиаст</option>
                    <option value={'professional'}> Профи</option>
                    <option value={'expert'}> Эксперт</option>
                </NativeSelect>
            </FormControl>
        </Grid>
    )
}))

export default StepOne