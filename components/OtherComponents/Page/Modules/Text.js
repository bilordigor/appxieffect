import React, { useState } from 'react';
import { Tabs, Tab, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));

const Text = ({ values }) => {
    const classes = useStyles();

    return (
        <>
            <Typography variant={values.variant} align={values.align}>{values.label}</Typography>
        </>
    );
}

export default Text