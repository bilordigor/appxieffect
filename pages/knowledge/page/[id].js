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

const Page = inject('rootStore', 'knowledgeStore')(observer(({ rootStore, knowledgeStore }) => {

    const classes = useStyles();
    const theme = useTheme();

    React.useEffect(() => {
        // LoadComponents()
        knowledgeStore.loadPage()
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
                    <Toolbar />
                    <PageCompList />
                </Grid>
            </NavigationAll>

        </>
    )
}))


export default Page