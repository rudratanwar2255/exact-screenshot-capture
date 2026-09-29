import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/lib/motion-prefs";

function heartShape() {
  const s = new THREE.Shape();
  s.moveTo(0, 0.35);
  s.bezierCurveTo(0, 0.55, -0.25, 0.7, -0.45, 0.45);
  s.bezierCurveTo(-0.7, 0.15, -0.3, -0.2, 0, -0.5);
  s.bezierCurveTo(0.3, -0.2, 0.7, 0.15, 0.45, 0.45);
  s.bezierCurveTo(0.25, 0.7, 0, 0.55, 0, 0.35);
  return s;
}

function FloatingHearts({ count = 14, reduced = false }) {
  const geo = useMemo(() => new THREE.ShapeGeometry(heartShape(), 8), []);
  const group = useRef<THREE.Group>(null);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        x: (Math.random() - 0.5) * 16,
        y: (Math.random() - 0.5) * 14,
        z: -2 - Math.random() * 8,
        s: 0.2 + Math.random() * 0.35,
        r: Math.random() * Math.PI,
        sp: 0.15 + Math.random() * 0.3,
      })),
    [count],
  );

  useFrame((state) => {
    if (!group.current || reduced) return;
    const t = state.clock.elapsedTime;
    group.current.children.forEach((child, i) => {
      const s = seeds[i];
      if (!s) return;
      child.position.y = s.y + Math.sin(t * s.sp + s.r) * 0.9;
      child.rotation.z = Math.sin(t * s.sp * 0.6 + s.r) * 0.35;
    });
  });

  return (
    <group ref={group}>
      {seeds.map((s, i) => (
        <mesh key={i} geometry={geo} position={[s.x, s.y, s.z]} scale={s.s}>
          <meshBasicMaterial
            color={i % 3 === 0 ? "#f3c6a5" : "#f7b9c8"}
            transparent
            opacity={0.35}
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
      (Math.sin(t * 0.08) * 0.6 - state.camera.position.x) * 0.02;
    state.camera.position.y += (-scroll * 4 - state.camera.position.y) * 0.03;
    state.camera.position.z += (6 - scroll * 2 - state.camera.position.z) * 0.03;
    state.camera.lookAt(0, state.camera.position.y * 0.5, -5);
  });
  return null;
}

export function Starfield() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,oklch(0.3_0.08_200)_0%,oklch(0.17_0.05_210)_55%,oklch(0.12_0.04_215)_100%)]" />
      <img
        src="/__l5e/assets-v1/33046b0a-bbd0-4e5d-b64d-ee859267fd5c/little-parthi.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-15"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.17_0.05_210_/_55%)_0%,oklch(0.17_0.05_210_/_75%)_60%,oklch(0.14_0.05_212_/_90%)_100%)]" />
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 6], fov: 60 }}
      >
        <Stars
          radius={60}
          depth={40}
          count={reduced ? 500 : 1400}
          factor={3}
          saturation={0}
          fade
          speed={reduced ? 0 : 0.6}
        />
        <FloatingHearts count={reduced ? 6 : 14} reduced={reduced} />
        <Drift reduced={reduced} />
      </Canvas>
      <div className="absolute inset-0 bg-[radial-gradient(60%_40%_at_20%_20%,oklch(0.75_0.1_185_/_12%),transparent_70%),radial-gradient(50%_35%_at_85%_60%,oklch(0.8_0.09_48_/_10%),transparent_70%)]" />
    </div>
  );
}
