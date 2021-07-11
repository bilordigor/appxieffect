import { Typography } from '@material-ui/core';
import { BottomToolbarProps } from '@react-page/editor';
import { BottomToolbar, usePluginOfCell } from '@react-page/editor';
import React from 'react';
import CollapseButton from './CollapseButton';

/**
 * This is an example on how you could customize the Bottom Toolbar.
 * We provide most of the default components as exports, so you can also create a custom one
 * and use the existing pieces that you need. Check the source code for BottomToolbar
 */
export const CustomBottomToolbar = React.memo(
    ({ pluginControls, ...props }) => {
        // const [collapsed, setCollapsed] = React.useState(false);
        const plugin = usePluginOfCell(props.nodeId);

        return (
            <BottomToolbar
                {...props}
                style={{
                    // width: '500px',
                    // height: '500px',
                    color: '#e0e0e0',
                    borderRadius: 8,
                    borderColor: '#3f50b5',
                    backgroundColor: 'black',
                }}
                pluginControls={pluginControls}
                // actionsLeft={[
                //     <CollapseButton
                //         key="collapse button"
                //         collapsed={collapsed}
                //         setCollapsed={setCollapsed}
                //     />,
                // ]}
            >
                {/* <Typography>Custom Toolbar for {plugin?.title}</Typography> */}
            </BottomToolbar>
        );
    }
);