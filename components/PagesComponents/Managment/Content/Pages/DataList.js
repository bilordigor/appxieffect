/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import React from 'react';

import { Tooltip, IconButton, CircularProgress, Grid, Button, Typography, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
//import { DataGrid, useGridSlotComponentProps } from '@material-ui/data-grid';
import { createTheme } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import Image from 'next/image'

import { inject, observer, } from 'mobx-react'
import { toJS } from "mobx"


// import Chipper from './Modules/Chipper';
// import ModulesList from './Modules/ModulesList';

function customCheckbox(theme) {
    return {
        '& .MuiCheckbox-root svg': {
            width: 16,
            height: 16,
            backgroundColor: 'transparent',
            border: `1px solid ${theme.palette.type === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
                }`,
            borderRadius: 2,
        },
        '& .MuiCheckbox-root svg path': {
            display: 'none',
        },
        '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
            backgroundColor: '#1890ff',
            borderColor: '#1890ff',
        },
        '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
            position: 'absolute',
            display: 'table',
            border: '2px solid #fff',
            borderTop: 0,
            borderLeft: 0,
            transform: 'rotate(45deg) translate(-50%,-50%)',
            opacity: 1,
            transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
            content: '""',
            top: '50%',
            left: '39%',
            width: 5.71428571,
            height: 9.14285714,
        },
        '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
            width: 8,
            height: 8,
            backgroundColor: '#1890ff',
            transform: 'none',
            top: '39%',
            border: 0,
        },
    };
}

const defaultTheme = createTheme();
const useStyles = makeStyles(
    (theme) => ({
        root: {
            border: 0,
            color: theme.palette.primary.contrastText,
            fontFamily: [
                '-apple-system',
                'BlinkMacSystemFont',
                '"Segoe UI"',
                'Roboto',
                '"Helvetica Neue"',
                'Arial',
                'sans-serif',
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(','),
            WebkitFontSmoothing: 'auto',
            letterSpacing: 'normal',
            '& .MuiDataGrid-columnsContainer': {
                backgroundColor: theme.palette.primary.main,
            },
            '& .MuiDataGrid-iconSeparator': {
                display: 'none',
            },
            '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
                borderRight: `1px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
                    }`,
            },
            '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
                borderBottom: `1px solid ${theme.palette.type === 'light' ? '#f0f0f0' : '#303030'
                    }`,
            },
            '& .MuiDataGrid-cell': {
                // color:
                //     theme.palette.type === 'light'
                //         ? 'rgba(0,0,0,.85)'
                //         : 'rgba(255,255,255,0.65)',
            },
            '& .MuiPaginationItem-root': {
                borderRadius: 0,
            },
            ...customCheckbox(theme),
            '& .super-app-theme--rows': {
                backgroundColor: theme.palette.blueGrey["5"],
                '&:hover': {
                    backgroundColor: theme.palette.blueGrey["5"],
                },
                color: theme.palette.primary.contrastText,
            },
        },
    }),
    { defaultTheme },
);

// function CustomPagination() {
//     const { state, apiRef } = useGridSlotComponentProps();

//     return (
//         <Pagination
//             color="primary"
//             variant="outlined"
//             shape="rounded"
//             page={state.pagination.page}
//             count={state.pagination.pageCount}
//             // @ts-expect-error
//             renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
//             onChange={(event, value) => apiRef.current.setPage(value)}
//         />
//     );
// }





const DataList = inject('rootStore', 'managmentStore')(observer(({ rootStore, managmentStore }) => {
    const classes = useStyles();
    const theme = useTheme();

    React.useEffect(() => {
        managmentStore.LoadPageList()
        // console.log("pages", toJS(managmentStore.pageCreationList.pages))
    }, []);

    //const [rows, setRows] = React.useState(managmentStore.pageCreationList.pages)

    // React.useEffect(() => {
    //     setRows(managmentStore.pageCreationList.pages)
    // }, [managmentStore.pageCreationList.pages]);

    const kindSelect = (value) => {
        if (value === "practice") return "Практика"
        if (value === "task") return "Задание"
        if (value === "theory") return "Теория"
    }

    const statusSelect = (value) => {
        if (value === "wip") return "В Разработке"
        if (value === "published") return "Опубликован"
    }

    const columns = [
        {
            field: 'name',
            headerName: 'Название',
            //type: 'number',
            width: 220,
            renderCell: (params) => (
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                        <Tooltip title={params.value != null ? params.value : ""}>
                            <Typography style={{ cursor: "default" }} noWrap>{params.value}</Typography>
                        </Tooltip>
                    </Grid>
                </Grid>
            ),
        },
        {
            field: 'status',
            headerName: 'Статус',
            width: 180,
            renderCell: (params) => (
                <Typography style={{ cursor: "default" }}> {statusSelect(params.value)} </Typography>
            ),
        },
        {
            field: 'views',
            headerName: 'Просмотры',
            width: 180,
            renderCell: (params) => (
                <Typography style={{ cursor: "default" }}> {params.value} </Typography>
            ),
        },
        // {
        //     field: 'blueprint',
        //     headerName: 'Тип',
        //     width: 180,
        // },
        {
            field: 'kind',
            headerName: 'Вид',
            width: 200,
            renderCell: (params) => (
                <Typography style={{ cursor: "default" }}> {kindSelect(params.value)} </Typography>
            ),
        },
        {
            field: 'theme',
            headerName: 'Тематика',
            width: 210,
            renderCell: (params) => (
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                        <Tooltip title={params.value != null ? params.value : ""}>
                            <Typography style={{ cursor: "default" }} noWrap>{params.value}</Typography>
                        </Tooltip>
                    </Grid>
                </Grid>
            ),
        },
        {
            field: 'description',
            headerName: 'Описание',
            flex: 1,
            minWidth: 150,
            renderCell: (params) => (
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                        <Tooltip title={params.value != null ? params.value : ""}>
                            <Typography style={{ cursor: "default" }} noWrap>{params.value}</Typography>
                        </Tooltip>
                    </Grid>
                </Grid>
            ),
        },
        {
            field: '',
            headerName: '',
            //type: 'number',
            width: 130,
            renderCell: (params) => (
                <Grid>
                    <Tooltip title="Изменить">
                        <IconButton
                            onClick={() => managmentStore.changeOldPageList(params.row.id)}
                            variant="contained"
                            //color="primary"
                            size="small"
                            style={{ marginLeft: 16, marginTop: -4, color: theme.palette.primary.contrastText }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить">
                        <IconButton
                            onClick={() => managmentStore.deletePageInList(params.row.id)}
                            variant="contained"
                            //color="primary"
                            size="small"
                            style={{ marginLeft: 16, marginTop: -4, color: theme.palette.primary.contrastText }}
                        >
                            <DeleteForeverIcon />
                        </IconButton>
                    </Tooltip>
                </Grid>
            ),
        },
    ];

    const rows = [
        { id: 1, valueReports: 1, reportType: 'Не исторично', contentType: 'Страница', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>', },
        { id: 2, valueReports: 2, reportType: 'Не исторично', contentType: 'Модуль', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 3, valueReports: 3, reportType: 'Не исторично', contentType: 'Страница', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 4, valueReports: 4, reportType: 'Не исторично', contentType: 'Модуль', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 5, valueReports: 5, reportType: 'Не исторично', contentType: 'Страница', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 6, valueReports: 6, reportType: 'Не исторично', contentType: 'Модуль', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 7, valueReports: 7, reportType: 'Не исторично', contentType: 'Модуль', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 8, valueReports: 8, reportType: 'Не исторично', contentType: 'Модуль', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
        { id: 9, valueReports: 9, reportType: 'Не исторично', contentType: 'Страница', contentAuthor: 'Ξ Effect', reportValue: 'Разработчики, вы, <дальше следует непереводимая игра слов с использованием местных идиоматических выражений>' },
    ];

    return (
        <div style={{ display: 'flex', height: '100%', width: '100%', marginTop: 16, }} className={classes.root}>
            <div style={{ flexGrow: 1 }}>
                {/* <DataGrid
                    rows={[...managmentStore.pageCreationList.pages]}
                    //rows={rows}
                    columns={columns}
                    className={classes.root}
                    autoHeight
                    //checkboxSelection
                    autoPageSize
                    disableSelectionOnClick
                    getRowClassName={(params) =>
                        `super-app-theme--rows`
                    }
                    disableColumnMenu
                    // disableColumnSelector
                    hideFooter
                // components={{
                //     Pagination: CustomPagination,
                // }}

                /> */}
            </div>
        </div>
    )
}));


export default DataList;