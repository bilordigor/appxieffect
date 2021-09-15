import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

const useStyles = makeStyles((theme) => ({
  background: {
    backgroundColor: 'black',
    filter: 'grayscale(10%) opacity(100%)',
    mixBlendMode: 'multiply',
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    zIndex: '-1',
  },
}));

const BackgroundImg = inject('uiStore')(observer(({ uiStore, src, alt = 'background' }) => {
  const classes = useStyles();
  const theme = useTheme();
  const router = useRouter()
  const onLoad = () => {
    uiStore.setLoading(router.pathname)
  }

  return (
    <div className={classes.background}>
      <Image
        onLoad={() => onLoad()}
        alt={alt}
        src={src}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>

  )


  // < Image className = { classes.background } src = { src } alt = { alt } priority = "true" layout = "responsive" />; //objectFit="cover"
}));

export default BackgroundImg;
