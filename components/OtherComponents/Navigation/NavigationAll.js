/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { inject, observer } from 'mobx-react'
import { useTheme } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { Drawer, Hidden } from '@material-ui/core'

import Sidebar from './Sidebar'
import Helpbar from './Helpbar'
import Loading from '../Loading/Loading'
import SideDownbar from './SideDownbar'

const useStyles = makeStyles((theme) => ({
    root: {
        zIndex: 0,
        display: 'flex',
        backgroundColor: theme.palette.blueGrey["1"],
        minHeight: "100vh",
    },
    content: {
        zIndex: 0,
        margin: 0,
        //height: "100vh",
        width: "100%",
        backgroundColor: theme.palette.blueGrey["1"],
    }

}));

const NavigationAll = inject('rootStore', 'settingsStore', 'uiStore')(observer(({ rootStore, settingsStore, uiStore, children }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [openHelpMenu, setOpenHelpMenu] = React.useState(false);

    const router = useRouter()

    React.useEffect(() => {
        rootStore.fetchDataScr(`${rootStore.url}/settings/main/`, "GET")
            .then((data) => {
                console.log(data)
                if (data.a != undefined) {
                    if (data.a == "unauthorized: Missing cookie \"access_token_cookie\"" || data.a == "invalid token: Signature verification failed") {
                        router.push("/login")
                    }
                } else {
                    rootStore.fetchDataScr(`${rootStore.url}/avatar/`, "GET")
                        .then((data) => {
                            //console.log("avatar", data)
                            if (data != undefined && data.message != "The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.") {
                                settingsStore.setSettings("avatar", data)
                            }
                        });
                    rootStore.fetchDataScr(`${rootStore.url}/settings/`, "GET")
                        .then((data) => {
                            console.log(data)
                            if (data != undefined) {
                                let emailArr = data.email.split("@", 2)
                                settingsStore.setSettings("username", data.username)
                                settingsStore.setSettings("emailBefore", emailArr[0])
                                settingsStore.setSettings("emailAfter", "@" + emailArr[1])
                                settingsStore.setSettings("darkTheme", data["dark-theme"])
                                settingsStore.setSettings("emailConfirmed", data["email-confirmed"])
                            } else {
                                console.log("Проблемы с сервером")
                            }
                        });
                    uiStore.setLoading("/")

                }
            })
    }, [])

    return (
        <>
            {uiStore.loading["/"] && <Loading />}
            {!uiStore.loading["/"] && <div className={classes.root}>
                <Hidden only="xs">
                    <Sidebar />
                </Hidden>
                <Hidden smUp>
                    <SideDownbar />
                </Hidden>
                {/* <Helpbar openHelpMenu={openHelpMenu} setOpenHelpMenu={setOpenHelpMenu} /> */}
                <main
                    className={classes.content}
                >
                    {children}
                </main>
            </div>}
        </>
    );
}))

export default NavigationAll