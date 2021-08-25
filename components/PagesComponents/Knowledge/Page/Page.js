import React from 'react';

import { CircularProgress, Grid, Typography, makeStyles, useTheme } from '@material-ui/core';

import { inject, observer } from 'mobx-react'
import Text from './Components/Text';
import Header from './Components/Header';


const useStyles = makeStyles((theme) => ({

}));


const Page = inject('store')(observer(({ store, components }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [dataType, setDataType] = React.useState("list")

    const componentsSelect = (value) => {
        if (value.type === "h") return (
            <>
                <Header value={value}/>
            </>
        )
        if (value.type === "text") return (
            <>
                <Text value={value}/>
            </>
        )
    }

    return (
        <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            {components.map((value, index) => (
                <Grid key={index}>
                    {componentsSelect(value)}
                </Grid>
            ))}
        </Grid>
    )
}));


export default Page;