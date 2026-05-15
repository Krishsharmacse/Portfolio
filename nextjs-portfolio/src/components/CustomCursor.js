'use client';
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -200, my = -200; // raw mouse position
    let rx = -200, ry = -200; // smoothed ring position
    let raf;

    // Hide native cursor globally
    document.documentElement.style.cursor = 'none';

    const onMove = (e) => {
      mx = e.clientX;
      my = e.clientY;
      // Dot follows instantly
      dot.style.transform  = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const onLeave = () => {
      mx = -200; my = -200;
      dot.style.transform  = `translate(-200px, -200px)`;
    };

    // Smooth ring animation loop
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    // Scale up on interactive elements
    const onEnterLink = () => {
      ring.classList.add('cursor-hover');
      dot.classList.add('cursor-hover');
    };
    const onLeaveLink = () => {
      ring.classList.remove('cursor-hover');
      dot.classList.remove('cursor-hover');
    };

    const attachHover = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, label, select')
        .forEach(el => {
          el.addEventListener('mouseenter', onEnterLink);
          el.addEventListener('mouseleave', onLeaveLink);
        });
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    attachHover();
    raf = requestAnimationFrame(loop);

    // Re-attach on DOM changes (for dynamic content)
    const mo = new MutationObserver(attachHover);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.style.cursor = '';
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      mo.disconnect();
    };
  }, []);

  return (
    <>
      {/* Instant dot */}
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      {/* Lagging ring */}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
