import React, { useState } from 'react';
import { Tabs, Tab, InputAdornment, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, useTheme, Tooltip, InputBase } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/styles';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';
import ClearIcon from '@material-ui/icons/Clear';
import { inject, observer } from 'mobx-react'
import Alert from '@material-ui/lab/Alert';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';

const useStyles = makeStyles((theme) => ({
    gridButtons: {
        marginLeft: "auto",
    },
    divider: {
        margin: theme.spacing(1, 0.5),
    },
    divider1: {
        width: "100%",
        height: 1,
        margin: theme.spacing(1, 0.5),
    },
    gridTextWrapper: {
        //textAlign: "center !important",
        width: "calc(100% - 100px)",
    },
    text: {
        width: "100%",
        color: theme.palette.primary.contrastText,
        fontSize: props => props.fontSize,
        fontStyle: props => props.fontStyle,
        textAlign: props => props.textAlign,
        fontWeight: props => props.fontWeight,
        textDecoration: props => props.textDecoration,
        lineHeight: "normal",
    },
    Alert: {
        width: "100%",
    },
    AlertMessage: {
        width: "100%",
    },
    icon: {
        color: theme.palette.primary.contrastText,
    }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
        margin: theme.spacing(0.5),
        border: 'none',
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}))(ToggleButtonGroup);

const AlertComp = inject('managmentStore')(observer(({ managmentStore, index }) => {
    // Simulated props for the purpose of the example
    const values = managmentStore.pageCreation.components[index]
    const props = { fontSize: values.fontSize, textAlign: values.textAlign, fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: 'black', color: 'white' };
    // Pass the props as the first argument of useStyles()
    //console.log("props", props)
    const classes = useStyles(props);
    return (
        <>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                onClick={() => managmentStore.setPageCreationList("selectId", index)}
            >

                <Grid className={classes.gridTextWrapper}>
                    <Alert
                        variant="filled"
                        className={classes.Alert}
                        severity={values.alertType}
                        classes={{
                            message: classes.AlertMessage
                        }}
                        icon={<span></span>}
                    >
                        <Input
                            classes={{
                                input: classes.text
                            }}
                            type="text"
                            disableUnderline
                            multiline
                            fullWidth
                            value={values.label}
                            onChange={(event) => managmentStore.setPageCreationComponents(index, "label", event.target.value)}
                            startAdornment={
                                <InputAdornment position="start">
                                    {values.alertType === "success" && <CheckCircleIcon className={classes.icon} />}
                                    {values.alertType === "info" && <InfoIcon className={classes.icon} />}
                                    {values.alertType === "warning" && <WarningIcon className={classes.icon} />}
                                    {values.alertType === "error" && <ErrorIcon className={classes.icon} />}
                                </InputAdornment>
                            }
                        />
                    </Alert>
                </Grid>
                <Grid className={classes.gridButtons}>
                    <StyledToggleButtonGroup
                        size="small"
                        aria-label="text formatting"
                    >
                        <ToggleButton value="clear" onClick={() => managmentStore.deleteComponent(index)}>
                            <ClearIcon />
                        </ToggleButton>
                        <ToggleButton value="drag">
                            <DragIndicatorIcon />
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                </Grid>
            </Grid>
        </>
    );
}));


export default AlertComp