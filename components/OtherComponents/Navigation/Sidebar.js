/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx';
import { inject, observer } from 'mobx-react'
import { useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { Grid, Drawer, Collapse, List, Tooltip, Button, ListItem, ListItemIcon, ListItemText, Typography, Divider, IconButton } from '@material-ui/core';

import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import SettingsIcon from '@material-ui/icons/Settings';
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
import SubjectIcon from '@material-ui/icons/Subject';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SettingsEthernetIcon from '@material-ui/icons/SettingsEthernet';

const useStyles = makeStyles((theme) => ({
    drawer: {
        zIndex: 1,
        width: 72,
        flexShrink: 0,
    },
    drawerGrid: {
        //width: 76,
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
    smallIcon: {
        fontSize: "32px !important",
        height: 32,
        width: 32,
        color: theme.palette.primary.contrastText,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
    },
    divider: {
        marginTop: 12,
        backgroundColor: theme.palette.background.default,
        width: 56,
    },
    dividerVert: {
        marginTop: 0,
        backgroundColor: theme.palette.background.default,
        height: 12,
        width: 4,
    },
    dividerButton: {
        cursor: "pointer",
        height: 8,
        width: 38,
        borderRadius: 4,
        marginTop: 2,
        padding: 0,
        backgroundColor: theme.palette.primary.dark,
        transition: '0.4s',
        '&:hover': {
            transition: '0.4s',
            backgroundColor: theme.palette.primary.light,
        },
    },
    smallListItem: {
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        marginTop: 0,
        height: 42,
        width: 42,
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
}));


const FadeMenuManagment = (props) => {
    const classes = useStyles();

    const router = useRouter()

    return (
        <Grid
            container
            direction="column"
            justify="flex-start"
            alignItems="center"
            {...props}>
            <Divider orientation="vertical" className={classes.dividerVert} />
            <Tooltip title="Управление контентом" placement="right" arrow>
                <ListItem onClick={() => router.push('/managment/content')} className={clsx(classes.smallListItem, { [classes.listItemActive]: router.pathname === '/managment/content' })}>
                    <SubjectIcon fontSize="large" className={classes.smallIcon} />
                </ListItem>
            </Tooltip>
            <Divider orientation="vertical" className={classes.dividerVert} />
            <Tooltip title="Модерация контента" placement="right" arrow>
                <ListItem onClick={() => router.push('/managment/moderation')} className={clsx(classes.smallListItem, { [classes.listItemActive]: router.pathname === '/managment/moderation' })}>
                    <SettingsEthernetIcon fontSize="large" className={classes.smallIcon} />
                </ListItem>
            </Tooltip>
            <Divider orientation="vertical" className={classes.dividerVert} />
            <Tooltip title="Создать учебное заведение" placement="right" arrow>
                <ListItem className={classes.smallListItem} onClick={null}>
                    <AddBoxIcon fontSize="large" className={classes.smallIcon} />
                </ListItem>
            </Tooltip>
        </Grid>
    );
}

const Sidebar = inject('store')(observer(({ store, openSideMenu, setOpenSideMenu }) => {
    const classes = useStyles();
    const theme = useTheme();

    const router = useRouter()

    const [openManagment, setOpenManagment] = React.useState(false)

    // const handleChange = () => {
    //     if (router.pathname.includes('/managment/') && openManagment) router.push('/managment/')
    //     setOpenManagment((prev) => !prev);
    //     //console.log("openManagment", openManagment)
    // };

    // React.useEffect(() => {
    // })

    const HomeIconClicked = () => {
        router.push('/')
        setOpenManagment(false)
    }

    const MenuBookIconClicked = () => {
        router.push('/knowledge')
        setOpenManagment(false)
    }

    const AddToQueueIconClicked = () => {
        router.push('/managment')
        setOpenManagment(true)
    }

    const SettingsIconClicked = () => {
        router.push('/settings')
        setOpenManagment(false)
    }

    React.useEffect(() => {
        if (router.pathname.includes('/managment')) setOpenManagment(true)
    })

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
                className={classes.drawerGrid}
                container
                direction="column"
                justify="flex-start"
                alignItems="center"
            >
                {/* <List>
                    {menuList.map((item, index) =>
                        <Grid key={item.id}>
                            <Tooltip title={item.label} placement="right" arrow>
                                <ListItem onClick={() => router.push(item.href)} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname === item.href })}>
                                    <ListItemIcon className={classes.listItemIcon}>
                                        {item.icon}
                                    </ListItemIcon>
                                </ListItem>
                            </Tooltip>
                        </Grid>
                    )}
                </List> */}
                <List>
                    <Grid
                        className={classes.drawerGrid}
                        container
                        direction="column"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Tooltip title="Главная" placement="right" arrow>
                            <ListItem onClick={HomeIconClicked} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname === '/' })}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <HomeIcon fontSize="large" className={classes.icon} />
                                </ListItemIcon>
                            </ListItem>
                        </Tooltip>
                        <Tooltip title="Знания" placement="right" arrow>
                            <ListItem onClick={MenuBookIconClicked} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname.includes('/knowledge') })}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <MenuBookIcon fontSize="large" className={classes.icon} />
                                </ListItemIcon>
                            </ListItem>
                        </Tooltip>
                        <Tooltip title="Управление" placement="right" arrow>
                            <ListItem onClick={AddToQueueIconClicked} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname === '/managment' })}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <AddToQueueIcon fontSize="large" className={classes.icon} />
                                </ListItemIcon>
                            </ListItem>
                        </Tooltip>
                        {openManagment && <Collapse in={openManagment}>
                            <FadeMenuManagment />
                        </Collapse>}
                        {/* <Divider orientation="vertical" className={classes.dividerVert}/> */}
                        <Divider className={classes.divider} />
                        <Tooltip title="Настройки" placement="right" arrow>
                            <ListItem onClick={SettingsIconClicked} className={clsx(classes.listItem, { [classes.listItemActive]: router.pathname === '/settings' })}>
                                <ListItemIcon className={classes.listItemIcon}>
                                    <SettingsIcon fontSize="large" className={classes.icon} />
                                </ListItemIcon>
                            </ListItem>
                        </Tooltip>
                    </Grid>
                </List>
            </Grid>

        </Drawer >
    );
}));

export default Sidebar