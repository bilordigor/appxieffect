/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { inject, observer } from 'mobx-react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
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
        height: "100vh",
        width: "100vw",
        backgroundColor: theme.palette.blueGrey["1"],
    }

}));

const NavigationAll = inject('store')(observer(({ store, children }) => {
    const classes = useStyles();
    const theme = useTheme();
    const [openHelpMenu, setOpenHelpMenu] = React.useState(false);

    const router = useRouter()

    React.useEffect(() => {
        store.getDataScr(`${store.url}/settings/main/`)
            .then((data) => {
                console.log(data)
                if (data.a != undefined) {
                    if (data.a == "unauthorized: Missing cookie \"access_token_cookie\"" || data.a == "invalid token: Signature verification failed") {
                        router.push("/login")
                    }
                } else {
                    store.getDataScr(`${store.url}/avatar/`)
                        .then((data) => {
                            console.log("avatar", data)
                            if (data != undefined && data.message != "The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.") {
                                store.setSettings("avatar", data)
                            }
                        });
                    store.getDataScr(`${store.url}/settings/`)
                        .then((data) => {
                            console.log(data)
                            if (data != undefined) {
                                let emailArr = data.email.split("@", 2)
                                store.setSettings("username", data.username)
                                store.setSettings("emailBefore", emailArr[0])
                                store.setSettings("emailAfter", "@" + emailArr[1])
                                store.setSettings("darkTheme", data["dark-theme"])
                                store.setSettings("emailConfirmed", data["email-confirmed"])
                            } else {
                                console.log("Проблемы с сервером")
                            }
                        });
                    store.setLoading("/")

                }
            })
    }, [])

    return (
        <>
            {store.loading["/"] && <Loading />}
            {!store.loading["/"] && <div className={classes.root}>
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