import React from 'react';

import { CircularProgress, Grid, Typography, makeStyles, useTheme } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import { inject, observer } from 'mobx-react'
import Text from './Components/Text';
import Header from './Components/Header';


const useStyles = makeStyles((theme) => ({
    wrapperRoot: {
        marginTop: 16,
        maxWidth: 800,
    },
    wrapper: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        width: "calc(100% - 4px)",
        margin: 1,
        padding: 1,
    },
}));


const PageCompList = inject('store')(observer(({ loading, components, store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const componentsSelect = (value) => {
        if (value.type === "h") return (
            <>
                <Header value={value} />
            </>
        )
        if (value.type === "text") return (
            <>
                <Text value={value} />
            </>
        )
    }

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
            className={classes.wrapperRoot}
        >
            {components.map((value, index) => (
                <Grid className={classes.wrapper} key={index}>
                    {loading ? <Skeleton variant="rect" animation="wave" height={64} /> :
                        componentsSelect(value)}
                </Grid>
            ))}
        </Grid>
    )
}));


export default PageCompList;