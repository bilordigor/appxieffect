import React from 'react';

import { ButtonGroup, Button, Divider, useTheme, Tooltip } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { inject, observer } from 'mobx-react'

import ToggleButton from '@material-ui/core/ToggleButton';
import ToggleButtonGroup from '@material-ui/core/ToggleButtonGroup';

import Image from 'next/image'
// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';

const useStyles = makeStyles((theme) => ({

}));

const Toolbar = inject('store')(observer(({ setDialogModuleCreation, store }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Tooltip title="Создать модуль">
                <Button onClick={() => setDialogModuleCreation(true)}> Создать </Button>
            </Tooltip>
            {/* <Button>Two</Button>
            <Button>Three</Button> */}
        </ButtonGroup>
    )
}));


export default Toolbar;