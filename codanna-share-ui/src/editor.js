import React, {useEffect} from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css'; //Example style, you can use another
import { socket } from './socket.js';

export function CodeEditor() {
    const [code, setCode] = React.useState(
        `function add(a, b) {\n  return a + b;\n}`
    );

    const sessionId = window.location.pathname.split("/").slice(-1);

    const onValueChange = (newValue) => {
        setCode(newValue);

        const message = {
            session: sessionId,
            value: newValue
        };
        socket.emit("main-input-edit", message);
    }

    useEffect(() => {
        const handler = (message) => {
            setCode(message.value);
        };
        socket.on("main-input-edit-" + sessionId, handler);
    }, []);

    return (
        <Editor
            value={code}
            onValueChange={code => onValueChange(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 18,
                height: '100%',
            }}
        />
    );
}