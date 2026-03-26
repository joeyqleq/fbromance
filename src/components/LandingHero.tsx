"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { MatrixText } from "@/components/kokonutui/matrix-text";

export function LandingHero() {
  const [utcTime, setUtcTime] = useState("SYS.TIME: --:--:--");
  const [ping, setPing] = useState("PING: --ms");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const prevMouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);
  const cellsRef = useRef<{ offsetX: number; offsetY: number }[]>([]);
  const dimsRef = useRef({ width: 0, height: 0, cols: 0, rows: 0 });
  const animFrameRef = useRef<number | null>(null);
  
  const eyeImageDataRef = useRef<{ width: number; height: number; data: Uint8ClampedArray } | null>(null);

  const fontSize = 12;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setUtcTime(`${now.toISOString().replace("T", " ").split(".")[0]} UTC`);
      setPing(`PING: ${Math.floor(Math.random() * 10 + 12)}ms`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Pre-load the logo image to extract pixel data for ASCII overlay
  useEffect(() => {
    const img = new window.Image();
    img.src = "/images/brand/logo_and_hero.png";
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      const tempCanvas = document.createElement("canvas");
      // Downscale for performance if needed, or keep original to read
      const targetW = 200;
      const targetH = (img.height / img.width) * targetW;
      tempCanvas.width = targetW;
      tempCanvas.height = targetH;
      const ctx = tempCanvas.getContext("2d", { willReadFrequently: true });
      if (ctx) {
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, targetW, targetH);
        ctx.drawImage(img, 0, 0, targetW, targetH);
        const imageData = ctx.getImageData(0, 0, targetW, targetH);
        eyeImageDataRef.current = { width: targetW, height: targetH, data: imageData.data };
      }
    };
  }, []);

  const randomFn = (x: number, y: number) => {
    return parseFloat(
      "0." +
        String(Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123))
          .replace("0.", "")
          .replace("-", "")
    );
  };

  const noise = (x: number, y: number) => {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const a = randomFn(ix, iy);
    const b = randomFn(ix + 1, iy);
    const c = randomFn(ix, iy + 1);
    const d = randomFn(ix + 1, iy + 1);
    const ux = fx * fx * (3.0 - 2.0 * fx);
    const uy = fy * fy * (3.0 - 2.0 * fy);
    return a + (b - a) * ux + (c - a) * uy * (1.0 - ux) + (d - c) * ux * uy;
  };

  const charsA = [" ", ".", "·", "-", "=", "+", "*", "#", "%", "@"];
  const eyeDense = ["@", "#", "W", "M"];
  const eyeMid = ["+", "=", "-", "*"];
  const eyeSparse = [".", "·", ":"];

  const resize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d", { alpha: false });
    if(ctx) ctx.scale(dpr, dpr);
    const cols = Math.ceil(width / fontSize);
    const rows = Math.ceil(height / fontSize);
    dimsRef.current = { width, height, cols, rows };
    cellsRef.current = new Array(cols * rows)
      .fill(0)
      .map(() => ({ offsetX: 0, offsetY: 0 }));
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const render = () => {
      const { width, height, cols, rows } = dimsRef.current;
      if (!width || !height) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = "#00ff41";
      ctx.font = `${fontSize}px var(--font-mono), monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      timeRef.current += 0.01;
      const t = timeRef.current;
      const mouse = mouseRef.current;
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;

      const eyeData = eyeImageDataRef.current;
      let imgDisplayWidth = 0;
      let imgDisplayHeight = 0;
      let startX = 0;
      let startY = 0;

      if (eyeData) {
        imgDisplayWidth = width * 0.4;
        imgDisplayHeight = imgDisplayWidth * (eyeData.height / eyeData.width);
        startX = (width - imgDisplayWidth) / 2;
        startY = (height - imgDisplayHeight) / 2;
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const idx = y * cols + x;
          const cell = cellsRef.current[idx];
          if (!cell) continue;

          const posX = x * fontSize + fontSize / 2;
          const posY = y * fontSize + fontSize / 2;

          let drawX = posX + cell.offsetX;
          let drawY = posY + cell.offsetY;
          let charToDraw = " ";
          let isEyePixel = false;
          let eyeChar = " ";

          // Check if inside eye box
          if (eyeData && posX >= startX && posX <= startX + imgDisplayWidth && posY >= startY && posY <= startY + imgDisplayHeight) {
             const imgX = Math.floor(((posX - startX) / imgDisplayWidth) * eyeData.width);
             const imgY = Math.floor(((posY - startY) / imgDisplayHeight) * eyeData.height);
             if (imgX >= 0 && imgX < eyeData.width && imgY >= 0 && imgY < eyeData.height) {
                const pIdx = (imgY * eyeData.width + imgX) * 4;
                const r = eyeData.data[pIdx];
                const g = eyeData.data[pIdx+1];
                const b = eyeData.data[pIdx+2];
                // Luma calculation
                const luma = 0.299*r + 0.587*g + 0.114*b;
                if (luma > 20) {
                    isEyePixel = true;
                    // shimmer
                    const rand = Math.random();
                    if (luma > 180) {
                        eyeChar = eyeDense[Math.floor(rand * eyeDense.length)];
                    } else if (luma > 80) {
                        eyeChar = eyeMid[Math.floor(rand * eyeMid.length)];
                    } else {
                        eyeChar = eyeSparse[Math.floor(rand * eyeSparse.length)];
                    }
                }
             }
          }

          if (isEyePixel) {
              drawX = posX; // No mouse displacement for eye
              drawY = posY;
              charToDraw = eyeChar;
              // Clear background behind eye char
              ctx.fillStyle = "#000000";
              ctx.fillRect(drawX - fontSize/2, drawY - fontSize/2, fontSize, fontSize);
              ctx.fillStyle = "#00ff41";
          } else {
              // Background rendering
              const dx = mouse.x - posX;
              const dy = mouse.y - posY;
              const dist = Math.sqrt(dx * dx + dy * dy);

              const verticalGrad = y / rows;
              if (verticalGrad > 0.4) {
                const n = noise(x * 0.05 + t * 0.5, y * 0.1);
                const density = (verticalGrad - 0.4) * 2 + n * 0.5;
                if (density > 0.2) {
                  const charIdx = Math.floor(
                    Math.min(density * charsA.length, charsA.length - 1)
                  );
                  charToDraw = charsA[charIdx];
                }
              }

              const radius = 120;
              if (dist < radius) {
                const force = (radius - dist) / radius;
                const angle = Math.atan2(dy, dx);
                const targetOffsetX = -Math.cos(angle) * force * 20;
                const targetOffsetY = -Math.sin(angle) * force * 20;
                cell.offsetX += (targetOffsetX - cell.offsetX) * 0.2;
                cell.offsetY += (targetOffsetY - cell.offsetY) * 0.2;
                if (charToDraw !== " ") {
                  charToDraw = charsA[Math.floor(Math.random() * charsA.length)];
                } else if (force > 0.8) {
                  charToDraw = ".";
                }
              } else {
                cell.offsetX += (0 - cell.offsetX) * 0.1;
                cell.offsetY += (0 - cell.offsetY) * 0.1;
              }

              ctx.globalAlpha = Math.min(
                1,
                Math.max(0, (y - rows * 0.3) / (rows * 0.2))
              );
          }

          if (charToDraw !== " ") {
            ctx.fillText(charToDraw, drawX, drawY);
          }
        }
      }

      ctx.globalAlpha = 1.0;
      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    prevMouseRef.current.x = mouseRef.current.x;
    prevMouseRef.current.y = mouseRef.current.y;
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.vx = mouseRef.current.x - prevMouseRef.current.x;
    mouseRef.current.vy = mouseRef.current.y - prevMouseRef.current.y;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
    mouseRef.current.vx = 0;
    mouseRef.current.vy = 0;
  }, []);

  return (
    <div className="relative w-full h-[100vh] flex flex-col bg-black text-[#00ff41] overflow-hidden selection:bg-[#ff0080]/30 z-10">
      {/* Corner Buttons */}
      <div className="absolute top-8 left-8 z-50">
        <MatrixText text="POI5ON.M3" className="font-heading font-black text-2xl tracking-tighter cursor-pointer" />
      </div>
      <div className="absolute top-8 right-8 z-50 font-mono text-sm tracking-widest cursor-pointer hover:text-white transition-colors">
        [INDEX]
      </div>
      <div className="absolute bottom-8 left-8 z-50 font-mono text-xs opacity-60">
        EST. 2026 // BEIRUT → GITHUB
      </div>
      <div className="absolute bottom-8 right-8 z-50 font-mono text-xs opacity-60">
        OPEN INVESTIGATION
      </div>

      <section
        className="relative flex-none h-[70vh] w-full"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <canvas ref={canvasRef} className="block w-full h-full absolute top-0 left-0 z-10 pointer-events-none" />
      </section>

      <section className="relative flex-none h-[30vh] w-full border-t border-[#00ff41] grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] bg-black z-20">
        <div className="p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#00ff41]">
          <div className="font-mono text-[11px] uppercase tracking-widest opacity-80">SIGNAL ANALYSIS // OPEN SOURCE</div>
          <p className="font-default text-lg text-[#00ff41] leading-relaxed max-w-[90%] mt-4">
            A researcher encountered r/ForbiddenBromance —<br />
            a subreddit where Israelis and Lebanese talk.<br />
            What began as curiosity about anomalous patterns<br />
            became a structured investigation into whether<br />
            a self-described peace forum behaves like one.<br />
            This is the data. These are the findings.<br />
            Judge for yourself.
          </p>
        </div>

        <div className="p-8 flex flex-col border-b md:border-b-0 md:border-r border-[#00ff41]">
          <div className="mb-6">
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-80 mb-2">STATUS</div>
            <div className="font-mono text-xs uppercase tracking-wider">ACTIVE — DATA LOCKED <span className="text-[#ff0080]">2026-03-19</span></div>
          </div>
          <div className="mb-6">
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-80 mb-2">ARCHIVE</div>
            <ul className="font-mono text-xs uppercase tracking-wider space-y-1">
              <li>88,094 COMMENTS</li>
              <li>4,895 POSTS</li>
              <li>28 ACTOR PROFILES</li>
              <li>6+ YEARS OF DATA</li>
            </ul>
          </div>
          <div>
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-80 mb-2">SUBJECT</div>
            <div className="font-mono text-xs uppercase tracking-wider">r/ForbiddenBromance</div>
          </div>
        </div>

        <div className="p-8 flex flex-col justify-between items-start md:items-end md:text-right">
          <div className="w-full flex flex-col md:items-end gap-1">
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-80 mb-2 w-full text-left md:text-right">NAVIGATION</div>
            <Link href="#dossier" className="font-mono text-sm hover:text-white transition-colors w-fit border-b border-transparent hover:border-white">→ [DOSSIER]</Link>
            <Link href="#analyst" className="font-mono text-sm hover:text-white transition-colors w-fit border-b border-transparent hover:border-white">→ [ANALYST]</Link>
            <Link href="#method" className="font-mono text-sm hover:text-white transition-colors w-fit border-b border-transparent hover:border-white">→ [METHOD]</Link>
            <Link href="#dispatch" className="font-mono text-sm hover:text-white transition-colors w-fit border-b border-transparent hover:border-white">→ [DISPATCH]</Link>
          </div>
          <div className="mt-8 md:mt-0">
            <div className="font-mono text-[11px] uppercase tracking-widest opacity-80 w-full text-left md:text-right">SYS.TIME</div>
            <div className="font-mono text-xs uppercase tracking-wider mt-1 w-full text-left md:text-right">{utcTime}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
