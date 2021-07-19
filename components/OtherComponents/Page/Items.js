import React, { useState } from 'react';
import { Tabs, Tab, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import Header from './Modules/Header';
import Text from './Modules/Text';



const useStyles = makeStyles((theme) => ({
    rootPaper: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        //width: "calc(100% - 8px)",
        margin: 4,
        padding: 0,
        backgroundColor: theme.palette.blueGrey["7"],
        position: "relative",
    },
    rootGrid: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        width: "calc(100% - 8px)",
        margin: 4,
        padding: 8,
    },
    icon: {
        position: "absolute",
        top: 2,
        right: 0,
        cursor: 'grab',
        color: theme.palette.primary.contrastText,
    }
}));


const ModuleSelect = (value, listeners, index) => {
    if (value.type === "h") return (
        <>
            <Header listeners={listeners} values={value} index={index} />
        </>
    )
    if (value.type === "text") return (
        <>
            <Text listeners={listeners} values={value} index={index} />
        </>
    )
}

const Items = React.memo(
    React.forwardRef(
        (
            {
                color,
                dragOverlay,
                dragging,
                disabled,
                fadeIn,
                handle,
                height,
                index,
                listeners,
                onRemove,
                sorting,
                // style,
                transition,
                transform,
                value,
                wrapperStyle,
                ...props
            },
            ref
        ) => {
            React.useEffect(() => {
                if (!dragOverlay) {
                    return;
                }

                document.body.style.cursor = 'grabbing';

                return () => {
                    document.body.style.cursor = '';
                };
            }, [dragOverlay]);

            console.log("Items render")

            const classes = useStyles();

            return (
                <Paper
                    elevation={3}
                    ref={ref}
                    className={classes.rootPaper}
                    data-cypress="draggable-item"
                    {...(!handle ? listeners : undefined)}
                    {...props}
                    tabIndex={!handle ? 0 : undefined}
                >
                    <Grid
                        container
                        className={classes.rootGrid}
                    >
                        {ModuleSelect(value, listeners, index)}
                    </Grid>
                </Paper>
            );
        }
    ))


Items.displayName = 'Items';
export default Items
