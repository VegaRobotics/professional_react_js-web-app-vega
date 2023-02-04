import React, { useState, useRef } from "react";
import * as S from './styles';
import "./styles.css";

const PaintApp = () => {
    const [color, setColor] = useState("#000000");
    const [brushSize, setBrushSize] = useState(5);
    const [drawingType, setDrawingType] = useState("paint");
    const [mouseDown, setMouseDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [lastX, setLastX] = useState(0);
    const [lastY, setLastY] = useState(0);
    const [drawings, setDrawings] = useState([]);
    const canvasRef = useRef(null);
  
    const handleMouseDown = (e) => {
      setMouseDown(true);
      setStartX(e.clientX);
      setStartY(e.clientY);
    };
  
    const handleMouseUp = () => {
      setMouseDown(false);
      setDrawings([
        ...drawings,
        {
          startX,
          startY,
          lastX,
          lastY,
          color,
          brushSize,
          drawingType,
        },
      ]);
    };

  const handleMouseMove = (e) => {
    if (!mouseDown) return;
    const canvas = e.target;
    const ctx = canvas.getContext("2d");
  
    if (drawingType === "paint") {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(e.clientX, e.clientY);
      ctx.stroke();
    } else if (drawingType === "rectangle") {
      ctx.strokeRect(startX, startY, e.clientX - startX, e.clientY - startY);
    } else if (drawingType === "circle") {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;
      ctx.arc(startX + width / 2, startY + height / 2, Math.max(width, height) / 2, 0, 2 * Math.PI);
      ctx.stroke();
    }
  
    setLastX(e.clientX);
    setLastY(e.clientY);
  };
  

  return (  
  <S.Container>
  <div className="paint-app bg-gray-100 h-screen">
  <canvas
        ref={canvasRef}
        className="w-full h-full border border-gray-400"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        width={500}
        height={500}
      />
    <div className="controls p-4">
      <label className="block mb-2 text-gray-700">
        Cor:
        <input
          className="form-input mt-1"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </label>
      <label className="block mb-2 text-gray-700">
        Tamanho da escova:
        <input
          className="form-input mt-1"
          type="number"
          value={brushSize}
          onChange={(e) => setBrushSize(e.target.value)}
        />
      </label>
      <label className="block mb-2 text-gray-700">
        Tipo de desenho:
        <select
          className="form-select mt-1"
          value={drawingType}
          onChange={(e) => setDrawingType(e.target.value)}
        >
          <option value="paint">Pincel</option>
          <option value="rectangle">Retângulo</option>
          <option value="circle">Círculo</option>
        </select>
      </label>
    </div>
  </div>
</S.Container>
);
}

export default PaintApp;
