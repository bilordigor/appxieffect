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

const Toolbar = inject('knowledgeStore')(observer(({ knowledgeStore }) => {
    const classes = useStylesToolbar();

    return (
        <>
            <Grid
                container
                direction="row"
                justify="center"    
                alignItems="center"
            >
                <Button onClick={knowledgeStore.prevPage} className={classes.Button} variant="contained" color="primary" disabled={knowledgeStore.pageList.counter === 0 ? true : false}>
                    Назад
                </Button>
                <Typography className={classes.Typography} variant="subtitle1">
                    {`Страница ${knowledgeStore.pageList.counter + 1}`}
                </Typography>
                <Button onClick={knowledgeStore.nextPage} className={classes.Button} variant="contained" color="primary" disabled={knowledgeStore.pageList.pages.length < 50 ? true : false}>
                    Вперёд
                </Button>
            </Grid>
        </>
    )
}));

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

const Pages = inject('knowledgeStore')(observer(({ knowledgeStore }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [dataType, setDataType] = React.useState("list")

    const [size, setSize] = React.useState({
        md: 6,
        lg: 4,
        xl: 3,
    })

    React.useEffect(() => {
        knowledgeStore.loadPageList()
    }, []);

    return (
        <>
            <Chipper dataType={dataType} setDataType={setDataType} setSize={setSize} />
            {!knowledgeStore.pageList.loadingNothing && <>
                {!knowledgeStore.pageList.loadingInd && <PagesList dataType={dataType} size={size} />}
                {!knowledgeStore.pageList.loadingInd && knowledgeStore.pageList.pages.length < 50 && <Grid
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                    className={classes.container}
                >
                    <Typography> Это всё, что мы нашли по вашему запросу </Typography>
                </Grid>}
                {!knowledgeStore.pageList.loadingInd && <Toolbar/>}
                {knowledgeStore.pageList.loadingInd &&
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
            {knowledgeStore.pageList.loadingNothing &&
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