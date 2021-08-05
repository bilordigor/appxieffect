import React from 'react';

import { CircularProgress, Grid, Paper, Typography, makeStyles, withStyles, Divider, useTheme } from '@material-ui/core';
import { inject, observer } from 'mobx-react'

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import Image from 'next/image'
// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        border: `1px solid ${theme.palette.divider}`,
        flexWrap: 'wrap',
    },
    divider: {
        margin: theme.spacing(1, 0.5),
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

const Toolbar = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [alignment, setAlignment] = React.useState('left');
    const [formats, setFormats] = React.useState(() => ['italic']);

    const handleFormat = (event, newFormats) => {
        setFormats(newFormats);
    };

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    return (
        <div>
            <Paper elevation={0} className={classes.paper}>
                <StyledToggleButtonGroup
                    size="small"
                    value={alignment}
                    exclusive
                    onChange={handleAlignment}
                    aria-label="text alignment"
                >
                    <ToggleButton value="left" aria-label="left aligned">

                    </ToggleButton>
                    <ToggleButton value="center" aria-label="centered">

                    </ToggleButton>
                    <ToggleButton value="right" aria-label="right aligned">

                    </ToggleButton>
                    <ToggleButton value="justify" aria-label="justified" disabled>

                    </ToggleButton>
                </StyledToggleButtonGroup>
                <Divider flexItem orientation="vertical" className={classes.divider} />
                <StyledToggleButtonGroup
                    size="small"
                    value={formats}
                    onChange={handleFormat}
                    aria-label="text formatting"
                >
                    <ToggleButton value="bold" aria-label="bold">
                        
                    </ToggleButton>
                    <ToggleButton value="italic" aria-label="italic">
                        
                    </ToggleButton>
                    <ToggleButton value="underlined" aria-label="underlined">
                        
                    </ToggleButton>
                </StyledToggleButtonGroup>
            </Paper>
        </div>
    )
}));


export default Toolbar;