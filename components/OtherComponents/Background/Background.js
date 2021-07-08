import React from 'react';
import { inject, observer } from 'mobx-react'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import styles from './background.module.css'


const Background = () => {

    return (
        <div className={styles.area} >
            <ul className={styles.circles}>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
        </div >
    );
}

export default Background