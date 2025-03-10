//import '../styles/globals.css'
import React from 'react';
import Head from "next/head";
import PropTypes from 'prop-types';
import { useTheme, createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'mobx-react'
import { useStore } from '../store/rootStore'
//import { useFileUpload } from "use-file-upload";
import { inject, observer } from 'mobx-react'
import CssBaseline from '@material-ui/core/CssBaseline';
import { SnackbarProvider, useSnackbar } from 'notistack';

import "../styles/globals.css"

import '../styles/styles.css';

const MyApp = (observer(({ Component, pageProps }) => {

  const rootStore = useStore(pageProps.initialState)

  const themeWhite = createTheme({
    palette: {
      //mode: 'light',
      primary: {
        light: '#2196f3',
        main: '#1976d2',
        dark: '#0d47a1',
        contrastText: '#fff',
      },
      secondary: {
        light: '#8bc34a',
        main: '#689f38',
        dark: '#33691e',
        contrastText: '#111',
      },
      blueGrey: {
        "0": "#eceff1",
        "1": "#cfd8dc",
        "2": "#b0bec5",
        "3": "#90a4ae",
        "4": "#78909c",
        "5": "#607d8b",
        "6": "#546e7a",
        "7": "#455a64",
        "8": "#37474f",
        "9": "#263238",
      }
    },
  });


  const themeDark = createTheme({
    palette: {
      //mode: 'dark',
      primary: {
        light: '#2196f3',
        main: '#1976d2',
        dark: '#0d47a1',
        contrastText: '#fff',
      },
      secondary: {
        light: '#8bc34a',
        main: '#689f38',
        dark: '#33691e',
        contrastText: '#111',
      },

      blueGrey: {
        "0": "#263238",
        "1": "#37474f",
        "2": "#455a64",
        "3": "#546e7a",
        "4": "#607d8b",
        "5": "#78909c",
        "6": "#90a4ae",
        "7": "#b0bec5",
        "8": "#cfd8dc",
        "9": "#eceff1",
      }
    },
  });

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <>
      <Head>
        {/* <title>
          Ξ Effect
        </title> */}
        <meta name="Keywords" content="Образованиие, Эффект, Кси Эффект, Xi Effect, Effect" />
        <meta name="viewport" content="width=device-width, initial-scale=0.9, maximum-scale=3.2" />
        <meta name="yandex-verification" content="5fa082e60959bf8b" />
        <meta
          name="description"
          content="Всё, что нужно для вашего Образования."
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#603cba" />
        <meta name="theme-color" content="#ffffff" />
        {/* <link rel="shortcut icon" href="/static/favicon.ico" /> */}
      </Head>
      {/* <Context.Provider value={{ files, selectFiles }}> */}
      <Provider
        store={rootStore}
        rootStore={rootStore}
        uiStore={rootStore.uiStore}
        mainStore={rootStore.mainStore}
        knowledgeStore={rootStore.knowledgeStore}
        managmentStore={rootStore.managmentStore}
        settingsStore={rootStore.settingsStore}
        contentStore={rootStore.contentStore}
      >
        <ThemeProvider theme={rootStore.settingsStore.settings.darkTheme ? themeDark : themeWhite}>
          <SnackbarProvider
            autoHideDuration={800}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            maxSnack={3}>
            {/* <MenuLayout> */}
            <CssBaseline />
            <Component {...pageProps} />
            {/* </MenuLayout> */}
          </SnackbarProvider>
        </ThemeProvider>
      </Provider>
      {/* </Context.Provider> */}
    </>

  )
}))

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};