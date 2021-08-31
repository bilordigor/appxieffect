import React, { useState } from 'react';
import { makeStyles, Grid, Divider, withStyles } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ClearIcon from '@material-ui/icons/Clear';


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
    divider: {
        width: "100%",
        height: 2,
        margin: theme.spacing(1, 0.5),
        backgroundColor: theme.palette.primary.contrastText,
    },
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

const DividerComponent = ({ values, listeners, index, setComponentsData, deleteItemInPages, setSelectId }) => {
    const classes = useStyles();
    return (
        <>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                onClick={() => setSelectId(index)}
            >
                <Grid className={classes.gridTextWrapper}>
                    <Divider flexItem className={classes.divider} />
                </Grid>
                <Grid className={classes.gridButtons}>
                    {/* <Divider flexItem orientation="vertical" className={classes.divider} /> */}
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
        </>
    );
}

export default DividerComponent