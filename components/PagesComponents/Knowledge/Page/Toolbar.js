import React from 'react';

import { Tooltip, Divider, Grid, Typography, Skeleton, useTheme, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { inject, observer } from 'mobx-react'

import { useRouter } from 'next/router'

import UndoIcon from '@material-ui/icons/Undo';
import InfoIcon from '@material-ui/icons/Info';

const useStyles = makeStyles((theme) => ({
    wrapperRoot: {
        marginTop: 8,
        marginLeft: 8,
        maxWidth: 800,
    },
    IconButton: {
        color: theme.palette.primary.contrastText,
    },
    mainLabel: {
        color: theme.palette.primary.contrastText,
        fontWeight: "bolder",
    },
    divider: {
        backgroundColor: theme.palette.primary.contrastText,
        width: "100%",
        height: 1,
        maxWidth: 800,
    }
}));


const Toolbar = inject('knowledgeStore')(observer(({ knowledgeStore }) => {
    const classes = useStyles();
    const theme = useTheme();
    const router = useRouter()

    return (
        <>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="center"
                wrap="nowrap"
                className={classes.wrapperRoot}
            >
                <Grid item xs zeroMinWidth>
                    {
                        knowledgeStore.page.loading ? <Skeleton animation="wave" variant="text" /> :
                            <Typography variant="h5" className={classes.mainLabel} noWrap>{knowledgeStore.page.name}</Typography>
                    }
                </Grid>
                <Tooltip title="Информация о странице">
                    <IconButton onClick={null} className={classes.IconButton}>
                        <InfoIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Назад">
                    <IconButton onClick={() => router.back()} className={classes.IconButton}>
                        <UndoIcon />
                    </IconButton>
                </Tooltip>
            </Grid>
            <Divider className={classes.divider} />
        </>
    )
}));


export default Toolbar;