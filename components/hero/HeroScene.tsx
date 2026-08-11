'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ZenScene = dynamic(() => import('./ZenScene'), { ssr: false });

function supportsWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

/** Static, no-JS-required stand-in used before hydration, on reduced-motion,
 *  and whenever WebGL isn't available — never a blank box. */
function SceneFallback() {
  // Mirrors the 3D scene's composition — a few soft orbs over still water —
  // so the two states tell the same visual story regardless of which renders.
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[2.5rem]" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-br from-sage-100 via-mist to-sky-100 dark:from-sage-900 dark:via-sage-950 dark:to-sky-950" />
      <div className="absolute inset-x-6 bottom-10 h-24 rounded-[50%] bg-sage-200/50 dark:bg-sage-800/40 blur-md" />

      <div className="relative w-full h-full max-w-sm mx-auto">
        <div
          className="absolute left-[18%] top-[30%] w-24 h-24 rounded-full shadow-lg motion-safe:animate-float-slow"
          style={{ background: 'radial-gradient(circle at 35% 30%, #FBF3DE, #F3E6C9 60%, #E4CFA0 100%)' }}
        />
        <div
          className="absolute right-[15%] top-[22%] w-16 h-16 rounded-full shadow-md motion-safe:animate-float"
          style={{ background: 'radial-gradient(circle at 35% 30%, #E4F4FA, #A9D6E5 65%, #7FBFD6 100%)' }}
        />
        <div
          className="absolute right-[30%] bottom-[26%] w-11 h-11 rounded-full shadow-md motion-safe:animate-float-slow"
          style={{ background: 'radial-gradient(circle at 35% 30%, #F3F1FA, #C9C3E6 65%, #AFA6D6 100%)' }}
        />
        <div
          className="absolute left-[28%] bottom-[18%] w-8 h-8 rounded-full shadow-sm motion-safe:animate-float"
          style={{ background: 'radial-gradient(circle at 35% 30%, #EAF6EF, #9FC7AE 65%, #7EAF96 100%)' }}
        />
      </div>
    </div>
  );
}

/**
 * Gate for the one signature 3D moment: renders the real WebGL zen scene
 * only once we're mounted client-side, WebGL is confirmed available, and the
 * visitor hasn't asked for reduced motion. Otherwise falls back to a static,
 * still-on-brand illustration — never a blank hero.
 */
export default function HeroScene() {
  const [mode, setMode] = useState<'checking' | '3d' | 'fallback'>('checking');

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setMode(prefersReducedMotion || !supportsWebGL() ? 'fallback' : '3d');
  }, []);

  return (
    // `relative` is required here, not just cosmetic: react-three-fiber's
    // Canvas measures and positions itself against this element via
    // ResizeObserver + an internal absolutely-positioned wrapper. Without a
    // positioning context, it can fail to pick up this container's real
    // size and fall back to the browser's native default canvas size
    // (300x150), which is exactly the "tiny scene floating in a corner"
    // bug this fixes.
    <div className="relative w-full h-full min-w-0 min-h-0">
      {mode === '3d' ? <ZenScene /> : <SceneFallback />}
    </div>
  );
}
