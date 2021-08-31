import React, { useState } from 'react';
import { Tabs, Tab, withStyles, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip, InputBase } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import FormatAlignLeftIcon from '@material-ui/icons/FormatAlignLeft';
import FormatAlignCenterIcon from '@material-ui/icons/FormatAlignCenter';
import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight';
import FormatAlignJustifyIcon from '@material-ui/icons/FormatAlignJustify';
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import LooksOneIcon from '@material-ui/icons/LooksOne';
import LooksTwoIcon from '@material-ui/icons/LooksTwo';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import Looks5Icon from '@material-ui/icons/Looks5';
import Looks6Icon from '@material-ui/icons/Looks6';
import ClearIcon from '@material-ui/icons/Clear';
import { inject, observer } from 'mobx-react'


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

const Header = inject('store')(observer(({ store, values, listeners, index, setComponentsData, deleteItemInPages, setSelectId }) => {


    // Simulated props for the purpose of the example
    const props = { fontSize: values.fontSize, textAlign: values.textAlign, fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: 'black', color: 'white' };
    // Pass the props as the first argument of useStyles()
    console.log("props", props)
    const classes = useStyles(props);

    return (
        <>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                onClick={() => setSelectId(index)}
            > 
                <Grid className={classes.gridTextWrapper}>
                    <Input
                        classes={{
                            input: classes.text
                        }}
                        type="text"
                        disableUnderline
                        multiline
                        fullWidth
                        value={values.label}
                        onChange={(event) => setComponentsData(index, "label", event.target.value)}
                    />
                </Grid>
                <Grid className={classes.gridButtons}>
                    <StyledToggleButtonGroup
                        size="small"
                        aria-label="text formatting"
                    >
                        <ToggleButton onClick={() => deleteItemInPages(index)}>
                            <ClearIcon />
                        </ToggleButton>
                        <ToggleButton>
                            <DragIndicatorIcon {...listeners} />
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                </Grid>
            </Grid>
        </>

    );
}));

// onClickAway={() => setEdit(false)}

export default Header

