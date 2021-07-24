import * as React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { CircularProgress, Divider, Paper, Grid, AppBar, Toolbar, Typography, CssBaseline, useScrollTrigger, Box, Container, Fab, Zoom, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { inject, observer } from 'mobx-react'
import BackgroundImg from '../../components/OtherComponents/Background/BackgroundImg'
import Loading from './../../components/OtherComponents/Loading/Loading';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'fixed',
        height: '100vh',
        width: '100vw',
        zIndex: '-1',
        overflowY: 'auto',
        overflowX: 'hidden',
    },
    main: {
        zIndex: 999,
    },
    gridLabelMain: {
        paddingLeft: 16,
        cursor: 'default',
        paddingTop: 160,
        zIndex: 999,
    },
    gridLabelSecondary: {
        paddingLeft: 16,
        paddingRight: 16,
        cursor: 'default',
        paddingTop: 16,
        zIndex: 999,
    },
    gridLabelSecondarytwo: {
        paddingLeft: 16,
        paddingRight: 16,
        cursor: 'default',
        paddingTop: 2,
    },
    labelSecondarytwo: {
        zIndex: 999,
        fontSize: 20,
        color: theme.palette.primary.contrastText,
    },
    labelMain: {
        fontWeight: 'bold',
        color: theme.palette.primary.contrastText,
        [theme.breakpoints.up('lg')]: {
            fontSize: 48,
        },
        [theme.breakpoints.only('lg')]: {
            fontSize: 40,
        },
        [theme.breakpoints.down('lg')]: {
            fontSize: 24,
        },
        zIndex: 999,
    },
    labelSecondary: {
        color: theme.palette.primary.contrastText,
        fontSize: 20,
        zIndex: 999,
    },
    gridDivider: {
        marginTop: '80vh',
        //marginBottom: '100px',
        marginLeft: '10px',
        marginRight: '10px',
        width: 'auto',
    },
    divider: {
        zIndex: 999,
        height: 2,
        // width: 'auto',
        // marginLeft: '10px',
        // marginRight: '10px',
        backgroundColor: theme.palette.primary.contrastText,
    },
    circularProgress: {
        color: theme.palette.primary.contrastText,
    },
    gridroot: {
        width: '100vw',
        minHeight: '100vh',
    },
    acceptButton: {
        borderRadius: 12,
        zIndex: 999,
        color: theme.palette.primary.contrastText,
        marginTop: 32,
    }
}));


const Email = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter()
    const { id } = router.query

    const [ok, setOk] = React.useState(false)

    const acceptButtonClicked = () => {
        store.fetchData(`${store.url}/email-confirm/`, { "code": id }, "POST")
            .then((data) => {
                //console.log(data)
                if (data.a) { //"Success"
                    setOk(true)
                }
            })
    }

    return (
        <>
            <Head>
                <title>
                    Ξ Регистрация
                </title>
            </Head>
            <div className={classes.root}>
                <BackgroundImg src="/wallpapers/hp4.jpg" />
                <Grid container direction="column" justify="flex-start" alignItems="center" className={classes.gridroot}>
                    <Grid container direction="row" justify="center" alignItems="center" className={classes.gridLabelMain}>
                        <Typography className={classes.labelMain}> Подтверждение почты </Typography>
                    </Grid>
                    {!ok && <Button color="primary" variant="contained" onClick={acceptButtonClicked} className={classes.acceptButton}>
                        Подтвердить
                    </Button>}
                    {/* {!props.store.emailCheck.serverAnswer && <Grid container direction="row" justify="center" alignItems="center" className={classes.gridLabelSecondary}>
                        <CircularProgress className={classes.circularProgress} />
                    </Grid>} */}
                    {ok && <Grid container direction="row" justify="center" alignItems="center" className={classes.gridLabelSecondary}>
                        <Typography className={classes.labelSecondary}> Ваша почта успешно подтверждена. С этой страницы можно уходить.</Typography>
                    </Grid>}
                </Grid>
            </div>
        </>
    );
}))

export default Email