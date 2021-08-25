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
    paper: {
        display: 'flex',
        //border: `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
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
        width: "100%",
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

const Header = inject('store')(observer(({ store, values, listeners, index, setComponentsData, deleteItemInPages }) => {

    const handleFontSize = (event, newFormats) => {
        //console.log(index, "fontSize", newFormats)
        setComponentsData(index, "fontSize", newFormats)
    };

    const handleTextAlign = (event, newAlignment) => {
        setComponentsData(index, "textAlign", newAlignment)
    };

    const handleFontStyle = (event, newAlignment) => {
        if (values.fontStyle === "normal") return setComponentsData(index, "fontStyle", "italic")
        return setComponentsData(index, "fontStyle", "normal");
    };

    const handleFontWeight = (event, newAlignment) => {
        if (values.fontWeight === "normal") return setComponentsData(index, "fontWeight", "bold");
        return setComponentsData(index, "fontWeight", "normal");
    };

    const handleTextDecoration = (event, newAlignment) => {
        if (values.textDecoration === "none") return setComponentsData(index, "textDecoration", "underline");
        return setComponentsData(index, "textDecoration", "none");
    };

    // Simulated props for the purpose of the example
    const props = {  fontSize: values.fontSize, textAlign: values.textAlign, fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: 'black', color: 'white' };
    // Pass the props as the first argument of useStyles()
    console.log( "props", props )
    const classes = useStyles(props);

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Grid className={classes.paper}>
                    {/* <Paper elevation={0} > */}
                    <StyledToggleButtonGroup
                        size="small"
                        value={values.fontSize}
                        exclusive
                        onChange={handleFontSize}
                        aria-label="text alignment"
                    >
                        <ToggleButton value={48}>
                            <LooksOneIcon />
                        </ToggleButton>
                        <ToggleButton value={42}>
                            <LooksTwoIcon />
                        </ToggleButton>
                        <ToggleButton value={36}>
                            <Looks3Icon />
                        </ToggleButton>
                        <ToggleButton value={30}>
                            <Looks4Icon />
                        </ToggleButton>
                        <ToggleButton value={24}>
                            <Looks5Icon />
                        </ToggleButton>
                        <ToggleButton value={18}>
                            <Looks6Icon />
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                    <Divider flexItem orientation="vertical" className={classes.divider} />
                    <StyledToggleButtonGroup
                        size="small"
                        value={values.textAlign}
                        exclusive
                        onChange={handleTextAlign}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="left" aria-label="left aligned">
                            <FormatAlignLeftIcon />
                        </ToggleButton>
                        <ToggleButton value="center" aria-label="centered">
                            <FormatAlignCenterIcon />
                        </ToggleButton>
                        <ToggleButton value="right" aria-label="right aligned">
                            <FormatAlignRightIcon />
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                    <Divider flexItem orientation="vertical" className={classes.divider} />
                    <StyledToggleButtonGroup
                        size="small"
                        // value={formats}
                        // onChange={handleFormat}
                        aria-label="text formatting"
                    >
                        <ToggleButton selected={values.fontWeight === "bold" ? true : false} onClick={handleFontWeight} aria-label="bold">
                            <FormatBoldIcon />
                        </ToggleButton>
                        <ToggleButton selected={values.fontStyle === "italic" ? true : false} onClick={handleFontStyle} aria-label="italic">
                            <FormatItalicIcon />
                        </ToggleButton>
                        <ToggleButton selected={values.textDecoration === "underline" ? true : false} onClick={handleTextDecoration} value="underlined" aria-label="underlined">
                            <FormatUnderlinedIcon />
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                    <Divider flexItem orientation="vertical" className={classes.divider} />
                    <StyledToggleButtonGroup
                        size="small"
                        //value={formats}
                        //onChange={handleFormat}
                        aria-label="text formatting"
                    >
                        <ToggleButton onClick={() => deleteItemInPages(index)}>
                            <ClearIcon />
                        </ToggleButton>
                        <ToggleButton>
                            <DragIndicatorIcon {...listeners} />
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                    {/* </Paper> */}
                </Grid>
            </Grid>
            <Divider flexItem className={classes.divider1} />
            <Grid className={classes.gridTextWrapper}>
                {/* {!edit && <Typography className={classes.text} onClick={() => setEdit(true)} >{values.label}</Typography>} */}
                {/* {edit && <ClickAwayListener > */}
                <Input
                    classes={{
                        input: classes.text
                    }}
                    type="text"
                    //className={classes.text}
                    disableUnderline
                    multiline
                    fullWidth
                    value={values.label}
                    onChange={(event) => setComponentsData(index, "label", event.target.value)}
                />
                {/* </ClickAwayListener>} */}
            </Grid>
        </>
    );
}));

// onClickAway={() => setEdit(false)}

export default Header