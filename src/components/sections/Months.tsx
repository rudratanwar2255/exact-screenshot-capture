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
    const n = reduced ? 400 : 900;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const t = Math.random() * Math.PI * 2;
      const r = 0.55 + Math.random() * 0.45;
      const x = 16 * Math.sin(t) ** 3;
      const y =
        13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
      arr[i * 3] = (x / 16) * r * 1.5;
      arr[i * 3 + 1] = (y / 16) * r * 1.5;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
    }
    return arr;
  }, [reduced]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    const s = reduced ? 1 : 1 + Math.sin(t * 1.6) * 0.05;
    ref.current.scale.setScalar(s);
    if (!reduced) ref.current.rotation.y = Math.sin(t * 0.3) * 0.35;
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
        size={0.035}
        color="#9be3d8"
        transparent
        opacity={0.95}
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
    d: Math.floor(diff / 86400000),
    h: Math.floor((diff / 3600000) % 24),
    m: Math.floor((diff / 60000) % 60),
    s: Math.floor((diff / 1000) % 60),
  };
}

export function Months() {
  const reduced = useReducedMotion();
  const cd = useCountdown(content.milestone);
  const [days, setDays] = useState(0);

  useEffect(() => {
    const total = Math.max(
      0,
      Math.floor(
        (Date.now() - new Date(content.coupleDate).getTime()) / 86400000,
      ),
    );
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1400);
      setDays(Math.round(total * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <Section>
      <SectionTitle>{content.months.title}</SectionTitle>

      <div className="h-56 w-56">
        <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 3.2], fov: 50 }}>
          <ParticleHeart reduced={reduced} />
        </Canvas>
      </div>

      <Reveal delay={0.15}>
        <p className="mt-4 text-center font-display text-xl text-cream">
          <span className="gold-text">{content.milestoneLabel}</span> •{" "}
          <span className="gold-text tabular-nums">{days}</span> days •{" "}
          {content.months.smiles}
        </p>
      </Reveal>

      <Reveal delay={0.3} className="mt-8">
        {cd.done ? (
          <motion.p
            animate={{ scale: [1, 1.04, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-glow text-center font-script text-3xl text-blush"
          >
            {content.months.celebrate}
          </motion.p>
        ) : (
          <div className="text-center">
            <div className="flex gap-3">
              {[
                ["days", cd.d],
                ["hrs", cd.h],
                ["min", cd.m],
                ["sec", cd.s],
              ].map(([label, value]) => (
                <div
                  key={label as string}
                  className="glass-card min-w-16 rounded-2xl px-3 py-2"
                >
                  <p className="font-display text-2xl tabular-nums text-cream">
                    {String(value).padStart(2, "0")}
                  </p>
                  <p className="font-body text-[10px] tracking-[0.2em] text-cream/55 uppercase">
                    {label as string}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-3 font-body text-xs tracking-[0.2em] text-cream/50 uppercase">
              {content.months.countdownLabel}
            </p>
          </div>
        )}
      </Reveal>
    </Section>
  );
}
