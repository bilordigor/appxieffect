import React from 'react';

import { ButtonGroup, Hidden, Button, Grid, Paper, Typography, makeStyles, withStyles, Divider, useTheme, Tooltip } from '@material-ui/core';
import { inject, observer } from 'mobx-react'

import AssignmentTurnedInIcon from '@material-ui/icons/AssignmentTurnedIn';
import FeedbackIcon from '@material-ui/icons/Feedback';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Image from 'next/image'
// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';

const useStyles = makeStyles((theme) => ({
    ButtonGroup: {
        border: `1px solid ${theme.palette.primary.main}`,
    },
    Button: {
        border: `1px solid ${theme.palette.primary.main}`,
    },
}));

const Toolbar = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <div>
            <Typography> Выберите один или несколько пакетов с жалобами </Typography>
            <Hidden mdDown>
                <ButtonGroup className={classes.ButtonGroup} color="primary" aria-label="text primary button group">
                    <Button color="primary" className={classes.Button}>Отметить отсутствие нарушений</Button>
                    <Button color="primary" className={classes.Button}>Оставить отзыв и отправить на доработку</Button>
                    <Button color="primary" className={classes.Button}>Заблокировать контент</Button>
                </ButtonGroup>
            </Hidden>
            <Hidden lgUp>
                <ButtonGroup className={classes.ButtonGroup} color="primary" aria-label="text primary button group">
                    <Tooltip title="Отметить отсутствие нарушений">
                        <Button color="primary" className={classes.Button}><AssignmentTurnedInIcon /></Button>
                    </Tooltip>
                    <Tooltip title="Оставить отзыв и отправить на доработку">
                        <Button color="primary" className={classes.Button}><FeedbackIcon /></Button>
                    </Tooltip>
                    <Tooltip title="Заблокировать контент">
                        <Button color="primary" className={classes.Button}><DeleteForeverIcon /></Button>
                    </Tooltip>
                </ButtonGroup>
            </Hidden>
        </div>
    )
}));


export default Toolbar;