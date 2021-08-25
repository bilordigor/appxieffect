import React, { useState } from 'react';
import { withStyles, Input, Grid, makeStyles } from '@material-ui/core';

import { inject, observer } from 'mobx-react'


const useStyles = makeStyles((theme) => ({
    gridTextWrapper: {
        //textAlign: "center !important",
        width: "100%",
    },
    text: {
        width: "100%",
        color: theme.palette.primary.contrastText,
        fontSize: props => props.fontSize,
        fontStyle: props => props.fontStyle,
        textAlign: props => props.textAlign,
        fontWeight: props => props.fontWeight,
        textDecoration: props => props.textDecoration,
        lineHeight: "normal",
    }
}));


const Header = inject('store')(observer(({ store, value }) => {

    // Simulated props for the purpose of the example
    const props = {  fontSize: value.fontSize, textAlign: value.textAlign, fontStyle: value.fontStyle, fontWeight: value.fontWeight, textDecoration: value.textDecoration, backgroundColor: 'black', color: 'white' };
    // Pass the props as the first argument of useStyles()
    //console.log( "props", props )
    const classes = useStyles(props);

    return (
        <>
            <Grid className={classes.gridTextWrapper}>
                <Input
                    classes={{
                        input: classes.text
                    }}
                    type="text"
                    //className={classes.text}
                    readOnly
                    disableUnderline
                    multiline
                    fullWidth
                    value={value.label}
                />
            </Grid>
        </>
    );
}));

export default Header