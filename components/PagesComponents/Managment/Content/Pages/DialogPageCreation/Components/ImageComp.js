/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import ClearIcon from '@material-ui/icons/Clear';
import { inject, observer } from 'mobx-react'
import Image from 'next/image'
import { Dialog, DialogContent, Input, Slider, withStyles, DialogActions, DialogContentText, DialogTitle, Popper, MenuList, Paper, Grow, ClickAwayListener, Divider, IconButton, Skeleton, CardMedia, Avatar, CardContent, CardHeader, Menu, MenuItem, Button, Card, CardActions, Grid, Box, Typography, makeStyles, useTheme, Tooltip } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import AvatarEditor from 'react-avatar-editor'
import { useFileUpload } from "use-file-upload"

const useStylesDialogImgSelect = makeStyles((theme) => ({
    button: {
        marginLeft: 4,
        marginRight: 4,
        color: theme.palette.primary.contrastText,
    },
    mobileStepper: {
        width: "100%",
        backgroundColor: theme.palette.blueGrey["5"],
    },
    icon: {
        color: theme.palette.primary.contrastText,
    },
    mainLabel: {
        fontSize: 20,
        marginLeft: 8,
    },
    listMainLabel: {
        cursor: 'default',
    },
    gridListItem: {
        paddingTop: 12,
        paddingLeft: 0,
        paddingRight: 0,
        paddingBottom: 4,
        // borderRadius: 8,
        // border: `${theme.main.palette.content.border} solid 2px`,
        // '&:hover': {
        //     border: `${theme.main.palette.content.border} solid 2px`,
        // },
    },
    divider: {
        marginTop: '-4px',
        color: theme.palette.primary.dark,
        width: '100%',
        height: '2px',
    },
    EditIcon: {
        color: theme.palette.primary.contrastText,
    },
    DeleteForeverIcon: {
        color: theme.palette.primary.contrastText,

    },
    loadMoreButton: {
        borderRadius: '16px'
    },
    dialogTitle: {
        padding: 8,
        backgroundColor: theme.palette.blueGrey["6"],
        color: theme.palette.primary.contrastText,
    },
    dialogContent: {
        backgroundColor: theme.palette.blueGrey["6"],
    },
    dialogContentText: {
        color: theme.palette.primary.contrastText,
    },
    dialogActions: {
        backgroundColor: theme.palette.blueGrey["6"],
    },
    gridDialogAv: {
        height: '100%',
        padding: 16,
        //width: "550px",
    },
    uploadButton: {
        marginTop: 8,
    },
    Button: {
        color: theme.palette.primary.contrastText,
    }
}));

const DialogImgSelect = inject('managmentStore')(observer(({ managmentStore, saveNewAvatar, files, selectFiles, setEditorRef, uploadImg, openDialog, setOpenDialog }) => {
    // Simulated props for the purpose of the example
    const classes = useStylesDialogImgSelect();
    const theme = useTheme();

    const [value, setValue] = React.useState(10);

    const handleChangeValue = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Dialog
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            scroll='paper'
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
        >
            {/* <DialogTitle className={classes.dialogTitle} id="scroll-dialog-title"> */}
            <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.dialogTitle}
            >
                <Grid>
                    <Typography className={classes.mainLabel}> Загрузка Изображения </Typography>
                </Grid>
                <Grid>
                    <Tooltip title="Закрыть">
                        <IconButton onClick={() => setOpenDialog(false)}>
                            <CloseIcon className={classes.icon} />
                        </IconButton>
                    </Tooltip>
                </Grid>

            </Grid>
            {/* </DialogTitle> */}
            <DialogContent className={classes.dialogContent} dividers={true}>
                <Grid
                    container
                    direction="column"
                    justify="flex-start"
                    alignItems="center"
                    className={classes.gridDialogAv}
                >

                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <AvatarEditor
                            onMouseUp={saveNewAvatar}
                            ref={setEditorRef}
                            image={files?.source == undefined ? "/illustrations/defaultModuleImg.png" : files.source}
                            width={320}
                            height={180}
                            border={25}
                            borderRadius={0}
                            color={[114, 137, 218, 0.6]} // RGBA
                            scale={value / 10}
                            rotate={0}
                        />
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justify="center"
                        alignItems="center"
                    >
                        <Button
                            onClick={() => {
                                selectFiles({ accept: "image/*" }, ({ name, size, source, file }) => {
                                    console.log("Files Selected", { name, size, source, file });
                                })
                                saveNewAvatar()
                            }
                            }
                            className={classes.uploadButton}
                            variant="contained"
                            color="primary"
                        >
                            Загрузить изображение
                        </Button>
                        <Typography className={classes.changeLabel}> Изменить масштаб изображения </Typography>

                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="flex-start"
                        alignItems="center"
                    >
                        <Slider
                            className={classes.slider}
                            value={value}
                            min={10}
                            max={30}
                            onChange={handleChangeValue}
                            onChangeCommitted={saveNewAvatar}
                            aria-labelledby="continuous-slider"
                        />
                    </Grid>
                </Grid>
                {
                    // store.hiddenCourses.length != 0 && !store.allHiddenCoursesLoad && <Grid
                    //     container
                    //     direction="row"
                    //     justify="center"
                    //     alignItems="center"
                    // >
                    //     <Button variant="contained" onClick={() => loadMore()} className={classes.loadMoreButton}> Загрузить ещё </Button>
                    // </Grid>

                }
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button onClick={uploadImg} className={classes.Button}>
                    Сохранить
                </Button>
            </DialogActions>
        </Dialog>
    )
}));


const useStyles = makeStyles((theme) => ({
    gridButtons: {
        marginLeft: "auto",
    },
    divider: {
        margin: theme.spacing(1, 0.5),
    },
    divider1: {
        width: "100%",
        height: 1,
        margin: theme.spacing(1, 0.5),
    },
    gridTextWrapper: {
        //textAlign: "center !important",
        width: "calc(100% - 100px)",
        //maxHeight: 320,
    },
    imgWrapper: {
        display: "block",
        position: "relative",
        width: "100%",
        height: "100%",
        maxWidth: 960,
        //paddingBottom: "56.2%",
    }
}));

const StyledToggleButtonGroup = withStyles((theme) => ({
    grouped: {
        margin: theme.spacing(0.5),
        border: 'none',
        '&:not(:first-child)': {
            borderRadius: theme.shape.borderRadius,
        },
        '&:first-child': {
            borderRadius: theme.shape.borderRadius,
        },
    },
}))(ToggleButtonGroup);

const ImageComp = inject('rootStore', 'knowledgeStore', 'contentStore', 'managmentStore')(observer(({ rootStore, knowledgeStore, contentStore, managmentStore, index }) => {
    const values = managmentStore.pageCreation.components[index]
    // Simulated props for the purpose of the example
    //const props = { fontSize: values.fontSize, textAlign: values.textAlign, fontStyle: values.fontStyle, fontWeight: values.fontWeight, textDecoration: values.textDecoration, backgroundColor: 'black', color: 'white' };
    // Pass the props as the first argument of useStyles()
    //console.log("props", props)
    const classes = useStyles();

    const [openDialog, setOpenDialog] = React.useState(false)

    React.useEffect(() => {
        if (values.aid && values.iid) {
            contentStore.loadImgFromServer(values.aid, values.iid)
        }
    }, [])

    const [files, selectFiles] = useFileUpload();
    const setEditorRef = React.useRef(null);
    const [img, setImg] = React.useState(null)

    const saveNewAvatar = () => {
        const canvas = setEditorRef.current.getImage()
        const imgL = canvas.toDataURL()
        setImg(imgL)
        //contentStore.setImage(aid, iid, imgL)
        //console.log("img", store.nowEditModule.img)
    }

    const uploadImg = () => {
        if (img != null) {
        rootStore.fetchDataScr(`${rootStore.url}/wip/images/`, "POST", img).then(
            (data) => {
                if (data) {
                    console.log("done", data)
                    contentStore.setImage(data.aid, data.iid, img)
                    managmentStore.setPageCreationComponents(index, "aid", data.aid)
                    managmentStore.setPageCreationComponents(index, "iid", data.iid)
                    setOpenDialog(false)

                } else {
                    console.log("fail", data)
                }

            })
        }
    }

    return (
        <>
            <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                onClick={() => managmentStore.setPageCreationList("selectId", index)}
            >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    // alignItems="center"
                    className={classes.gridTextWrapper}
                >
                    {values.aid === null && values.iid === null && <Button variant="contained" color="primary" onClick={() => setOpenDialog(true)}>
                        Загрузить изборажение
                    </Button>}
                    {values.aid != null && values.iid != null &&
                        <div className={classes.imgWrapper}>
                            <Image
                                width={960}
                                height={540}
                                //objectFit="contain"
                                layout='responsive'
                                src={contentStore.images[`${values.aid}-${values.iid}`]}
                                alt="Picture of the author"
                            />
                        </div>
                    }
                </Grid>
                <Grid className={classes.gridButtons}>
                    <StyledToggleButtonGroup
                        size="small"
                        aria-label="text formatting"
                    >
                        <ToggleButton value="clear" onClick={() => managmentStore.deleteComponent(index)}>
                            <ClearIcon />
                        </ToggleButton>
                        <ToggleButton value="drag">
                            <DragIndicatorIcon />
                        </ToggleButton>
                    </StyledToggleButtonGroup>
                </Grid>
            </Grid>
            <DialogImgSelect saveNewAvatar={saveNewAvatar} files={files} selectFiles={selectFiles} setEditorRef={setEditorRef} uploadImg={uploadImg} openDialog={openDialog} setOpenDialog={setOpenDialog} />
        </>

    );
}));

// onClickAway={() => setEdit(false)}

export default ImageComp

