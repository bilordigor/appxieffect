import React from 'react';

import { ButtonGroup, Button, makeStyles, withStyles, Divider, useTheme, Tooltip } from '@material-ui/core';
import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((theme) => ({

}));

const Toolbar = inject('rootStore', 'managmentStore')(observer(({ rootStore, managmentStore }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
            <Tooltip title="Создать страницу">
                <Button onClick={() => managmentStore.setPageCreationList("dialogOpen", true)}> Создать </Button>
            </Tooltip>
        </ButtonGroup>
    )
}));


export default Toolbar;