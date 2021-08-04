import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme } from '@material-ui/core';

import Pagination from '@material-ui/lab/Pagination';
import PaginationItem from '@material-ui/lab/PaginationItem';
import Image from 'next/image'
import { SnackbarProvider, useSnackbar } from 'notistack';
import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((theme) => ({
    gridCard: {
        padding: 8,
    },
    content: {
        position: 'relative',
        //paddingLeft: 4,
        border: '2px solid',
        borderColor: theme.palette.primary.dark,
        borderRadius: 64,
        transition: '0.4s',
        '&:hover': {
            borderColor: theme.palette.primary.light,
        },
        // marginTop: theme.spacing(8),
        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: theme.palette.blueGrey["5"],
        //width: '100%',
        height: '450px',
        //borderRadius: 64,
        //backgroundColor: theme.palette.blueGrey["5"],
        //border: `${theme.main.palette.content.border} solid 2px`,
    },
    gridPagination: {
        marginTop: 8,
    },
    PaginationItem: {
        color: theme.palette.primary.contrastText,
    },
    buttonAuthor: {
        position: "absolute",
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main,
        bottom: 8,
        // marginTop: "auto",
        // marginBottom: 8,
        "&:hover": {
        backgroundColor: theme.palette.primary.main,  
        },
    },
    labelContent: {
        margin: 16,
    }
}));

const AuthorCard = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const { enqueueSnackbar } = useSnackbar();

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    return (
        <Grid xs={12} sm={12} md={6} lg={4} xl={4} item className={classes.gridCard}
            container
            direction="column"
            justify="center"
            alignItems="center"
        >
            <Grid
                className={classes.content}
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                {page == 1 && <div className={classes.background}>
                    <Image
                        alt="HowBeginLearning"
                        src="/illustrations/HowBeginLearning.png"
                        //layout="fill"
                        width={350}
                        height={350}
                    //objectFit="cover"
                    //quality={100}
                    />
                </div>}
                {page == 2 && <Typography align="center" className={classes.labelContent}> {"На портале вы можете найти теорию, упражнения и тесты по многим предметам. Начните перейдя в раздел 'Знания', отмеченный в меню раскрытой книгой."} </Typography>}
                {page == 3 && <Typography align="center" className={classes.labelContent}> {"Чтобы найти именно то, что нужно, используйте фильтры. Детальная инструкция по их использованию есть в соответствующей карточке."} </Typography>}
                {page == 4 && <Typography align="center" className={classes.labelContent}> {"Все образовательные материалы, расположенные во вкладке 'Знания', сгруппированы в модули для упрощённой навигации, фильтрации и сортировки."} </Typography>}
                {page == 5 && <Typography align="center" className={classes.labelContent}> {"Модули делятся на четыре типа: стандартный модуль, блок теории, блок практики и тестирование. Об этих типах также можно узнать в соответствующей карточке."} </Typography>}
                <Button className={classes.buttonAuthor} variant="contained"> Стать Автором </Button>
            </Grid>
            <Grid
                className={classes.gridPagination}
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Pagination
                    renderItem={(item) => <PaginationItem className={classes.PaginationItem} {...item} />}
                    shape="rounded"
                    size="large"
                    count={5}
                    page={page}
                    onChange={handleChange} />
            </Grid>
        </Grid>
    )
}));



export default AuthorCard;