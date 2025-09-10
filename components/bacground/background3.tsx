"use client";

import { useEffect, useRef } from "react";
import "@/styles/style.css";

const cellSize = 70;
const glowRadius = 70;
const lineColor = '#c0c0c0';
const lineOpacity = 0;
const trailLength = 10; // Number of mouse positions to track for trail
const trailFadeDuration = 500; // Duration (ms) for trail to fade

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const mouseHistory = useRef<{ x: number; y: number; timestamp: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!canvas || !cursor) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let cols = Math.floor(w / cellSize);
    let rows = Math.floor(h / cellSize);

    function resizeCanvas() {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      cols = Math.floor(w / cellSize);
      rows = Math.floor(h / cellSize);
    }

    let lastMouseMove = 0;
    const throttleDelay = 16; // ~60fps
    function handleMouseMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastMouseMove < throttleDelay) return;
      lastMouseMove = now;

      // Add new mouse position to history with timestamp
      mouseHistory.current.push({ x: e.clientX, y: e.clientY, timestamp: now });
      // Remove old positions to keep trail length
      while (mouseHistory.current.length > trailLength) {
        mouseHistory.current.shift();
      }

      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }

    function drawGrid() {
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

      // Glowing arcs with trailing effect
      const now = performance.now();
      mouseHistory.current.forEach((pos, index) => {
        // Calculate opacity based on age (older positions fade out)
        const age = now - pos.timestamp;
        if (age > trailFadeDuration) return; // Skip expired positions
        const opacity = 1 - age / trailFadeDuration; // Linear fade from 1 to 0

        ctx.save();
        ctx.shadowColor = `rgba(192,192,192,${0.8 * opacity})`;
        ctx.shadowBlur = 16;
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2.5;

        // Vertical lines
        for (let c = 0; c <= cols; ++c) {
          const x = c * cellSize;
          const dx = x - pos.x;
          const rad2 = glowRadius * glowRadius;
          if (Math.abs(dx) > glowRadius) continue;
          const dy = Math.sqrt(rad2 - dx * dx);
          let y1 = pos.y - dy;
          let y2 = pos.y + dy;
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
          const dy = y - pos.y;
          const rad2 = glowRadius * glowRadius;
          if (Math.abs(dy) > glowRadius) continue;
          const dx = Math.sqrt(rad2 - dy * dy);
          let x1 = pos.x - dx;
          let x2 = pos.x + dx;
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
      });

      ctx.restore();
    }

    function animate() {
      drawGrid();
      // Clean up old positions
      const now = performance.now();
      mouseHistory.current = mouseHistory.current.filter(
        (pos) => now - pos.timestamp <= trailFadeDuration
      );
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