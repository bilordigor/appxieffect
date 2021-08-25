/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Paper, Grid, FormControlLabel, Button, makeStyles, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@material-ui/core'

import { inject, observer } from 'mobx-react'

import NavigationAll from './../../../components/OtherComponents/Navigation/NavigationAll';

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        zIndex: 1,
    },
}));

const Page = inject('store')(observer(({ store }) => {

    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();
    const [page, setPage] = React.useState(null)

    const LoadPage = () => {
        let str = document.location.href.toString()
        const id = str.slice(str.lastIndexOf("/") + 1)
        console.log("id", id)
        store.fetchDataScr(`${store.url}/pages/${id}`, "GET").then(
            (data) => {
                
                setPage(data)
            })
    }

    React.useEffect(() => {
        LoadPage()
    }, []);



    return (
        <>
            <Head>
                <title>
                    Ξ Effect
                </title>
            </Head>
            {/* <Background/> */}
            <NavigationAll>
                <Grid container direction="column" className={classes.main}>
                    {page}
                </Grid>
            </NavigationAll>

        </>
    )
}))


export default Page