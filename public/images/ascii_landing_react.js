import React, { useState, useEffect, useRef, useCallback } from 'react';

const App = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [currentState, setCurrentState] = useState('A');
  const [utcTime, setUtcTime] = useState('SYS.TIME: --:--:--');
  const [ping, setPing] = useState('PING: --ms');
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: -1000, y: -1000, vx: 0, vy: 0 });
  const prevMouseRef = useRef({ x: -1000, y: -1000 });
  const timeRef = useRef(0);
  const cellsRef = useRef([]);
  const dimsRef = useRef({ width: 0, height: 0, cols: 0, rows: 0 });
  const currentStateRef = useRef('A');
  const animFrameRef = useRef(null);
  const heroMainRef = useRef(null);
  const heroSubRef = useRef(null);

  const fontSize = 12;

  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body, html {
        width: 100%; height: 100%;
        background-color: #000000;
        color: #00ff41;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.4;
        overflow: hidden;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
      }
      .index-btn {
        position: fixed;
        font-size: 4vw;
        line-height: 0.8;
        font-weight: 400;
        letter-spacing: -0.04em;
        z-index: 100;
        cursor: pointer;
        user-select: none;
        transition: opacity 0.2s ease, text-shadow 0.2s ease;
        color: #00ff41;
        background: none;
        border: none;
        text-shadow: 0 0 5px rgba(0, 255, 65, 0.5);
      }
      .index-btn:hover { opacity: 0.7; text-shadow: 0 0 15px #00ff41; }
      .index-tl { top: 2rem; left: 2rem; }
      .index-tr { top: 2rem; right: 2rem; }
      .index-bl { bottom: 2rem; left: 2rem; z-index: 10; }
      .index-br { bottom: 2rem; right: 2rem; z-index: 10; }
      .layout-wrapper { display: flex; flex-direction: column; width: 100%; height: 100%; }
      .canvas-zone { position: relative; flex: 0 0 70vh; width: 100%; overflow: hidden; }
      canvas { display: block; width: 100%; height: 100%; position: absolute; top: 0; left: 0; z-index: 1; pointer-events: none; }
      .hero-container { position: absolute; bottom: 2rem; left: max(2rem, 8vw); z-index: 2; pointer-events: auto; max-width: 600px; }
      .hero-title { font-size: clamp(2rem, 4vw, 4rem); font-weight: 400; letter-spacing: -0.03em; line-height: 1; margin-bottom: 0.5rem; display: inline-block; color: #00ff41; }
      .hero-sub { font-size: 1.25rem; color: #00ff41; opacity: 0.8; letter-spacing: -0.01em; }
      .glitch-text { position: relative; display: inline-block; cursor: crosshair; }
      .glitch-text span { display: inline-block; transition: transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.1s; }
      .panel-zone { flex: 0 0 30vh; width: 100%; border-top: 1px solid #00ff41; display: grid; grid-template-columns: 2fr 1fr 1fr; background: #000000; position: relative; z-index: 5; }
      .panel-col { padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; }
      .panel-col:not(:last-child) { border-right: 1px solid #00ff41; }
      .mono-text { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #00ff41; }
      .editorial-text { font-size: 1.1rem; max-width: 90%; letter-spacing: -0.01em; color: #00ff41; }
      .links { display: flex; flex-direction: column; gap: 0.5rem; }
      .link-item { color: #00ff41; text-decoration: none; width: fit-content; border-bottom: 1px solid transparent; transition: border-color 0.2s ease, text-shadow 0.2s ease; cursor: pointer; background: none; font-size: 14px; font-family: inherit; padding: 0; text-shadow: 0 0 5px rgba(0, 255, 65, 0.5); }
      .link-item:hover { border-bottom: 1px solid #00ff41; text-shadow: 0 0 8px #00ff41; }
      .state-toggle { cursor: pointer; display: inline-block; border-bottom: 1px dotted #00ff41; }
      .state-toggle:hover { color: #ffffff; }
      .colophon { color: #00ff41; opacity: 0.6; margin-top: auto; }
      .right-align { text-align: right; align-items: flex-end; }
      .nav-overlay { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.95); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); z-index: 90; display: flex; flex-direction: column; opacity: 0; pointer-events: none; transition: opacity 0.4s ease; }
      .nav-overlay.active { opacity: 1; pointer-events: auto; }
      .nav-inner { margin: auto; width: 90%; max-width: 1200px; display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; padding-top: 4rem; }
      .nav-section h2 { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 12px; text-transform: uppercase; border-bottom: 1px solid #00ff41; padding-bottom: 0.5rem; margin-bottom: 1rem; letter-spacing: 0.05em; color: #00ff41; }
      .data-table { width: 100%; border-collapse: collapse; }
      .data-table tr { border-bottom: 1px solid rgba(0,255,65,0.1); transition: background 0.2s; cursor: pointer; }
      .data-table tr:hover { background: rgba(0,255,65,0.05); }
      .data-table td { padding: 0.75rem 0; font-size: 1.1rem; letter-spacing: -0.01em; color: #00ff41; }
      .data-table td.meta { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; font-size: 11px; text-align: right; color: #00ff41; opacity: 0.4; transition: opacity 0.2s; }
      .data-table tr:hover td.meta { opacity: 1; }
      .capabilities-list { list-style: none; font-size: 2rem; letter-spacing: -0.03em; line-height: 1.2; color: #00ff41; }
      .capabilities-list li { margin-bottom: 0.5rem; }
      @media (max-width: 900px) {
        .panel-zone { flex-direction: column; display: flex; height: auto; flex: none; }
        .canvas-zone { flex: 1 1 auto; min-height: 50vh; }
        .panel-col { border-right: none !important; border-bottom: 1px solid #00ff41; padding: 1.5rem; }
        .index-btn { font-size: 8vw; }
        .nav-inner { grid-template-columns: 1fr; gap: 2rem; padding-top: 6rem; }
        .right-align { align-items: flex-start; text-align: left; flex-direction: row; gap: 2rem; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setUtcTime(`SYS.TIME: ${now.toISOString().replace('T', ' ').split('.')[0]} UTC`);
      setPing(`PING: ${Math.floor(Math.random() * 10 + 12)}ms`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const setupGlitch = useCallback((el) => {
    if (!el) return;
    const text = el.innerText;
    el.innerHTML = '';
    for (let char of text) {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char;
      el.appendChild(span);
    }

    const onMouseMove = (e) => {
      const rect = el.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      Array.from(el.children).forEach((span) => {
        const spanRect = span.getBoundingClientRect();
        const spanX = spanRect.left - rect.left + (spanRect.width / 2);
        const dist = Math.abs(mouseX - spanX);
        if (dist < 40) {
          const intensity = (40 - dist) / 40;
          const xOffset = (Math.random() - 0.5) * 10 * intensity;
          const yOffset = (Math.random() - 0.5) * 10 * intensity;
          const stepX = Math.round(xOffset / 2) * 2;
          const stepY = Math.round(yOffset / 2) * 2;
          span.style.transform = `translate(${stepX}px, ${stepY}px) scale(${1 + intensity * 0.2})`;
          span.style.opacity = Math.random() > 0.8 ? '0.5' : '1';
        } else {
          span.style.transform = 'translate(0,0) scale(1)';
          span.style.opacity = '1';
        }
      });
    };

    const onMouseLeave = () => {
      Array.from(el.children).forEach((span) => {
        span.style.transform = 'translate(0,0) scale(1)';
        span.style.opacity = '1';
      });
    };

    el.addEventListener('mousemove', onMouseMove);
    el.addEventListener('mouseleave', onMouseLeave);
    return () => {
      el.removeEventListener('mousemove', onMouseMove);
      el.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  useEffect(() => {
    const cleanups = [];
    if (heroMainRef.current) cleanups.push(setupGlitch(heroMainRef.current));
    if (heroSubRef.current) cleanups.push(setupGlitch(heroSubRef.current));
    return () => cleanups.forEach(fn => fn && fn());
  }, [setupGlitch]);

  const randomFn = (x, y) => {
    return parseFloat('0.' + String(Math.abs(Math.sin(x * 12.9898 + y * 78.233) * 43758.5453123)).replace('0.', '').replace('-', ''));
  };

  const noise = (x, y) => {
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

  const charsA = [' ', '.', '·', '-', '=', '+', '*', '#', '%', '@'];
  const charsB = [' ', 'W', 'w', 'M', 'm', '/', '\\'];

  const resize = useCallback(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext('2d', { alpha: false });
    ctx.scale(dpr, dpr);
    const cols = Math.ceil(width / fontSize);
    const rows = Math.ceil(height / fontSize);
    dimsRef.current = { width, height, cols, rows };
    cellsRef.current = new Array(cols * rows).fill(0).map(() => ({ offsetX: 0, offsetY: 0 }));
  }, []);

  useEffect(() => {
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });

    const render = () => {
      const { width, height, cols, rows } = dimsRef.current;
      if (!width || !height) {
        animFrameRef.current = requestAnimationFrame(render);
        return;
      }

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      timeRef.current += 0.01;
      const t = timeRef.current;
      const mouse = mouseRef.current;
      const velocityMag = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      mouse.vx *= 0.9;
      mouse.vy *= 0.9;

      const state = currentStateRef.current;

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const idx = y * cols + x;
          const cell = cellsRef.current[idx];
          if (!cell) continue;

          const posX = x * fontSize + fontSize / 2;
          const posY = y * fontSize + fontSize / 2;

          let drawX = posX + cell.offsetX;
          let drawY = posY + cell.offsetY;
          let charToDraw = ' ';

          const dx = mouse.x - posX;
          const dy = mouse.y - posY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (state === 'A') {
            const verticalGrad = y / rows;
            if (verticalGrad > 0.4) {
              const n = noise(x * 0.05 + t * 0.5, y * 0.1);
              const density = (verticalGrad - 0.4) * 2 + n * 0.5;
              if (density > 0.2) {
                const charIdx = Math.floor(Math.min(density * charsA.length, charsA.length - 1));
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
              if (charToDraw !== ' ') {
                charToDraw = charsA[Math.floor(Math.random() * charsA.length)];
              } else if (force > 0.8) {
                charToDraw = '.';
              }
            } else {
              cell.offsetX += (0 - cell.offsetX) * 0.1;
              cell.offsetY += (0 - cell.offsetY) * 0.1;
            }

            ctx.globalAlpha = Math.min(1, Math.max(0, (y - rows * 0.3) / (rows * 0.2)));
          } else {
            const jitterX = Math.sin(y * 0.5 + t * 5) * 2;
            const stretchRadius = 200;
            if (dist < stretchRadius && velocityMag > 1) {
              const inf = (stretchRadius - dist) / stretchRadius;
              const dirX = mouse.vx * inf * 0.5;
              const dirY = mouse.vy * inf * 0.5;
              cell.offsetX += (dirX - cell.offsetX) * 0.1;
              cell.offsetY += (dirY - cell.offsetY) * 0.1;
            } else {
              cell.offsetX += (0 - cell.offsetX) * 0.05;
              cell.offsetY += (0 - cell.offsetY) * 0.05;
            }
            drawX += jitterX;

            if ((x + y) % 2 === 0) {
              charToDraw = charsB[(x + y) % charsB.length];
            }

            ctx.globalAlpha = 0.15 + velocityMag * 0.02;
          }

          if (charToDraw !== ' ') {
            if (state === 'B') {
              const textProtectDist = Math.sqrt(
                Math.pow(drawX - 100, 2) + Math.pow(drawY - (height - 100), 2)
              );
              if (textProtectDist < 250) {
                ctx.globalAlpha *= textProtectDist / 250;
              }
            }
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

  const handleMouseMove = useCallback((e) => {
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

  const toggleNav = () => setNavOpen(prev => !prev);

  const toggleCanvasState = () => {
    const next = currentStateRef.current === 'A' ? 'B' : 'A';
    currentStateRef.current = next;
    setCurrentState(next);
  };

  return (
    <div style={{ width: '100%', height: '100%', background: '#000', color: '#00ff41', overflow: 'hidden' }}>
      <button className="index-btn index-tl" onClick={toggleNav}>S</button>
      <button className="index-btn index-tr" onClick={toggleNav}>K</button>
      <button className="index-btn index-bl" onClick={toggleNav}>0</button>
      <button className="index-btn index-br" onClick={toggleNav}>1</button>

      <div className="layout-wrapper">
        <section
          className="canvas-zone"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <canvas ref={canvasRef} id="ascii-canvas" />
          <div className="hero-container">
            <h1 className="hero-title glitch-text" ref={heroMainRef}>Sandro Kozmanishvili</h1>
            <p className="hero-sub glitch-text" ref={heroSubRef}>Architecting structural logic and interactive materials.</p>
          </div>
        </section>

        <section className="panel-zone">
          <div className="panel-col left">
            <div className="mono-text">{utcTime}</div>
            <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center', margin: '2rem 0' }}>
              <p className="editorial-text">
                Currently establishing parameters for visual systems, generative video, structural sound, and civic digital products.
              </p>
            </div>
            <div className="mono-text">
              [ <span className="state-toggle" onClick={toggleCanvasState}>STATE: {currentState}</span> ]
            </div>
          </div>

          <div className="panel-col mid">
            <div className="links">
              <button className="link-item">Email</button>
              <button className="link-item">Are.na</button>
              <button className="link-item">GitHub</button>
              <button className="link-item">Instagram</button>
            </div>
            <div className="colophon mono-text">
              INFRASTRUCTURE:<br />
              NUXT, PRISMIC, VERCEL, SUPABASE
            </div>
          </div>

          <div className="panel-col right right-align">
            <div className="mono-text">©2024</div>
            <div className="mono-text">{ping}</div>
          </div>
        </section>
      </div>

      <nav className={`nav-overlay${navOpen ? ' active' : ''}`}>
        <div className="nav-inner">
          <div className="nav-section">
            <h2>Experiments</h2>
            <table className="data-table">
              <tbody>
                <tr><td>Topological Mapping</td><td className="meta">2023 // WEBGL</td></tr>
                <tr><td>Audio Reactive Architectures</td><td className="meta">2023 // MAX/MSP</td></tr>
                <tr><td>Synthetic Typographies</td><td className="meta">2022 // GLSL</td></tr>
                <tr><td>Algorithmic Editorial</td><td className="meta">2022 // DOM</td></tr>
              </tbody>
            </table>
          </div>
          <div className="nav-section">
            <h2>Capabilities</h2>
            <ul className="capabilities-list">
              <li>Visual</li>
              <li>Video</li>
              <li>Sound</li>
              <li>Products</li>
            </ul>
            <br /><br />
            <h2>Index</h2>
            <table className="data-table">
              <tbody>
                <tr><td>About</td><td className="meta">INFO</td></tr>
                <tr><td>Contact</td><td className="meta">ROUTING</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default App;