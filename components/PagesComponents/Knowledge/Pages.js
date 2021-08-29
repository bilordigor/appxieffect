/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

import { Button, CircularProgress, Grid, Typography, makeStyles, useTheme } from '@material-ui/core';

import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import Chipper from './Pages/Chipper';
import PagesList from './Pages/PagesList';

const useStylesToolbar = makeStyles((theme) => ({
    Button: {
        marginLeft: 16,
        marginRight: 16,
        color: theme.palette.primary.contrastText,
    },
    Typography: {
        color: theme.palette.primary.contrastText,
    }
}));

const Toolbar = ({ counter, pl }) => {
    const classes = useStylesToolbar();

    return (
        <>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Button className={classes.Button} variant="contained" color="primary" disabled={counter === 0 ? true : false}>
                    Назад
                </Button>
                <Typography className={classes.Typography} variant="subtitle1">
                    {`Страница ${counter + 1}`}
                </Typography>
                <Button className={classes.Button} variant="contained" color="primary" disabled={pl < 50 ? true : false}>
                    Вперёд
                </Button>
            </Grid>
        </>
    )
}

const useStyles = makeStyles((theme) => ({
    gridLoading: {
        marginTop: 8,
        marginBottom: 8,
        //height: 96,
    },
    labelThatsAll: {
        fontSize: 24,
        color: theme.palette.primary.contrastText,
    },
}));

const Pages = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [dataType, setDataType] = React.useState("list")

    const [size, setSize] = React.useState({
        md: 6,
        lg: 4,
        xl: 3,
    })

    const [pages, setPages] = React.useState([])
    const [counter, setCounter] = React.useState(0)
    const [search, setSearch] = React.useState("")

    const LoadPage = () => {
        store.fetchDataScr(`${store.url}/pages/`, "POST", { "counter": counter, "search": search }).then(
            (data) => {
                console.log(data)
                setPages(data)
            })
    }

    React.useEffect(() => {
        LoadPage()
    }, []);

    const goSearch = () => {
        setCounter(0)
        store.fetchDataScr(`${store.url}/pages/`, "POST", { "counter": counter, "search": search }).then(
            (data) => {
                console.log(data)
                setPages(data)
            })
    }

    return (
        <>
            <Chipper goSearch={goSearch} search={search} setSearch={setSearch} dataType={dataType} setDataType={setDataType} setSize={setSize} />
            <PagesList pages={pages} dataType={dataType} size={size} />
            <Toolbar counter={counter} pl={pages.length} />
        </>
    )
}));


export default Pages;