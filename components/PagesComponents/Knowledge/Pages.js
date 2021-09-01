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

const Toolbar = ({ prevPage, nextPage, counter, pl }) => {
    const classes = useStylesToolbar();

    return (
        <>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Button onClick={prevPage} className={classes.Button} variant="contained" color="primary" disabled={counter === 0 ? true : false}>
                    Назад
                </Button>
                <Typography className={classes.Typography} variant="subtitle1">
                    {`Страница ${counter + 1}`}
                </Typography>
                <Button onClick={nextPage} className={classes.Button} variant="contained" color="primary" disabled={pl < 50 ? true : false}>
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
    container: {
        marginTop: 16,
        marginBottom: 16,
        height: '100%',
        width: '100%',
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
    const [loadingInd, setLoadingInd] = React.useState(true)
    const [loadingNothing, setLoadingNothing] = React.useState(false)

    React.useEffect(() => {
        LoadPage(false, counter, search)
    }, []);

    const LoadPage = (isSearch, c, s) => {
        setLoadingInd(true)
        //console.log("LoadPage", c, s)
        store.fetchDataScr(`${store.url}/pages/`, "POST", { "counter": c, "search": s != "" ? s : null }).then(
            (data) => {
                console.log(data)
                setPages(data)
                setLoadingInd(false)
                if (isSearch && data.length === 0) setLoadingNothing(true)

            })
    }

    const prevPage = () => {
        setCounter(prev => prev - 1)
        LoadPage(false, counter - 1, search)
    }

    const nextPage = () => {
        setCounter(prev => prev + 1)
        LoadPage(false, counter + 1, search)
    }

    const goSearch = () => {
        setLoadingNothing(false)
        setCounter(0)
        LoadPage(true, 0, search)
    }

    const clearSearch = () => {
        setCounter(0)
        LoadPage(false, 0, "")
    }

    return (
        <>
            <Chipper clearSearch={clearSearch} goSearch={goSearch} search={search} setSearch={setSearch} dataType={dataType} setDataType={setDataType} setSize={setSize} />
            {!loadingNothing && <>
                {!loadingInd && <PagesList pages={pages} dataType={dataType} size={size} />}
                {!loadingInd && <Toolbar prevPage={prevPage} nextPage={nextPage} counter={counter} pl={pages.length} />}
                {loadingInd &&
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                        className={classes.container}
                    >
                        <CircularProgress />
                    </Grid>
                }
            </>}
            {loadingNothing &&
                <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={classes.container}
                >
                    <Typography> Ничего не найдено по запросу </Typography>
                    <div>
                        <Image
                            alt="img"
                            src="/illustrations/astronaut.png"
                            //layout="fill"
                            width={600}
                            height={562}
                        //objectFit="cover"
                        //quality={100}
                        />
                    </div>
                </Grid>
            }
        </>
    )
}));


export default Pages;