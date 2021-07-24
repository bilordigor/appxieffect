import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
//import UploadFileIcon from '@material-ui/icons/UploadFile';
import { Slider, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, InputAdornment, Tooltip, IconButton, Avatar, Grid, withStyles, FormControl, InputLabel, TextField, OutlinedInput, Typography, Box, Button } from '@material-ui/core'
import { inject, observer } from 'mobx-react'

import SaveIcon from '@material-ui/icons/Save';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

let Crypto = require('crypto-js')

const SmallAvatar = withStyles((theme) => ({
    root: {
        width: 22,
        height: 22,
        border: `2px solid ${theme.palette.primary.contrastText}`,
    },
}))(Avatar);

const useStyles = makeStyles((theme) => ({
    dialogTitle: {
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
    textFieldDialog: {
        marginLeft: 12,
        marginRight: 0,
        width: "100%",
        backgroundColor: theme.palette.blueGrey["7"],
    },
    OutlinedInput: {
        zIndex: 999,
        color: theme.palette.primary.contrastText,
    },
    icons: {
        //color: 'rgb(142,146,151)',
    },
    inputLabel: {
        zIndex: 999,
        color: theme.palette.primary.contrastText,

    },
    textFieldTypography: {
        zIndex: 999,
        marginTop: -4,
        color: theme.palette.primary.contrastText,
    },
    cancelButton: {
        color: theme.palette.primary.contrastText
    },
    gridDialogItem: {
        width: '100%',
        paddingTop: 16,
        paddingLeft: -4,
    },
    gridRootDialogItem: {
        width: '100%',
        paddingRight: 24,
    },
    ErrorLabel: {
        zIndex: 999,
        fontSize: 16,
        color: theme.palette.error.main,
    },
    gridErrorLabel: {
        zIndex: 999,
        marginTop: 4,
        paddingLeft: 20,
        paddingRight: 20,
    },

}));

const DialogChangeEmail = inject('store')(observer(({ openEmailChangeDialog, setOpenEmailChangeDialog, store }) => {
    const classes = useStyles();

    const [newEmail, setNewEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(false)

    const [emailError, setEmailError] = React.useState(false)
    const [passwordError, setPasswordError] = React.useState(false)
    const [symError, setSymError] = React.useState(false)
    //const [password, setPassword] = React.useState('')

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const clickReadyEmail = () => {
        setEmailError(false)
        setPasswordError(false)
        setSymError(false)
        if (!newEmail.includes('@') || !newEmail.includes('.') || newEmail.length < 5) {
            setSymError(true)
        }
        if (!symError) {
            store.fetchDataScr(`${store.url}/email-change/`, "POST", { "password": Crypto.SHA384(password).toString(), "new-email": newEmail }) // postData /auth //Crypto.SHA384(store.settingsNew.passwordOldChange).toString() //Crypto.SHA384(store.settingsNew.passwordNewChange).toString()
                .then((data) => {
                    console.log(data)
                    if (data != undefined) {
                        if (data.a == "Success") { //userId //"Success"
                            setOpenEmailChangeDialog(false)
                        } else if (data.a == "Email in use") { //"User doesn't exist"
                            setEmailError(true)
                        } else if (data.a == "Wrong password") { //"User doesn't exist"
                            setPasswordError(true)
                        }
                    }
                });
        }
    }

    return (
        <Dialog open={openEmailChangeDialog} onClose={() => setOpenEmailChangeDialog(false)} aria-labelledby="form-dialog-title">
            <DialogTitle className={classes.dialogTitle} id="form-dialog-title">Изменение адреса электронной почты </DialogTitle>
            <DialogContent className={classes.dialogContent}>
                <DialogContentText className={classes.dialogContentText}>
                    Чтобы изменить адрес электронной почты, введите сначала текущий пароль, а затем введите новый адрес электронной почты.
                    Мы отправим письмо-подтверждение на новый адрес электроной почты. Откройте письмо и перейдите по ссылке.
                </DialogContentText>
                <Grid
                    className={classes.gridRootDialogItem}
                    container
                    direction="column"
                    justify="center"
                    alignItems="center"
                >
                    <Grid className={classes.gridDialogItem}>
                        <FormControl className={classes.textFieldDialog} variant="outlined">
                            <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-password"> <Typography className={classes.textFieldTypography}>Пароль</Typography> </InputLabel>
                            <OutlinedInput
                                className={classes.OutlinedInput}
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {showPassword ? <Visibility className={classes.icons} /> : <VisibilityOff className={classes.icons} />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={210}

                            />
                        </FormControl>
                    </Grid>
                    {emailError && <Grid item container direction="column" justify="center" alignItems="flex-start" className={classes.gridErrorLabel}>
                        <Typography className={classes.ErrorLabel}> Эта почта уже используется! </Typography>
                    </Grid>}
                    <Grid className={classes.gridDialogItem}>
                        <FormControl className={classes.textFieldDialog} variant="outlined">
                            <InputLabel className={classes.inputLabel} htmlFor="outlined-adornment-password"> <Typography className={classes.textFieldTypography}>Новый адрес почты</Typography> </InputLabel>
                            <OutlinedInput
                                className={classes.OutlinedInput}
                                type='text'
                                value={newEmail}
                                onChange={(event) => setNewEmail(event.target.value)}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                        >
                                            <Tooltip title="Сохранить изменения" arrow>
                                                <SaveIcon className={classes.icons} />
                                            </Tooltip>
                                        </IconButton>
                                    </InputAdornment>
                                }
                                labelWidth={210}

                            />
                        </FormControl>
                    </Grid>
                    {passwordError && <Grid item container direction="column" justify="center" alignItems="flex-start" className={classes.gridErrorLabel}>
                        <Typography className={classes.ErrorLabel}> Неверный пароль! </Typography>
                    </Grid>}
                </Grid>
            </DialogContent>
            <DialogActions className={classes.dialogActions}>
                <Button className={classes.cancelButton} onClick={() => setOpenEmailChangeDialog(false)}>отмена</Button>
                <Button color="primary" variant="contained" onClick={clickReadyEmail}>Готово</Button>
            </DialogActions>
        </Dialog>
    );
}))

export default DialogChangeEmail