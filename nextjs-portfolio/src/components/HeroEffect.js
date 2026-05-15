'use client';
import { useEffect, useRef } from 'react';

export default function HeroEffect() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    const mouse = { x: -2000, y: -2000, inside: false };
    let cx = -2000, cy = -2000; // smooth cursor

    const resize = () => {
      const section = canvas.parentElement;
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
      buildParticles();
      buildChars();
    };

    // ── Particles ──────────────────────────────────────
    let pts = [];
    const buildParticles = () => {
      const n = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 90);
      pts = Array.from({ length: n }, () => ({
        x:  Math.random() * canvas.width,
        y:  Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r:  Math.random() * 1.6 + 0.4,
        a:  Math.random() * 0.5 + 0.05,
        da: (Math.random() > 0.5 ? 1 : -1) * (0.003 + Math.random() * 0.009),
        v:  Math.random() > 0.55, // violet vs emerald
      }));
    };

    // ── Blinking code chars ────────────────────────────
    const ALPHA = '01アイウ{}<>=+*ABデータRAG'.split('');
    let chars = [];
    const buildChars = () => {
      chars = Array.from({ length: 22 }, () => ({
        x: 20 + Math.random() * (canvas.width  - 40),
        y: 20 + Math.random() * (canvas.height - 40),
        c: ALPHA[Math.floor(Math.random() * ALPHA.length)],
        a: 0, target: Math.random() * 0.09,
        next: Date.now() + Math.random() * 4000,
        dur:  1500 + Math.random() * 3500,
      }));
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    // Mouse on SECTION (canvas is pointer-events:none)
    const section = canvas.parentElement;
    const onMove  = (e) => {
      const r = section.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      mouse.inside = true;
    };
    const onLeave = () => { mouse.inside = false; };
    section.addEventListener('mousemove', onMove, { passive: true });
    section.addEventListener('mouseleave', onLeave);

    // ── Draw loop ──────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth lerp cursor
      const lerpT = mouse.inside ? 0.07 : 0.04;
      const targetX = mouse.inside ? mouse.x : -2000;
      const targetY = mouse.inside ? mouse.y : -2000;
      cx += (targetX - cx) * lerpT;
      cy += (targetY - cy) * lerpT;

      const inView = cx > -1000;

      // ── Radial glow follows cursor
      if (inView) {
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 280);
        g.addColorStop(0,   'rgba(124,58,237,0.07)');
        g.addColorStop(0.4, 'rgba(124,58,237,0.03)');
        g.addColorStop(1,   'rgba(124,58,237,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // ── Particles
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width)  p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // blink alpha
        p.a += p.da;
        if (p.a > 0.65) { p.a = 0.65; p.da = -Math.abs(p.da); }
        if (p.a < 0.04) { p.a = 0.04; p.da =  Math.abs(p.da); }

        const col = p.v ? '124,58,237' : '5,150,105';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${col},${p.a})`;
        ctx.fill();

        // particle→cursor lines
        if (inView) {
          const dx = cx - p.x, dy = cy - p.y;
          const d  = Math.hypot(dx, dy);
          if (d < 160) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(cx, cy);
            ctx.strokeStyle = `rgba(124,58,237,${(1 - d / 160) * 0.22})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // particle→particle mesh
        for (let j = i + 1; j < pts.length; j++) {
          const q  = pts[j];
          const dd = Math.hypot(q.x - p.x, q.y - p.y);
          if (dd < 85) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(255,255,255,${(1 - dd / 85) * 0.045})`;
            ctx.lineWidth = 0.35;
            ctx.stroke();
          }
        }
      }

      // ── Blinking code chars
      const now = Date.now();
      ctx.font = '11px "Courier New", monospace';
      for (const c of chars) {
        if (now > c.next) {
          c.target = Math.random() * 0.09;
          c.c = ALPHA[Math.floor(Math.random() * ALPHA.length)];
          c.next = now + c.dur;
        }
        c.a += (c.target - c.a) * 0.04;
        if (c.a > 0.005) {
          ctx.fillStyle = `rgba(124,58,237,${c.a})`;
          ctx.fillText(c.c, c.x, c.y);
        }
      }

      // ── Cursor orb + ring
      if (inView) {
        // outer ripple ring
        ctx.beginPath();
        ctx.arc(cx, cy, 18, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(124,58,237,0.18)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // middle ring
        ctx.beginPath();
        ctx.arc(cx, cy, 9, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(124,58,237,0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();

        // core dot
        ctx.beginPath();
        ctx.arc(cx, cy, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(167,139,250,0.9)';
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      section.removeEventListener('mousemove', onMove);
      section.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
