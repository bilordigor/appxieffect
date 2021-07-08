import * as React from 'react';
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { CircularProgress, Divider, Paper, Grid, AppBar, Toolbar, Typography, CssBaseline, useScrollTrigger, Box, Container, Fab, Zoom, Button } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles'

import { inject, observer } from 'mobx-react'
import Navigation from '../../components/main/Menu/Navigation';
import Background from '../../components/app/help/background/background';

const useStyles = makeStyles((theme) => ({
    root: {
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
        color: theme.main.palette.header.text,
    },
    labelMain: {
        fontWeight: 'bold',
        color: theme.main.palette.header.text,
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
        color: theme.main.palette.header.text,
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
        backgroundColor: theme.main.palette.content.text,
    },
    circularProgress: {
        color: theme.main.palette.header.text,
    },
    gridroot: {
        width: '100vw',
        minHeight: '100vh',
    },
    acceptButton: {
        borderRadius: 12,
        zIndex: 999,
        color: theme.main.palette.header.text,
        marginTop: 32,
    }
}));


const Email = inject('store')(observer((props) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter()
    const { id } = router.query
    // const fetching = () => {

    //     console.log(id)

    // }

    // // console.log(typeof(id))
    // React.useEffect(() => {
    //     //console.log(id)
    //     setTimeout(fetching, 5000)
    //     // } else if (data.a === "User doesn't exist") { //"User doesn't exist"
    //     //     props.store.setLoginValues("errorEmail", true)
    //     // } else if (data.a === "Wrong password") { //
    //     //     props.store.setLoginValues("errorPassword", true)
    //     // }
    // }, [])

    const wallpapers = () => {
        let count = Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1))) + Math.ceil(1)
        return "/wallpapers/hp" + count.toString() + ".jpg"
    }

    const acceptButtonClicked = () => {
        props.store.postData(`${props.store.url}/email-confirm/`, { "code": id })
            .then((data) => {
                //console.log(data)
                if (data.a) { //"Success"
                    props.store.setEmailCheckValues("serverAnswer", true)
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
                <Background src={wallpapers()} />
                <Grid container direction="column" justifyContent="flex-start" alignItems="center" className={classes.gridroot}>
                    <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.gridLabelMain}>
                        <Typography className={classes.labelMain}> Подтверждение почты </Typography>
                    </Grid>
                    <Button variant="contained" onClick={acceptButtonClicked} className={classes.acceptButton}>
                        Подтвердить
                    </Button>
                    {/* {!props.store.emailCheck.serverAnswer && <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.gridLabelSecondary}>
                        <CircularProgress className={classes.circularProgress} />
                    </Grid>} */}
                    {props.store.emailCheck.serverAnswer && <Grid container direction="row" justifyContent="center" alignItems="center" className={classes.gridLabelSecondary}>
                        <Typography className={classes.labelSecondary}> Ваша почта успешно подтверждена. С этой страницы можно уходить.</Typography>
                    </Grid>}
                </Grid>
            </div>
        </>
    );
}))

export default Email