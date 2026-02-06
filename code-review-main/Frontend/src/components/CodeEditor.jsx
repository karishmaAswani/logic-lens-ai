import React, { useEffect } from 'react';
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const CodeEditor = ({ code, setCode }) => {

    useEffect(() => {
        prism.highlightAll();
    }, []);

    return (
        <div className="code-editor-container">
            <Editor
                value={code}
                onValueChange={setCode}
                highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
                padding={10}
                style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 16,
                    height: "100%",
                    width: "100%",
                    backgroundColor: "transparent",
                    color: "#e0e0e0",
                    caretColor: "#fff",
                    outline: "none"
                }}
            />
        </div>
    );
};

export default CodeEditor;
