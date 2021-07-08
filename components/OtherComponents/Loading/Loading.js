import React from 'react';
import { Grid, makeStyles, Typography, useTheme } from '@material-ui/core';
import Image from 'next/image'
import Loader from './Loader';

const useStyles = makeStyles((theme) => ({
    gridRoot: {
        width: "100vw",
        height: "100vh",
        zIndex: 1100,
        backgroundColor: theme.palette.blueGrey["5"]
    },
    label: {
        color: "#fff"
    }
}));

const Loading = () => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div id="content" className={classes.gridRoot}>
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                className={classes.gridRoot}
            >
                <Typography className={classes.label} variant='h3' noWrap> Effect </Typography>
                <Loader />
            </Grid>
        </div>

    )
};

export default Loading;
