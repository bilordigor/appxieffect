import React from 'react';

import { ButtonGroup, Button, makeStyles, withStyles, Divider, useTheme, Tooltip } from '@material-ui/core';
import { inject, observer } from 'mobx-react'

import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import Image from 'next/image'
// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';

const useStyles = makeStyles((theme) => ({

}));

const Toolbar = inject('store')(observer(({ setDialogPageCreation, store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [alignment, setAlignment] = React.useState('left');


    return (
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Tooltip title="Создать страницу">
                <Button onClick={() => setDialogPageCreation(true)}> Создать </Button>
            </Tooltip>
            {/* <Button>Two</Button>
            <Button>Three</Button> */}
        </ButtonGroup>
    )
}));


export default Toolbar;