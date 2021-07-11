// lazy load this file to keep initial bundle small
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus as style } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import React from 'react';
const CodeSnippet = ({ code, language }) => (React.createElement(SyntaxHighlighter, { wrapLongLines: true, language: language, style: style }, code));
export default CodeSnippet;
