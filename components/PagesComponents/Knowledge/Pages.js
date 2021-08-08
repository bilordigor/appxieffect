import React from 'react';

import { CircularProgress, Grid, Typography, makeStyles, useTheme } from '@material-ui/core';

import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import Chipper from './Pages/Chipper';
import PagesList from './Pages/PagesList';

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


    return (
        <>
            <Chipper dataType={dataType} setDataType={setDataType} setSize={setSize}/>
            <PagesList dataType={dataType} size={size}/>
        </>
    )
}));


export default Pages;