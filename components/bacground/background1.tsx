"use client";

import { useEffect, useRef } from "react";
import "@/styles/style.css";

const cellSize = 70;
const glowRadius = 50;
const lineColor = '#c0c0c0';
const lineOpacity = 0;

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const mouse = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    const ctx = canvas.getContext('2d');
    let w = window.innerWidth;
    let h = window.innerHeight;
    let cols = Math.floor(w / cellSize);
    let rows = Math.floor(h / cellSize);

    function resizeCanvas() {
      w = window.innerWidth;
      h = window.innerHeight;
      if (canvas) {
        canvas.width = w;
        canvas.height = h;
      }
      cols = Math.floor(w / cellSize);
      rows = Math.floor(h / cellSize);
    }

    let lastMouseMove = 0;
    const throttleDelay = 16; // ~60fps
    function handleMouseMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastMouseMove < throttleDelay) return;
      lastMouseMove = now;
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if(cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
    }

    function drawGrid() {
      if (!ctx) return;

      ctx.clearRect(0, 0, w, h);
      ctx.save();

      // Faint grid
      ctx.strokeStyle = `rgba(192,192,192,${lineOpacity})`;
      ctx.lineWidth = 2;
      for (let c = 0; c <= cols; ++c) {
        const x = Math.round(c * cellSize) + 0.5;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      for (let r = 0; r <= rows; ++r) {
        const y = Math.round(r * cellSize) + 0.5;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Glowing arcs
      ctx.save();
      ctx.shadowColor = "rgba(192,192,192,0.8)";
      ctx.shadowBlur = 16;
      ctx.globalAlpha = 1;
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 2.5;

      // Vertical lines
      for (let c = 0; c <= cols; ++c) {
        const x = c * cellSize;
        const dx = x - mouse.current.x;
        const rad2 = glowRadius * glowRadius;
        if (Math.abs(dx) > glowRadius) continue;
        const dy = Math.sqrt(rad2 - dx * dx);
        let y1 = mouse.current.y - dy;
        let y2 = mouse.current.y + dy;
        y1 = Math.max(0, y1);
        y2 = Math.min(h, y2);
        if (y2 > y1) {
          ctx.beginPath();
          ctx.moveTo(x, y1);
          ctx.lineTo(x, y2);
          ctx.stroke();
        }
      }

      // Horizontal lines
      for (let r = 0; r <= rows; ++r) {
        const y = r * cellSize;
        const dy = y - mouse.current.y;
        const rad2 = glowRadius * glowRadius;
        if (Math.abs(dy) > glowRadius) continue;
        const dx = Math.sqrt(rad2 - dy * dy);
        let x1 = mouse.current.x - dx;
        let x2 = mouse.current.x + dx;
        x1 = Math.max(0, x1);
        x2 = Math.min(w, x2);
        if (x2 > x1) {
          ctx.beginPath();
          ctx.moveTo(x1, y);
          ctx.lineTo(x2, y);
          ctx.stroke();
        }
      }

      ctx.restore();
    }

    function animate() {
      drawGrid();
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Initialize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} id="canvas" />
      <div className="custom-cursor" ref={cursorRef} id="cursor">
        <div className="cursor-inner"></div>
      </div>
    </div>
  );
}