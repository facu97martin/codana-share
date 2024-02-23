import React, {useEffect} from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { io } from 'socket.io-client';


export function CodeEditor() {
    const [code, setCode] = React.useState(
        `function add(a, b) {\n  return a + b;\n}`
    );

    const socket = io("http://localhost:3000", {
        withCredentials: false,
    });

    const onValueChange = (newValue) => {
        setCode(newValue);
        console.log(newValue);
        socket.emit("main-input-edit", newValue);
    }

    useEffect(() => {
        const handler = (message) => {
            setCode(message);
            console.log(message);
        };
        socket.on("main-input-edit", handler);
    }, []);

    return (
        <Editor
            value={code}
            onValueChange={code => onValueChange(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 12,
            }}
        />
    );
}