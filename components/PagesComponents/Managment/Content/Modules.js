import React from 'react';

import { CircularProgress, Grid, Typography, makeStyles, useTheme } from '@material-ui/core';

import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import Toolbar from './Modules/Toolbar';
import DataList from './Modules/DataList';
// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';
import DialogModuleCreation from './Modules/DialogModuleCreation';

const useStyles = makeStyles((theme) => ({
    gridToolbar: {
        marginTop: 16,
    }
}));


const Modules = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [dialogModuleCreation, setDialogModuleCreation] = React.useState(false)

    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
        >
            <Grid>
                <Typography variant="h5"> Управление контентом </Typography>
            </Grid>
            <Grid className={classes.gridToolbar}>
                <Toolbar setDialogModuleCreation={setDialogModuleCreation} />
            </Grid>
            <DialogModuleCreation dialogModuleCreation={dialogModuleCreation} setDialogModuleCreation={setDialogModuleCreation} />
            <DataList />
        </Grid>
    )
}));


export default Modules;