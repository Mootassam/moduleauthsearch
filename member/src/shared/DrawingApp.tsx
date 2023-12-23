import React, { useState, useRef, useEffect } from 'react';

export const DrawingApp = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(5);
  const [undoList, setUndoList] = useState<ImageData[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      setCtx(context);

      const handleMouseLeave = () => {
        if (drawing) {
          setDrawing(false);
          ctx?.closePath();
        }
      };

      window.addEventListener('mouseleave', handleMouseLeave);

      return () => {
        window.removeEventListener('mouseleave', handleMouseLeave);
      };
    }
  }, [ctx, drawing]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { offsetX, offsetY } = e.nativeEvent;
    ctx?.beginPath();
    ctx?.moveTo(offsetX, offsetY);
    setDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing || !ctx) return;
    const { offsetX, offsetY } = e.nativeEvent;
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const endDrawing = () => {
    if (!ctx) return;
    ctx.closePath();
    setDrawing(false);
    setUndoList([...undoList, ctx.getImageData(0, 0, 800, 600)]);
  };

  const undo = () => {
    if (undoList.length === 0 || !ctx) return;
    const newUndoList = [...undoList];
    newUndoList.pop();
    setUndoList(newUndoList);
    ctx.clearRect(0, 0, 800, 600);
    newUndoList.forEach((data) => {
      ctx.putImageData(data, 0, 0);
    });
  };

  const erase = () => {
    setColor('#FFFFFF');
  };

  const changeColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value);
  };

  const changeBrushSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrushSize(Number(e.target.value));
  };

  const clear = () => {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvasRef.current?.width || 0, canvasRef.current?.height || 0);
    setUndoList([]);
  };

  const widthHalf = brushSize ? brushSize / 2 : 0;

  const cursor = `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" fill="%23000000" opacity="0.3" height="${brushSize}" viewBox="0 0 ${brushSize} ${brushSize}" width="${brushSize}"><circle cx="${widthHalf}" cy="${widthHalf}" r="${widthHalf}" fill="%23000000" /></svg>') ${widthHalf} ${widthHalf}, auto`;

  return [{
    cursor, canvasRef,
    ctx,
    drawing,
    color,
    brushSize,
    undoList
  }, { startDrawing, draw, endDrawing, changeBrushSize, clear, changeColor, erase, undo }] as any;
};

