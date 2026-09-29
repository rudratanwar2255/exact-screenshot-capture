import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion-prefs";

export interface CircularCarouselItem {
  image: string;
  caption?: string;
  alt?: string;
  [key: string]: unknown;
}

export interface CircularCarouselProps {
  items: CircularCarouselItem[];
  bend?: number; // 0 to 1
  depthFade?: number; // 0 to 1
  fadeColor?: string;
  innerShade?: number;
  tilt?: number; // degrees
  perspective?: number; // px
  speed?: number;
  radius?: number;
  itemWidth?: number;
  itemHeight?: number;
  onFocus?: (index: number) => void;
  className?: string;
}

export function CircularCarousel({
  items,
  bend = 0.35,
  depthFade = 0.65,
  fadeColor = "#0d0614",
  innerShade = 0.3,
  tilt = -2,
  perspective = 1100,
  radius = 260,
  itemWidth = 200,
  itemHeight = 280,
  onFocus,
  className = "",
}: CircularCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startRot = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const total = items.length;
  const stepAngle = (2 * Math.PI) / total;

  // Track active focused item
  const calculateFocus = useCallback(
    (currentRot: number) => {
      // Normalize angle
      let normalized = (-currentRot) % (2 * Math.PI);
      if (normalized < 0) normalized += 2 * Math.PI;
      const index = Math.round(normalized / stepAngle) % total;
      return (index + total) % total;
    },
    [stepAngle, total],
  );

  const snapToNearest = useCallback(
    (currentRot: number) => {
      let norm = (-currentRot) % (2 * Math.PI);
      if (norm < 0) norm += 2 * Math.PI;
      const targetIndex = Math.round(norm / stepAngle);
      const targetAngle = -targetIndex * stepAngle;
      
      const start = currentRot;
      const change = targetAngle - (currentRot % (2 * Math.PI));
      const startTime = performance.now();
      const duration = 400;

      const animateSnap = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // easeOutCubic
        const ease = 1 - Math.pow(1 - progress, 3);
        const newAngle = start + change * ease;
        setRotation(newAngle);

        const newFocus = calculateFocus(newAngle);
        setFocusedIndex(newFocus);
        onFocus?.(newFocus);

        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(animateSnap);
        }
      };
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      animationFrame.current = requestAnimationFrame(animateSnap);
    },
    [calculateFocus, onFocus, stepAngle],
  );

  const focusItem = (index: number) => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    const targetAngle = -index * stepAngle;
    
    // Find shortest rotational path
    let diff = (targetAngle - rotation) % (2 * Math.PI);
    if (diff > Math.PI) diff -= 2 * Math.PI;
    if (diff < -Math.PI) diff += 2 * Math.PI;

    const start = rotation;
    const startTime = performance.now();
    const duration = 500;

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const p = Math.min(1, elapsed / duration);
      const ease = 1 - Math.pow(1 - p, 3);
      const newAngle = start + diff * ease;
      setRotation(newAngle);
      setFocusedIndex(index);
      onFocus?.(index);

      if (p < 1) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };
    animationFrame.current = requestAnimationFrame(animate);
  };

  // Drag & Touch gestures with momentum
  const onPointerDown = (e: React.PointerEvent) => {
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    isDragging.current = true;
    startX.current = e.clientX;
    lastX.current = e.clientX;
    startRot.current = rotation;
    lastTime.current = performance.now();
    velocity.current = 0;
    (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const now = performance.now();
    const dt = Math.max(1, now - lastTime.current);
    const dx = e.clientX - lastX.current;
    velocity.current = dx / dt;
    lastX.current = e.clientX;
    lastTime.current = now;

    const totalDx = e.clientX - startX.current;
    const angleDelta = (totalDx / 240) * 1.2;
    const newAngle = startRot.current + angleDelta;
    setRotation(newAngle);

    const active = calculateFocus(newAngle);
    if (active !== focusedIndex) {
      setFocusedIndex(active);
      onFocus?.(active);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    try {
      (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
    } catch {
      // ignore
    }

    const currentVel = velocity.current;
    if (Math.abs(currentVel) > 0.3) {
      let curAngle = rotation;
      let vel = currentVel * 0.035;
      const decay = () => {
        vel *= 0.92;
        curAngle += vel;
        setRotation(curAngle);
        setFocusedIndex(calculateFocus(curAngle));

        if (Math.abs(vel) > 0.001) {
          animationFrame.current = requestAnimationFrame(decay);
        } else {
          snapToNearest(curAngle);
        }
      };
      animationFrame.current = requestAnimationFrame(decay);
    } else {
      snapToNearest(rotation);
    }
  };

  useEffect(() => {
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className={`relative select-none touch-pan-y cursor-grab active:cursor-grabbing ${className}`}
      style={{
        perspective: `${perspective}px`,
        height: `${itemHeight + 80}px`,
        width: "100%",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt}deg)`,
          width: `${itemWidth}px`,
          height: `${itemHeight}px`,
        }}
      >
        {items.map((item, idx) => {
          const angle = idx * stepAngle + rotation;
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          const x = sin * radius;
          const z = (cos - 1) * radius;
          const rotY = -(angle * (180 / Math.PI)) * (reduced ? 0 : bend);

          // Depth fade calculation (1 when at front, fading towards back)
          const depthNorm = (cos + 1) / 2; // 0 to 1
          const opacity = 1 - (1 - depthNorm) * depthFade;
          const scale = 0.85 + depthNorm * 0.2;
          const isCurrent = idx === focusedIndex;

          return (
            <div
              key={idx}
              onClick={(e) => {
                // If it was a small tap rather than drag, focus on item
                if (Math.abs(e.clientX - startX.current) < 8) {
                  focusItem(idx);
                }
              }}
              className="absolute left-0 top-0 transition-transform"
              style={{
                width: `${itemWidth}px`,
                height: `${itemHeight}px`,
                transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                transformStyle: "preserve-3d",
                zIndex: Math.round(depthNorm * 100),
                opacity: Math.max(0.1, opacity),
                cursor: "pointer",
              }}
            >
              <div
                className={`group relative size-full overflow-hidden rounded-3xl p-2.5 transition-all duration-300 ${
                  isCurrent
                    ? "ring-2 ring-blush/80 shadow-[0_0_35px_rgba(251,164,184,0.4)]"
                    : "ring-1 ring-rosegold/20"
                } glass-card`}
              >
                <img
                  src={item.image.startsWith("/") ? item.image : `/images/${item.image}`}
                  alt={item.alt || item.caption || `Moment ${idx + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="size-full rounded-2xl object-cover pointer-events-none"
                />

                {/* Inner shade / Depth gradient overlay */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
                  style={{
                    backgroundColor: fadeColor,
                    opacity: (1 - depthNorm) * innerShade,
                  }}
                />

                {/* Romantic glowing border highlight on hover/focus */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-3xl border transition-opacity duration-300 ${
                    isCurrent
                      ? "border-blush/60 opacity-100"
                      : "border-transparent opacity-0 group-hover:opacity-40"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
