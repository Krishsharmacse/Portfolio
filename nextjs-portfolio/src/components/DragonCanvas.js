'use client';
import { useEffect, useRef } from 'react';

export default function DragonCanvas() {
  const canvasRef = useRef(null);
  const stateRef  = useRef({ segments: [], particles: [], mouse: { x: 0, y: 0, active: false }, t: 0, raf: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx    = canvas.getContext('2d');
    const state  = stateRef.current;
    const NUM    = 80;

    // init mouse coords
    state.mouse.x = window.innerWidth  / 2;
    state.mouse.y = window.innerHeight / 2;

    const onMove  = (e) => { state.mouse.x = e.clientX; state.mouse.y = e.clientY; state.mouse.active = true; };
    const onLeave = ()  => { state.mouse.active = false; };
    const resize  = ()  => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };

    resize();
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', resize);

    for (let i = 0; i < NUM; i++) state.segments.push({ x: canvas.width / 2, y: canvas.height / 2, angle: 0 });

    const lerp = (a, b, t) => a + (b - a) * t;

    const drawWing = (wx, wy, ang, flap, side, intensity) => {
      ctx.save();
      ctx.translate(wx, wy);
      ctx.rotate(ang);
      ctx.scale(1, side);
      ctx.rotate(Math.PI / 2 + flap * (0.6 + intensity * 0.4));

      ctx.beginPath();
      ctx.moveTo(0,0); ctx.quadraticCurveTo(40,-15,80,-30);
      ctx.lineWidth = 10; ctx.strokeStyle = '#1a0505'; ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0,0); ctx.lineTo(80,-30); ctx.lineTo(230,-120);
      ctx.quadraticCurveTo(175,-15,200,38); ctx.quadraticCurveTo(135,48,115,105); ctx.quadraticCurveTo(48,58,-28,78);
      const g = ctx.createRadialGradient(80,-30,0,80,-30,190);
      g.addColorStop(0,'rgba(50,0,0,0.95)'); g.addColorStop(0.45,'rgba(90,8,8,0.78)'); g.addColorStop(1,'rgba(4,0,0,0.35)');
      ctx.fillStyle = g; ctx.fill();

      ctx.beginPath();
      ctx.moveTo(80,-30); ctx.lineTo(230,-120);
      ctx.moveTo(80,-30); ctx.lineTo(200,38);
      ctx.moveTo(80,-30); ctx.lineTo(115,105);
      ctx.lineWidth = 4; ctx.strokeStyle = '#3d0d0d'; ctx.stroke();

      ctx.shadowColor = '#f59e0b'; ctx.shadowBlur = 5; ctx.fillStyle = '#fde68a';
      [[230,-120],[200,38],[115,105]].forEach(([cx,cy]) => {
        ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+10,cy-14); ctx.lineTo(cx-10,cy-4); ctx.fill();
      });
      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      const s = state.segments;
      state.t += 0.015;
      const t = state.t;
      const w = canvas.width, h = canvas.height;

      let tx = w/2 + Math.cos(t*0.5)*Math.sin(t*0.2)*(w*0.48);
      let ty = h/2 + Math.sin(t*0.4)*Math.cos(t*0.3)*(h*0.48);
      let tracking = 0;

      if (state.mouse.active) {
        const dx = state.mouse.x - tx, dy = state.mouse.y - ty;
        const dist = Math.sqrt(dx*dx+dy*dy);
        if (dist < w*0.6) {
          tracking = 1 - dist/(w*0.6);
          tx = lerp(tx, state.mouse.x, tracking*0.8);
          ty = lerp(ty, state.mouse.y, tracking*0.8);
        }
      }

      const hdx = tx - s[0].x, hdy = ty - s[0].y;
      const hdist = Math.sqrt(hdx*hdx+hdy*hdy);
      const ta = Math.atan2(hdy,hdx);
      let diff = ta - s[0].angle;
      while (diff >  Math.PI) diff -= Math.PI*2;
      while (diff < -Math.PI) diff += Math.PI*2;
      s[0].angle += diff * 0.1;
      const speed = Math.min(hdist, 9 + tracking*5);
      s[0].x += Math.cos(s[0].angle)*speed;
      s[0].y += Math.sin(s[0].angle)*speed;

      for (let i=1; i<NUM; i++) {
        const dx=s[i-1].x-s[i].x, dy=s[i-1].y-s[i].y;
        s[i].angle = Math.atan2(dy,dx);
        const slither = Math.sin(t*3-i*0.15)*(2+i*0.1)*(1+tracking*0.5);
        const gap = i<15 ? 14 : 10;
        s[i].x = lerp(s[i].x, s[i-1].x - Math.cos(s[i].angle)*gap + Math.cos(s[i].angle+Math.PI/2)*slither, 0.65);
        s[i].y = lerp(s[i].y, s[i-1].y - Math.sin(s[i].angle)*gap + Math.sin(s[i].angle+Math.PI/2)*slither, 0.65);
      }

      const flap = Math.sin(t*(6+tracking*3));
      drawWing(s[14].x,s[14].y,s[14].angle,flap, 1,tracking);
      drawWing(s[14].x,s[14].y,s[14].angle,flap,-1,tracking);

      for (let i=NUM-1; i>=0; i--) {
        const seg = s[i];
        let r = 6;
        if      (i<12)  r = 24-i*0.8;
        else if (i<35)  r = 26+Math.sin((i-12)/23*Math.PI)*15;
        else            r = 28*(1-(i-35)/(NUM-35))+3;

        ctx.save(); ctx.translate(seg.x,seg.y); ctx.rotate(seg.angle);
        const la = seg.angle-Math.PI/4;
        const li = Math.max(0,Math.cos(la));
        const rc = Math.min(255,55+li*90);
        const bg = ctx.createRadialGradient(r*0.4*Math.cos(-la),r*0.4*Math.sin(-la),0,0,0,r);
        bg.addColorStop(0,`rgb(${rc},8,8)`); bg.addColorStop(0.5,'#120404'); bg.addColorStop(1,'#000');
        ctx.beginPath(); ctx.ellipse(0,0,r,r*0.84,0,0,Math.PI*2);
        ctx.fillStyle=bg; ctx.fill();

        if (i%3===0 && i>4) {
          const sp=r*1.8+Math.sin(i+t*5)*4;
          ctx.beginPath(); ctx.moveTo(-r*0.2,0); ctx.lineTo(-sp,-3-tracking*2); ctx.lineTo(-sp,3+tracking*2);
          const sg=ctx.createLinearGradient(-r,0,-sp,0);
          sg.addColorStop(0,'#7c2d12'); sg.addColorStop(1,'#fde68a');
          ctx.fillStyle=sg; ctx.fill();
        }
        ctx.restore();
      }

      // Head
      ctx.save(); ctx.translate(s[0].x,s[0].y); ctx.rotate(s[0].angle);
      ctx.beginPath();
      ctx.moveTo(15,-15); ctx.lineTo(45,-7); ctx.lineTo(55,0); ctx.lineTo(40,10); ctx.lineTo(10,15); ctx.closePath();
      const hg=ctx.createLinearGradient(15,-15,45,10);
      hg.addColorStop(0,'#3d0000'); hg.addColorStop(1,'#0c0000');
      ctx.fillStyle=hg; ctx.fill(); ctx.strokeStyle='#6b0000'; ctx.lineWidth=1.5; ctx.stroke();

      ctx.fillStyle='#92400e';
      ctx.beginPath(); ctx.moveTo(20,-12); ctx.quadraticCurveTo(-5,-38,-24,-52); ctx.quadraticCurveTo(-4,-24,8,-6); ctx.fill();
      ctx.beginPath(); ctx.moveTo(20,12);  ctx.quadraticCurveTo(-5, 38,-24, 52); ctx.quadraticCurveTo(-4, 24,8, 6); ctx.fill();
      ctx.beginPath(); ctx.moveTo(8,-15);  ctx.lineTo(-14,-26); ctx.lineTo(0,-10); ctx.fill();
      ctx.beginPath(); ctx.moveTo(8, 15);  ctx.lineTo(-14, 26); ctx.lineTo(0, 10); ctx.fill();

      ctx.shadowColor='#ef4444'; ctx.shadowBlur=14; ctx.fillStyle='#ef4444';
      ctx.beginPath(); ctx.ellipse(30,-8,5,2, 0.3,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(30, 8,5,2,-0.3,0,Math.PI*2); ctx.fill();
      ctx.shadowColor='#fde68a'; ctx.shadowBlur=18+tracking*18; ctx.fillStyle='#fff';
      ctx.beginPath(); ctx.arc(32,-8,1.5,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.arc(32, 8,1.5,0,Math.PI*2); ctx.fill();
      ctx.shadowBlur=0;

      ctx.fillStyle='#000';
      ctx.beginPath(); ctx.ellipse(47,-3,2.5,1.5,0.2,0,Math.PI*2); ctx.fill();
      ctx.beginPath(); ctx.ellipse(47, 3,2.5,1.5,-0.2,0,Math.PI*2); ctx.fill();

      ctx.fillStyle='#fde68a';
      ctx.beginPath(); ctx.moveTo(35, 8); ctx.lineTo(40,15); ctx.lineTo(43, 8); ctx.fill();
      ctx.beginPath(); ctx.moveTo(35,-8); ctx.lineTo(40,-15); ctx.lineTo(43,-8); ctx.fill();
      ctx.restore();

      // Fire
      if (Math.random()<0.55+tracking*0.3) {
        const sx=s[0].x+Math.cos(s[0].angle)*54, sy=s[0].y+Math.sin(s[0].angle)*54;
        state.particles.push({
          x:sx, y:sy,
          vx: Math.cos(s[0].angle)*(8+Math.random()*8)+(Math.random()-0.5)*4,
          vy: Math.sin(s[0].angle)*(8+Math.random()*8)+(Math.random()-0.5)*4,
          life:1, size:18+Math.random()*(28+tracking*18), core:Math.random()>0.5,
        });
      }
      ctx.globalCompositeOperation='screen';
      for (let i=state.particles.length-1;i>=0;i--) {
        const p=state.particles[i];
        p.x+=p.vx; p.y+=p.vy; p.life-=0.016; p.size*=0.98;
        if (p.life<=0) { state.particles.splice(i,1); continue; }
        const pg=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.size);
        if (p.core) {
          pg.addColorStop(0,`rgba(255,255,255,${p.life})`);
          pg.addColorStop(0.3,`rgba(255,200,50,${p.life*0.9})`);
          pg.addColorStop(1,'rgba(255,50,0,0)');
        } else {
          pg.addColorStop(0,`rgba(255,100,0,${p.life*0.8})`);
          pg.addColorStop(0.5,`rgba(140,0,0,${p.life*0.5})`);
          pg.addColorStop(1,'rgba(40,0,0,0)');
        }
        ctx.fillStyle=pg; ctx.beginPath(); ctx.arc(p.x,p.y,p.size,0,Math.PI*2); ctx.fill();
      }
      ctx.globalCompositeOperation='source-over';
      state.raf = requestAnimationFrame(draw);
    };

    state.raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(state.raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="dragon-canvas" aria-hidden="true" />;
}
