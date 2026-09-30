import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import React, { Component, useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/motion-prefs";
import littleParthiBg from "../assets/little-parthi.jpg";

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: unknown) {
    console.warn("WebGL Context safely fell back:", error);
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function heartShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.35);
  s.bezierCurveTo(0, 0.55, -0.25, 0.7, -0.45, 0.45);
  s.bezierCurveTo(-0.7, 0.15, -0.3, -0.2, 0, -0.5);
  s.bezierCurveTo(0.3, -0.2, 0.7, 0.15, 0.45, 0.45);
  s.bezierCurveTo(0.25, 0.7, 0, 0.55, 0, 0.35);
  return s;
}

function FloatingHearts({ count = 8, reduced = false }) {
  const geo = useMemo(() => new THREE.ShapeGeometry(heartShape(), 8), []);
  const group = useRef<THREE.Group>(null);

  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 14,
        z: -2 - Math.random() * 8,
        s: 0.16 + Math.random() * 0.28,
        r: Math.random() * Math.PI,
        sp: 0.12 + Math.random() * 0.22,
      })),
    [count],
  );

  useFrame((state) => {
    if (!group.current || reduced) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const s = seeds[i];
      if (!s) return;
      child.position.y = s.y + Math.sin(t * s.sp + s.r) * 0.7;
      child.rotation.z = Math.sin(t * s.sp * 0.5 + s.r) * 0.25;
    });
  });

  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh key={i} geometry={geo} position={[s.x, s.y, s.z]} scale={s.s}>
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.4}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

function Drift({ reduced }: { reduced: boolean }) {
  useFrame((state) => {
    const scroll =
      typeof window === "undefined"
        ? 0
        : window.scrollY /
          Math.max(1, document.body.scrollHeight - window.innerHeight);
    const t = reduced ? 0 : state.clock.elapsedTime;
    state.camera.position.x +=
      (Math.sin(t * 0.08) * 0.3 - state.camera.position.x) * 0.02;
    state.camera.position.y += (-scroll * 2.8 - state.camera.position.y) * 0.03;
    state.camera.position.z += (6 - scroll * 1.2 - state.camera.position.z) * 0.03;
    state.camera.lookAt(0, state.camera.position.y * 0.4, -5);
  });
  return null;
}

function CssTwinklingStars() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(35)].map((_, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white opacity-70 animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            animationDelay: `${Math.random() * 2}s`,
            boxShadow: "0 0 8px rgba(255,255,255,0.8)",
          }}
        />
      ))}
    </div>
  );
}

export function Starfield() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Fullscreen Background Photo */}
      <img
        src={littleParthiBg}
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Gentle natural dimming so text is crisp */}
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[1px]" />

      {/* 3D Canvas with WebGL Error Boundary */}
      <WebGLErrorBoundary fallback={<CssTwinklingStars />}>
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: false, powerPreference: "default" }}
          camera={{ position: [0, 0, 6], fov: 60 }}
        >
          <Stars
            radius={60}
            depth={40}
            count={reduced ? 200 : 500}
            factor={3}
            saturation={0}
            fade
            speed={reduced ? 0 : 0.3}
          />
          <FloatingHearts count={reduced ? 3 : 6} reduced={reduced} />
          <Drift reduced={reduced} />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
}
