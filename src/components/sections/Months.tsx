import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { content } from "@/content";
import { Reveal, Section, SectionTitle } from "@/components/Section";
import { useReducedMotion } from "@/lib/motion-prefs";

function ParticleHeart({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null);
  
  const positions = useMemo(() => {
    const n = reduced ? 350 : 800;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 0.5 + Math.random() * 0.5;
      // Heart parametric curve equation
      const x = 16 * Math.sin(t) ** 3;
      const y =
        13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      arr[i * 3] = (x / 16) * r * 1.4;
      arr[i * 3 + 1] = (y / 16) * r * 1.4;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.45;
    }
    return arr;
  }, [reduced]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    // Gentle heartbeat pulse
    const pulse = reduced ? 1 : 1 + Math.sin(t * 2.2) * 0.06;
    ref.current.scale.setScalar(pulse);
    if (!reduced) {
      ref.current.rotation.y = Math.sin(t * 0.4) * 0.25;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#fba4b8"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

function useCountdown(target: string) {
  const [now, setNow] = useState(() => Date.now());
  
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = new Date(target).getTime() - now;
  return {
    done: diff <= 0,
    d: Math.max(0, Math.floor(diff / 86400000)),
    h: Math.max(0, Math.floor((diff / 3600000) % 24)),
    m: Math.max(0, Math.floor((diff / 60000) % 60)),
    s: Math.max(0, Math.floor((diff / 1000) % 60)),
  };
}

export function Months() {
  const reduced = useReducedMotion();
  const cd = useCountdown(content.milestone);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const totalDays = Math.max(
      0,
      Math.floor(
        (Date.now() - new Date(content.coupleDate).getTime()) / 86400000,
      ),
    );
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1500);
      setDays(Math.round(totalDays * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Section>
      <SectionTitle>{content.months.title}</SectionTitle>

      {/* 3D Glowing Particle Heart */}
      <div className="h-60 w-60 sm:h-64 sm:w-64">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 3.2], fov: 50 }}
          gl={{ antialias: false }}
        >
          <ParticleHeart reduced={reduced} />
        </Canvas>
      </div>

      {/* Animated Counter */}
      <Reveal delay={0.15}>
        <p className="mt-4 text-center font-display text-xl sm:text-2xl text-cream">
          <span className="gold-text font-semibold">{content.milestoneLabel}</span> •{" "}
          <span className="gold-text tabular-nums font-semibold">{days}</span> days •{" "}
          <span className="text-blush">{content.months.smiles}</span>
        </p>
      </Reveal>

      {/* Live Countdown to 1 October 2026 or Celebration Message */}
      <Reveal delay={0.3} className="mt-8">
        {cd.done ? (
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="glass-card rounded-3xl px-8 py-4 border border-blush/40 shadow-[0_0_40px_rgba(251,164,184,0.4)]"
          >
            <p className="text-glow text-center font-script text-3xl sm:text-4xl text-blush">
              {content.months.celebrate}
            </p>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center">
            <div className="flex gap-2.5 sm:gap-4">
              {[
                ["days", cd.d],
                ["hrs", cd.h],
                ["min", cd.m],
                ["sec", cd.s],
              ].map(([label, value]) => (
                <div
                  key={label as string}
                  className="glass-card min-w-[4.2rem] rounded-2xl px-2.5 py-2.5 text-center border border-blush/20 shadow-md"
                >
                  <p className="font-display text-2xl sm:text-3xl tabular-nums text-cream font-bold">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="font-body text-[10px] tracking-[0.2em] text-rosegold uppercase font-semibold">
                    {label as string}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3.5 font-body text-xs tracking-[0.22em] text-rosegold/80 uppercase font-medium">
              {content.months.countdownLabel}
            </p>
          </div>
        )}
      </Reveal>
    </Section>
  );
}
