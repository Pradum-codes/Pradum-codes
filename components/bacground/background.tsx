"use client";

import { useEffect, useRef } from "react";
import "@/styles/style.css";

const cellSize = 70;
const trailLength = 7; // Number of mouse positions for trailing effect
const trailFadeDuration = 500; // Duration (ms) for trail to fade
const pulseInterval = 500; // Time (ms) between new pulses
const pulseDuration = 1500; // Duration (ms) for each pulse
const maxPulses = 10; // Maximum simultaneous pulsing cells

export function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const mouseHistory = useRef<{ x: number; y: number; timestamp: number }[]>([]);
  const pulses = useRef<{ col: number; row: number; startTime: number }[]>([]);
  const paintRef = useRef({
    lineRGB: "34, 34, 34",
    gridRGB: "192, 192, 192",
    gridOpacity: 0.02,
    glowRGB: "154, 255, 120",
  });

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

    function refreshPaint() {
      const styles = getComputedStyle(document.documentElement);
      const lineRGB = styles.getPropertyValue("--canvas-line-rgb").trim();
      const gridRGB = styles.getPropertyValue("--canvas-grid-rgb").trim();
      const gridOpacity = Number(styles.getPropertyValue("--canvas-grid-opacity").trim());
      const glowRGB = styles.getPropertyValue("--canvas-glow-rgb").trim();

      paintRef.current = {
        lineRGB: lineRGB || paintRef.current.lineRGB,
        gridRGB: gridRGB || paintRef.current.gridRGB,
        gridOpacity: Number.isFinite(gridOpacity) ? gridOpacity : paintRef.current.gridOpacity,
        glowRGB: glowRGB || paintRef.current.glowRGB,
      };
    }

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
      if (cursor) {
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

      const { lineRGB, gridRGB, gridOpacity, glowRGB } = paintRef.current;

      // Faint grid
      ctx.strokeStyle = `rgba(${gridRGB},${gridOpacity})`;
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
        ctx.shadowColor = `rgba(${glowRGB},${0.5 * opacity})`; // Reduced from 0.8 to 0.3
        ctx.shadowBlur = 12; // Reduced from 16 to 8
        ctx.globalAlpha = opacity * 0.6; // Additional opacity reduction
        ctx.strokeStyle = `rgb(${lineRGB})`;
        ctx.lineWidth = 1.5; // Reduced from 2.5 to 1.5

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
        ctx.shadowColor = `rgba(${glowRGB},${0.6 * opacity})`; // Slightly fainter than mouse trail
        ctx.shadowBlur = 12;
        ctx.globalAlpha = opacity;
        ctx.strokeStyle = `rgb(${lineRGB})`;
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
    refreshPaint();
    const themeObserver = new MutationObserver(refreshPaint);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "style"] });
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    document.addEventListener('mousemove', handleMouseMove);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      themeObserver.disconnect();
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
