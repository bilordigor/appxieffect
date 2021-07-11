import React from 'react';
import { pluginFactories } from '@react-page/plugins-slate';
import dynamic from 'next/dynamic';
const InlineMath = dynamic(() => import('react-katex').then((module) => module.InlineMath), { ssr: false });
export default pluginFactories.createComponentPlugin({
    Component: (props) => {
        const focused = props.useFocused();
        const selected = props.useSelected();
        const showSource = focused && selected;
        const math = props.getTextContents().join('\n').trim();
        return (React.createElement("span", { style: !showSource ? { position: 'relative' } : {} },
            math ? (React.createElement("span", {
                contentEditable: false, style: showSource
                    ? {
                        position: 'absolute',
                        transform: 'translateY(-100%)',
                        transition: '0.2s',
                        backgroundColor: 'white',
                        border: '1px solid',
                        padding: 12,
                        display: 'inline-block',
                        zIndex: 10,
                    }
                    : {}
            },
                React.createElement(InlineMath, { math: math }))) : null,
            React.createElement("span", {
                style: showSource
                    ? {
                        border: '1px solid',
                        backgroundColor: 'white',
                        padding: 12,
                    }
                    : {
                        opacity: '0',
                        position: 'absolute',
                        left: 0,
                        top: 0,
                    }
            }, props.children)));
    },
    addHoverButton: true,
    addToolbarButton: true,
    type: 'Katex',
    object: 'inline',
    addExtraSpace: true,
    icon: React.createElement("span", null, "\u03A3"),
    label: 'Katex',
});