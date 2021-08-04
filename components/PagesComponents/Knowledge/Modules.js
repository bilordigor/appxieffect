import React from 'react';

import { CircularProgress, Grid, Typography, makeStyles, useTheme } from '@material-ui/core';

import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import Chipper from './Modules/Chipper';
import ModulesList from './Modules/ModulesList';

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


const Modules = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();


    return (
        <>
            <Chipper />
            <ModulesList/>
            <Grid
                className={classes.gridLoading}
                container
                direction="column"
                justify="center"
                alignItems="center"
            >
                {store.isLoadingNewCourses && <CircularProgress />}
                {store.allLoading && <Typography className={classes.labelThatsAll}> На этом пока всё </Typography>}
                {store.allLoading && <div>
                    <Image
                        alt="img"
                        src="/knowledge/search.png"
                        //layout="fill"
                        width={100}
                        height={100}
                    //objectFit="cover"
                    //quality={100}
                    />
                </div>}
            </Grid>
        </>
    )
}));


export default Modules;