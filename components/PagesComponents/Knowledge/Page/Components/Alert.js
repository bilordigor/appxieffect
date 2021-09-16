import React, { useState } from 'react';
import { Tabs, Tab, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';

const useStyles = makeStyles((theme) => ({

}));


const Alert = ({ value }) => {
    const classes = useStyles();

    return (
        <>
            <Alert severity={value.severity}>{value.label}</Alert>
        </>
    );
}

export default Alert