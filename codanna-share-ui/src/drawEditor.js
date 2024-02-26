import React, {useState, useRef, useEffect} from 'react';
import { socket } from './socket.js';

const DrawingCanvas = () => {
    const canvasRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    const sessionId = window.location.pathname.split("/").slice(-1);

    const startDrawing = (event) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { offsetX, offsetY } = event.nativeEvent;

        ctx.beginPath();
        ctx.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = (event) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const { offsetX, offsetY } = event.nativeEvent;

        ctx.lineTo(offsetX, offsetY);
        ctx.stroke();
    };

    const finishDrawing = () => {
        setIsDrawing(false);
    };

    const saveDrawing = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL(); // Convert canvas to base64 string
        // Now you can send `dataURL` wherever you want, for example, to your backend
        console.log(dataURL);

        const message = {
            session: sessionId,
            value: dataURL
        };
        socket.emit("main-draw-edit", message);
    };

    useEffect(() => {
        const handler = (message) => {
            console.log(canvasRef);
            console.log(canvasRef.current);
            console.log(message.value);
            /*
            canvasRef.current = message.value;
            const canvas = canvasRef.current;
            const ctx = destina.getContext('2d');

             */
            var img = new Image;
            img.onload = function () {
              canvasRef.current.getContext('2d').drawImage(img, 0, 0);
            };
            img.src = message.value;
        };
        socket.on("main-draw-edit-" + sessionId, handler);
    }, []);

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <canvas
                ref={canvasRef}
                width={500}
                height={500}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={finishDrawing}
                onMouseOut={finishDrawing}
                style={{ border: '1px solid black' }}
            />
            <button onClick={saveDrawing}>Save Drawing</button>
        </div>
    );
};

export default DrawingCanvas;