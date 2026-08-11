'use client';

// The one signature 3D moment on the whole site: a handful of soft orbs
// drifting in warm, calm light just above a grounding contact shadow, with
// a light drift of ambient particles. Hovering a ball gives its surface a
// gentle jelly-like wobble (MeshDistortMaterial) — a small, playful, opt-in
// interaction rather than something constantly animating on its own.
// Deliberately simple geometry — spheres — because simple shapes with clean
// color and good lighting read as premium; ornate or oversized geometry
// (earlier passes tried a cone-petal lotus, then a giant flat "water" disc)
// reliably looked worse than it should. Only ever mounted client-side, and
// only when WebGL is available — see HeroScene.tsx.

import { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Sparkles, ContactShadows, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh } from 'three';

// A PerspectiveCamera's field of view is vertical only — the horizontal
// extent you can actually see at a given depth depends on the container's
// aspect ratio (width/height), which changes continuously as the browser
// window is resized, independent of the fixed heights set per breakpoint on
// the hero container. A composition tuned to look right at one window width
// can silently go out of frame at another. Rather than re-eyeball the
// layout for every possible width, compute how much of it actually fits and
// scale the whole scene down (never up) to guarantee it always does.
const CAMERA_FOV_DEG = 32;
const CAMERA_DISTANCE = 5.2; // must match the Canvas camera position z below
// Rightmost orb sits at x=1.4 with radius 0.36 — plus a margin so it's never
// flush against the edge, not just technically inside it.
const MAX_HORIZONTAL_EXTENT = 1.4 + 0.36 + 0.2;

interface OrbConfig {
  position: [number, number, number];
  scale: number;
  color: string;
  floatSpeed: number;
  floatRange: number;
}

// Tuned for two things at once: (1) close together, not scattered across
// the frame, and (2) never visually touching — including while floating and
// while hovered (the wobble bulges the surface outward). Two things make
// that safe to guarantee with simple math instead of eyeballing it:
//  - every orb sits within a narrow ~0.25-unit Z band, so perspective
//    projection can't make a "far apart in 3D" pair look closer on screen
//    than it is (a big source of the earlier "touching" illusion);
//  - every pair's center-to-center distance is kept at ≥1.5x the sum of
//    their radii, which comfortably covers the float drift + hover bulge.
const ORBS: OrbConfig[] = [
  { position: [-1.05, 0.15, 0.15], scale: 0.5, color: '#F3E6C9', floatSpeed: 1.0, floatRange: 0.35 },
  { position: [1.4, 0.42, -0.05], scale: 0.36, color: '#A9D6E5', floatSpeed: 1.3, floatRange: 0.4 },
  { position: [0.55, -0.05, 0.2], scale: 0.26, color: '#C9C3E6', floatSpeed: 1.6, floatRange: 0.4 },
  { position: [-0.05, -0.4, 0.05], scale: 0.19, color: '#9FC7AE', floatSpeed: 1.9, floatRange: 0.4 },
];

// How far the hover wobble pushes the surface, and how much faster it
// churns while hovered — both eased in/out via hoverAmountRef below rather
// than snapping, so the reaction still feels controlled at this intensity.
const HOVER_DISTORT = 0.62;
const IDLE_WOBBLE_SPEED = 2.2;
const HOVER_WOBBLE_SPEED = 4.4;

function Orb({ position, scale, color, floatSpeed, floatRange }: OrbConfig) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<Mesh>(null);
  // react-three-fiber doesn't re-render the scene on hover state changes by
  // itself in a way that smoothly animates a material prop — ease a single
  // 0→1 "how hovered" progress every frame and derive both the distortion
  // amount and its churn speed from it, rather than snapping either.
  const hoverAmountRef = useRef(0);

  useFrame((_, delta) => {
    const target = hovered ? 1 : 0;
    hoverAmountRef.current += (target - hoverAmountRef.current) * Math.min(delta * 8, 1);
    const amount = hoverAmountRef.current;
    const material = meshRef.current?.material as { distort?: number; speed?: number } | undefined;
    if (material) {
      material.distort = amount * HOVER_DISTORT;
      material.speed = IDLE_WOBBLE_SPEED + amount * (HOVER_WOBBLE_SPEED - IDLE_WOBBLE_SPEED);
    }
  });

  return (
    <Float speed={floatSpeed} rotationIntensity={0.35} floatIntensity={floatRange}>
      <mesh
        ref={meshRef}
        position={position}
        scale={scale}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial color={color} roughness={0.35} metalness={0.05} speed={2.2} distort={0} />
      </mesh>
    </Float>
  );
}

function Orbs() {
  return (
    <>
      {ORBS.map((orb, i) => (
        <Orb key={i} {...orb} />
      ))}
    </>
  );
}

/** Shrinks the whole composition (orbs, shadow, sparkles together, so
 *  nothing drifts out of alignment) whenever the container is too narrow
 *  relative to its height for everything to fit — recalculated live as the
 *  browser window is resized, since react-three-fiber's `size` updates on
 *  every resize of the canvas. Never scales up past 1, only down. */
function ResponsiveScene({ children }: { children: React.ReactNode }) {
  const { size } = useThree((state) => state);
  const aspect = size.width / size.height;
  const verticalHalfExtent = CAMERA_DISTANCE * Math.tan((CAMERA_FOV_DEG / 2) * (Math.PI / 180));
  const horizontalHalfExtent = verticalHalfExtent * aspect;
  const scale = Math.min(1, horizontalHalfExtent / MAX_HORIZONTAL_EXTENT);

  return <group scale={scale}>{children}</group>;
}

export default function ZenScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0.1, CAMERA_DISTANCE], fov: CAMERA_FOV_DEG }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      style={{ width: '100%', height: '100%', display: 'block' }}
      resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 2]} intensity={1.1} color="#FFF3DE" />
      <directionalLight position={[-3, 1, -2]} intensity={0.4} color="#A9D6E5" />
      <Suspense fallback={null}>
        <ResponsiveScene>
          <Orbs />
          {/* Sits just below the lowest orb's resting bottom edge so each
              shadow reads as belonging to its ball. */}
          <ContactShadows position={[0, -0.65, 0]} opacity={0.4} scale={4} blur={1.6} far={1} resolution={512} color="#1F3A2F" />
          <Sparkles count={26} scale={[3.8, 2, 3.8]} size={1.5} speed={0.2} opacity={0.35} color="#EAF6EF" />
        </ResponsiveScene>
      </Suspense>
    </Canvas>
  );
}
