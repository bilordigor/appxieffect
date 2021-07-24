import React from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx';
import { inject, observer } from 'mobx-react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Drawer, List, Tooltip, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton, AppBar, Toolbar } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';

import { useSwipeable } from 'react-swipeable';

const useStyles = makeStyles((theme) => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        zIndex: 1,
        height: 72,
        flexShrink: 0,
        backgroundColor: theme.palette.blueGrey["0"],
    },
    drawerPaper: {
        height: 72,
    },
    // necessary for content to be below app bar
    listItem: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        marginLeft: 12,
        height: 56,
        width: 56,
        backgroundColor: theme.palette.blueGrey["2"],
        cursor: "pointer",
        transition: '0.4s',
        borderRadius: 18,
        '&:hover': {
            borderRadius: 8,
        },
    },
    listItemActive: {
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.main,
        },
        borderRadius: 8,
    },
    listItemIcon: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        color: theme.palette.primary.contrastText,
    },
    icon: {
        fontSize: "38px !important",
        height: 38,
        width: 38,
        color: theme.palette.primary.contrastText,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
}));

const SideDownbar = inject('store')(observer(({ store, openSideMenu, setOpenSideMenu }) => {
    const classes = useStyles();
    const theme = useTheme();

    const router = useRouter()

    const [menuList, setMenuList] = React.useState([
        {
            id: 0,
            icon: <HomeIcon fontSize="large" className={classes.icon} />,
            label: "Главная",
            href: '/',
        },
        {
            id: 1,
            icon: <MenuBookIcon fontSize="large" className={classes.icon} />,
            label: "Знания",
            href: '/knowledge',
        },
        {
            id: 2,
            icon: <SettingsIcon fontSize="large" className={classes.icon} />,
            label: "Настройки",
            href: '/settings',
        }
    ])

    const config = {
        delta: 8,
    }

    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            if (router.pathname === "/") router.push("/knowledge")
            if (router.pathname === "/knowledge") router.push("/settings")
            // console.log("User Swiped!", eventData)
        },
        onSwipedRight: (eventData) => {
            if (router.pathname === "/knowledge") router.push("/")
            if (router.pathname === "/settings") router.push("/knowledge")
            // console.log("User Swiped!", eventData)
        },
        ...config,
    });

    return (
        <>
            <AppBar
                {...handlers}
                position="fixed"
                // classes={{
                //     //paper: classes.drawerPaper,
                // }}
                className={classes.appBar}>

                <List>
                    <Grid
                        container
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        {menuList.map((item, index) =>
                            <Grid key={item.id}>
                                <Tooltip title={item.label} placement="top" arrow>
                                    {/* <Link href={item.href} passHref> */}
                                    <ListItem onClick={() => router.push(item.href)} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname === item.href })}>
                                        <ListItemIcon className={classes.listItemIcon}>
                                            {item.icon}
                                        </ListItemIcon>
                                    </ListItem>
                                    {/* </Link> */}
                                </Tooltip>
                            </Grid>
                        )}
                    </Grid>
                </List>

            </AppBar>
        </>
    );
}));

export default SideDownbar