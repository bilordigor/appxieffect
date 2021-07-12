import React, { useState } from 'react';
import { Tabs, Tab, ButtonGroup, Input, AppBar, Toolbar, Dialog, InputLabel, NativeSelect, FormControl, DialogContent, MobileStepper, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
function Action({ active, className, cursor, ...props }) {
    return (
        <button
            {...props}
            //className={classNames(styles.Action, className)}
            tabIndex={0}
        // style={
        //   {
        //     ...style,
        //     cursor,
        //     '--fill': active?.fill,
        //     '--background': active?.background,
        //   }
        // }
        />
    );
}

function Remove(props) {
    return (
        <Action
            {...props}
            active={{
                fill: 'rgba(255, 70, 70, 0.95)',
                background: 'rgba(255, 70, 70, 0.1)',
            }}
        >
            <DragIndicatorIcon />
        </Action>
    );
}

function Handle(props) {
    return (
        <Action cursor="grab" data-cypress="draggable-handle" {...props}>
            <DragIndicatorIcon />
        </Action>
    );
}

const useStyles = makeStyles((theme) => ({
    rootPaper: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        //boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'blue',
        height: 64,
        //width: "calc(100% - 8px)",
        margin: 4,
        padding: 0,
        backgroundColor: theme.palette.blueGrey["7"]
    },
    rootGrid: {
        // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        color: 'blue',
        height: 64,
        width: "calc(100% - 8px)",
        margin: 4,
        padding: 0,
    },
    icon: {
        cursor: 'grab',
        color: theme.palette.primary.contrastText,
    }
}));

// eslint-disable-next-line react/display-name
export const Items = React.memo(
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
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        className={classes.rootGrid}

                    >
                        <Grid item>
                            <Typography> {value} </Typography>
                        </Grid>
                        <Grid item>
                            {/* {onRemove ? (
                                <Remove onClick={onRemove} />
                            ) : null} */}
                            {handle ? <DragIndicatorIcon className={classes.icon} {...listeners} /> : null}
                        </Grid>
                    </Grid>
                </Paper>
            );
        }
    )
);