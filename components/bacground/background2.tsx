"use client";

import { useEffect, useRef } from "react";
import "@/styles/style.css";

const cellSize = 70;
const lineColor = '#c0c0c0';
const lineOpacity = 0;
const trailLength = 10; // Number of mouse positions for trailing effect
const trailFadeDuration = 500; // Duration (ms) for trail to fade
const pulseInterval = 1000; // Time (ms) between new pulses
const pulseDuration = 2000; // Duration (ms) for each pulse
const maxPulses = 5; // Maximum simultaneous pulsing cells

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const mouseHistory = useRef<{ x: number; y: number; timestamp: number }[]>([]);
  const pulses = useRef<{ col: number; row: number; startTime: number }[]>([]);

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
      mouseHistory.current.push({ x: e.clientX, y: e.clientY, timestamp: now });
      while (mouseHistory.current.length > trailLength) {
        mouseHistory.current.shift();
      }
      if(cursor) {
          cursor.style.left = `${e.clientX}px`;
          cursor.style.top = `${e.clientY}px`;
      }
    }

    function addRandomPulse() {
      if (pulses.current.length >= maxPulses) return;
      const col = Math.floor(Math.random() * cols);
      const row = Math.floor(Math.random() * rows);
      pulses.current.push({ col, row, startTime: performance.now() });
    }

    // Start pulsing interval
    const pulseTimer = setInterval(addRandomPulse, pulseInterval);

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

      // Glowing box borders (trailing effect)
      const now = performance.now();
      mouseHistory.current.forEach((pos, index) => {
        const age = now - pos.timestamp;
        if (age > trailFadeDuration) return;
        const opacity = Math.pow(1 - age / trailFadeDuration, 2); // Quadratic fade for smoother trail

        ctx.save();
        ctx.shadowColor = `rgba(192,192,192,${0.8 * opacity})`;
        ctx.shadowBlur = 16;
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2.5;

        const col = Math.floor(pos.x / cellSize);
        const row = Math.floor(pos.y / cellSize);
        const x = col * cellSize;
        const y = row * cellSize;

        if (x >= 0 && y >= 0 && x < w && y < h) {
          ctx.beginPath();
          ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      // Glowing box borders (pulse effect)
      pulses.current.forEach((pulse, index) => {
        const age = now - pulse.startTime;
        if (age > pulseDuration) return;
        const opacity = Math.sin((age / pulseDuration) * Math.PI); // Sinusoidal fade-in/fade-out

        ctx.save();
        ctx.shadowColor = `rgba(192,192,192,${0.6 * opacity})`; // Slightly fainter than mouse trail
        ctx.shadowBlur = 12;
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;

        const x = pulse.col * cellSize;
        const y = pulse.row * cellSize;

        if (x >= 0 && y >= 0 && x < w && y < h) {
          ctx.beginPath();
          ctx.strokeRect(x + 1, y + 1, cellSize - 2, cellSize - 2);
          ctx.stroke();
        }

        ctx.restore();
      });

      ctx.restore();
    }

    function animate() {
      drawGrid();
      // Clean up old pulses and mouse positions
      const now = performance.now();
      mouseHistory.current = mouseHistory.current.filter(
        (pos) => now - pos.timestamp <= trailFadeDuration
      );
      pulses.current = pulses.current.filter(
        (pulse) => now - pulse.startTime <= pulseDuration
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
      clearInterval(pulseTimer);
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