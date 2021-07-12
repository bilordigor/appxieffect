import React from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx';
import { inject, observer } from 'mobx-react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Grid, Drawer, List, Tooltip, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';

const useStyles = makeStyles((theme) => ({
    drawer: {
        zIndex: 1,
        width: 72,
        flexShrink: 0,
    },
    drawerPaper: {
        width: 72,
        backgroundColor: theme.palette.blueGrey["0"]
    },
    // necessary for content to be below app bar
    listItem: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: 12,
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

const Sidebar = inject('store')(observer(({ store, openSideMenu, setOpenSideMenu }) => {
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

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}
            anchor="left"
        >
            <Grid
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
            >
                <List>
                    {menuList.map((item, index) =>
                        <Grid key={item.id}>
                            <Tooltip title={item.label} placement="right" arrow>
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
                </List>
            </Grid>

        </Drawer>
    );
}));

export default Sidebar