/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import Head from 'next/head'
import { useRouter } from "next/router";

import { Divider, Paper, Grid, FormControlLabel, Button, makeStyles, useTheme, Menu, Hidden, IconButton, InputBase, Switch, Typography } from '@material-ui/core'

import { inject, observer } from 'mobx-react'

import NavigationAll from './../../../components/OtherComponents/Navigation/NavigationAll';
import PageCompList from './../../../components/PagesComponents/Knowledge/Page/PageCompList';
import Toolbar from '../../../components/PagesComponents/Knowledge/Page/Toolbar';

const useStyles = makeStyles((theme) => ({
    main: {
        width: '100%',
        zIndex: 1,
        //backgroundColor: 'red',
    },
}));

const Page = inject('store')(observer(({ store }) => {

    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter();

    const [components, setComponents] = React.useState([])
    const [meta, setMeta] = React.useState([])

    const LoadComponents = () => {
        let str = document.location.href.toString()
        const id = str.slice(str.lastIndexOf("/") + 1)
        console.log("id", id)
        store.fetchDataScr(`${store.url}/pages/${id}/components/`, "GET").then(
            (data) => {
                console.log(data)
                setComponents(data)
            })
    }

    const LoadMeta = () => {
        let str = document.location.href.toString()
        const id = str.slice(str.lastIndexOf("/") + 1)
        console.log("id", id)
        store.fetchDataScr(`${store.url}/pages/${id}/`, "GET").then(
            (data) => {
                console.log("meta", data)
                setMeta(data)
            })
    }

    React.useEffect(() => {
        LoadComponents()
        LoadMeta()
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
                <Grid
                    className={classes.main}
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    container
                >
                    <Toolbar meta={meta} />
                    <PageCompList components={components} />
                </Grid>
            </NavigationAll>

        </>
    )
}))


export default Page