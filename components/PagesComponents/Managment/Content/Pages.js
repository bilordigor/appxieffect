import React from 'react';

import { CircularProgress, Grid, Typography, makeStyles, useTheme } from '@material-ui/core';

import { inject, observer } from 'mobx-react'

import Image from 'next/image'
import Toolbar from './Pages/Toolbar';
import DataList from './Pages/DataList';
import DialogPageCreation from './Pages/DialogPageCreation';
// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';

const useStyles = makeStyles((theme) => ({
    gridToolbar: {
        marginTop: 16,
    }
}));


const Pages = inject('store')(observer(({ store }) => {
    const classes = useStyles();
    const theme = useTheme();

    const [dialogPageCreation, setDialogPageCreation] = React.useState(false)

    const [selectId, setSelectId] = React.useState(null)

    const [dialogPageCreationData, setDialogPageCreationData] = React.useState({
        id: null,
        name: '',
        description: '',
        theme: '',
        kind: '',
        components: [],
        blueprint: false,
        reusable: false,
        public: false,
    })

    const changeDialogPageCreationData = (name, value) => {
        setDialogPageCreationData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const setComponentsData = (index, name, value) => {
        let newComponents = [
            ...dialogPageCreationData.components
        ]
        newComponents[index][name] = value
        setDialogPageCreationData(prevState => ({
            ...prevState,
            ["components"]: newComponents
        }));
    }

    const pushNewItemToPages = (type) => {
        if (type === "h") {
            setDialogPageCreationData(prevState => ({
                ...prevState,
                components: [...dialogPageCreationData.components, { type: "h", fontSize: 36, textAlign: "center", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "заголовок" }]
            }));
        }
        if (type === "text") {
            setDialogPageCreationData(prevState => ({
                ...prevState,
                components: [...dialogPageCreationData.components, { type: "text", fontSize: 14, textAlign: "left", fontWeight: "normal", fontStyle: "normal", textDecoration: "none", label: "текст" }]
            }));
        }
        if (type === "divider") {
            setDialogPageCreationData(prevState => ({
                ...prevState,
                components: [...dialogPageCreationData.components, { type: "divider", }]
            }));
        }
    }

    const deleteItemInPages = (index) => {
        setDialogPageCreationData(prevState => ({
            ...prevState,
            components: prevState.components.filter((n, id) => {
                if (id == index) return false
                return true
            })
        }));
    }

    const savePage = (close = false) => {
        // Сохранить изменения в странице

        if (dialogPageCreationData.id) {
            console.log("updatePage", dialogPageCreationData)
            store.fetchDataScr(`${store.url}/wip/pages/${dialogPageCreationData.id}`, "PUT", dialogPageCreationData).then(
                (data) => {
                    if (data) {
                        console.log("done", data)

                    } else {
                        console.log("fail", data)
                    }

                })
        }
        // Создать новую страницу 
        if (!dialogPageCreationData.id) {
            console.log("savePage", dialogPageCreationData)
            store.fetchDataScr(`${store.url}/wip/pages/`, "POST", dialogPageCreationData).then(
                (data) => {
                    if (data.id) {
                        console.log("done")
                        console.log("id", data.id)
                        changeDialogPageCreationData("id", data.id)
                    } else {
                        console.log("fail")
                    }

                })
        }
        if (close) {
            dialogPageCreation(false)
            setDialogPageCreationData(
                {
                    id: null,
                    name: '',
                    description: '',
                    theme: '',
                    kind: '',
                    components: [],
                    blueprint: false,
                    reusable: false,
                    public: false,
                }
            )
        }
    }



    return (
        <Grid
            container
            direction="column"
            justify="center"
            alignItems="flex-start"
        >
            <Grid>
                <Typography variant="h5"> Управление контентом  </Typography>
            </Grid>
            <Grid className={classes.gridToolbar}>
                <Toolbar setDialogPageCreation={setDialogPageCreation} />
            </Grid>
            <DialogPageCreation selectId={selectId} setSelectId={setSelectId} savePage={savePage} deleteItemInPages={deleteItemInPages} setComponentsData={setComponentsData} pushNewItemToPages={pushNewItemToPages} dialogPageCreationData={dialogPageCreationData} changeDialogPageCreationData={changeDialogPageCreationData} dialogPageCreation={dialogPageCreation} setDialogPageCreation={setDialogPageCreation} />
            <DataList />
        </Grid>
    )
}));


export default Pages;