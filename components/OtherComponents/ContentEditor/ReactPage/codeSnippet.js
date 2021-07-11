import dynamic from 'next/dynamic';
import React from 'react';
// lazy load to keep initial bundle small
const CodeSnippet = dynamic(() => import('./components/CodeSnippet'));
const codeSnippet = {
    Renderer: ({ data }) => (data === null || data === void 0 ? void 0 : data.code) ? (React.createElement(CodeSnippet, { language: data.language, code: data.code })) : null,
    id: 'code-snippet',
    title: 'Code snippet',
    description: 'A code snippet',
    version: 1,
    controls: {
        type: 'autoform',
        schema: {
            properties: {
                language: {
                    type: 'string',
                },
                code: {
                    type: 'string',
                    uniforms: {
                        multiline: true,
                    },
                },
            },
            required: ['code'],
        },
    },
};
export default codeSnippet;