import React, { useRef, useEffect, forwardRef } from "react";
import QRCode from "qrcode";

const QRCodeCanvas = forwardRef(({ data, size = 256, fgColor = "#000000", bgColor = "#FFFFFF" }, ref) => {
  const canvasRef = ref || useRef(null); // use parent's ref if provided

  useEffect(() => {
    if (!canvasRef.current) return;

    QRCode.toCanvas(canvasRef.current, data, {
      width: size,
      margin: 1,
      color: {
        dark: fgColor, 
        light: bgColor,  // optionally make background color dynamic
      },
    });
  }, [data, size, fgColor, bgColor]); // include fgColor/bgColor in dependency array

  return (
    <canvas
      ref={canvasRef}   
      width={size}
      height={size}
      className="rounded-xl shadow-2xl border-4 border-white transition-all duration-300"
    />
  );
});

export default QRCodeCanvas;
