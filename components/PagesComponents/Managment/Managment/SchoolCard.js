import React, { useState, useEffect } from 'react';
import Link from "next/link";
import cx from 'clsx';
import { Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme } from '@material-ui/core';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareOutlinedIcon from '@material-ui/icons/ShareOutlined';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import FlagIcon from '@material-ui/icons/Flag';
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((theme) => ({
    gridCard: {
        padding: 8,
    },
    card: {
        position: 'relative',
        //paddingLeft: 4,
        border: '2px solid',
        borderColor: theme.palette.primary.dark,
        borderRadius: 32,
        transition: '0.4s',
        '&:hover': {
            borderColor: theme.palette.primary.light,
        },
        // marginTop: theme.spacing(8),

        transition: '0.3s',
        width: '100%',
        overflow: 'initial',
        background: theme.palette.blueGrey["5"],
    },
}));

const AuthorCard = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const { enqueueSnackbar } = useSnackbar();

    return (
        <Grid
            xs={12} sm={12} md={6} lg={4} xl={3}
            item
            container
            className={classes.gridCard}
            direction="column"
            justifyContent="center"
            alignItems="center"
        >
            <Card className={cx(classes.card)}>

            </Card>
        </Grid>
    )
}));



export default AuthorCard;