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

    const [loading, setLoading] = React.useState(true)

    const [meta, setMeta] = React.useState({
        components: [{}, {}, {}, {}, {}, {}] 
    })

    const LoadMeta = () => {
        let str = document.location.href.toString()
        const id = str.slice(str.lastIndexOf("/") + 1)
        console.log("id", id)
        store.fetchDataScr(`${store.url}/pages/${id}/`, "GET").then(
            (data) => {
                console.log("meta", data)
                setMeta(data)
                setLoading(false)
            })
    }

    React.useEffect(() => {
        // LoadComponents()
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
                    <Toolbar loading={loading} meta={meta} />
                    <PageCompList loading={loading} components={meta.components} />
                </Grid>
            </NavigationAll>

        </>
    )
}))


export default Page