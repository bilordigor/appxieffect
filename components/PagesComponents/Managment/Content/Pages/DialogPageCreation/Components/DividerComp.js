import React, { useState } from 'react';
import { makeStyles, Grid, Divider, withStyles } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
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

const DividerComp = inject('managmentStore')(observer(({ managmentStore, index }) => {
    // Simulated props for the purpose of the example
    const classes = useStyles();
    return (
        <>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                onClick={() => managmentStore.setPageCreationList("selectId", index)}
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
                        <ToggleButton value="clear" onClick={() => managmentStore.deleteComponent(index)}>
                            <ClearIcon />
                        </ToggleButton>
                        <ToggleButton value="drag">
                            <DragIndicatorIcon />
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                    {/* </Paper> */}
                </Grid>
            </Grid>
        </>
    );
}));

export default DividerComp