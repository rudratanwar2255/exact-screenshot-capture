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
  onItemClick?: (item: CircularCarouselItem, index: number) => void;
  className?: string;
}

export function CircularCarousel({
  items,
  bend = 0.88,
  depthFade = 0.6,
  fadeColor = "#0d0614",
  innerShade = 0.25,
  tilt = -4,
  perspective = 1300,
  radius = 340,
  itemWidth = 230,
  itemHeight = 330,
  onFocus,
  onItemClick,
  className = "",
}: CircularCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [responsiveRadius, setResponsiveRadius] = useState(radius);
  const [responsiveWidth, setResponsiveWidth] = useState(itemWidth);
  const [responsiveHeight, setResponsiveHeight] = useState(itemHeight);

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

  // Responsive sizing for mobile vs desktop
  useEffect(() => {
    const updateDimensions = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setResponsiveRadius(260);
        setResponsiveWidth(185);
        setResponsiveHeight(265);
      } else if (w < 1024) {
        setResponsiveRadius(320);
        setResponsiveWidth(215);
        setResponsiveHeight(305);
      } else {
        setResponsiveRadius(radius);
        setResponsiveWidth(itemWidth);
        setResponsiveHeight(itemHeight);
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [radius, itemWidth, itemHeight]);

  // Track active focused item
  const calculateFocus = useCallback(
    (currentRot: number) => {
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

  const focusItem = useCallback(
    (index: number) => {
      const targetAngle = -index * stepAngle;
      const start = rotation;
      let diff = (targetAngle - start) % (2 * Math.PI);
      if (diff > Math.PI) diff -= 2 * Math.PI;
      if (diff < -Math.PI) diff += 2 * Math.PI;

      const startTime = performance.now();
      const duration = 500;

      const animateFocus = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const ease = 1 - Math.pow(1 - progress, 3);
        const newAngle = start + diff * ease;
        setRotation(newAngle);

        if (progress < 1) {
          animationFrame.current = requestAnimationFrame(animateFocus);
        } else {
          setFocusedIndex(index);
          onFocus?.(index);
        }
      };
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      animationFrame.current = requestAnimationFrame(animateFocus);
    },
    [onFocus, rotation, stepAngle],
  );

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    startRot.current = rotation;
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    velocity.current = 0;
    if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    const newRot = startRot.current + deltaX * 0.004;
    setRotation(newRot);

    const now = performance.now();
    const dt = Math.max(1, now - lastTime.current);
    velocity.current = (e.clientX - lastX.current) / dt;
    lastX.current = e.clientX;
    lastTime.current = now;

    const newFocus = calculateFocus(newRot);
    if (newFocus !== focusedIndex) {
      setFocusedIndex(newFocus);
      onFocus?.(newFocus);
    }
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (Math.abs(velocity.current) > 0.25) {
      let currentVelocity = velocity.current * 0.015;
      const decay = 0.93;

      const animateInertia = () => {
        setRotation((prev) => {
          const next = prev + currentVelocity;
          const newFocus = calculateFocus(next);
          setFocusedIndex(newFocus);
          onFocus?.(newFocus);
          return next;
        });

        currentVelocity *= decay;
        if (Math.abs(currentVelocity) > 0.0005) {
          animationFrame.current = requestAnimationFrame(animateInertia);
        } else {
          snapToNearest(rotation);
        }
      };
      animationFrame.current = requestAnimationFrame(animateInertia);
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
        height: `${responsiveHeight + 110}px`,
        width: "100%",
        maxWidth: "100vw",
        overflow: "hidden",
      }}
    >
      {/* 3D Circular Orbit Ring Glow Floor */}
      <div 
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blush/20 shadow-[0_0_80px_rgba(251,164,184,0.15)]"
        style={{
          width: `${responsiveRadius * 2 + 60}px`,
          height: `${responsiveRadius * 2 + 60}px`,
          transform: `rotateX(${80 + tilt}deg) translateZ(-80px)`,
          transformStyle: "preserve-3d",
        }}
      />

      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${tilt}deg)`,
          width: `${responsiveWidth}px`,
          height: `${responsiveHeight}px`,
        }}
      >
        {items.map((item, idx) => {
          const angle = idx * stepAngle + rotation;
          const sin = Math.sin(angle);
          const cos = Math.cos(angle);

          const x = sin * responsiveRadius;
          const z = (cos - 1) * responsiveRadius;
          // Genuine circular curve tangent
          const rotY = -(angle * (180 / Math.PI)) * (reduced ? 0 : bend);

          // Depth fade calculation (1 when at front, fading towards back)
          const depthNorm = (cos + 1) / 2; // 0 to 1
          const opacity = 0.25 + depthNorm * 0.75;
          const scale = 0.82 + depthNorm * 0.24;
          const isCurrent = idx === focusedIndex;

          return (
            <div
              key={idx}
              onClick={(e) => {
                if (Math.abs(e.clientX - startX.current) < 18) {
                  focusItem(idx);
                  onItemClick?.(item, idx);
                }
              }}
              className="absolute left-0 top-0 transition-transform"
              style={{
                width: `${responsiveWidth}px`,
                height: `${responsiveHeight}px`,
                transform: `translate3d(${x}px, 0px, ${z}px) rotateY(${rotY}deg) scale(${scale})`,
                transformStyle: "preserve-3d",
                zIndex: Math.round(depthNorm * 100),
                opacity: Math.max(0.15, opacity),
                cursor: "pointer",
              }}
            >
              <div
                className={`group relative size-full overflow-hidden rounded-3xl p-3 transition-all duration-300 ${
                  isCurrent
                    ? "ring-2 ring-blush shadow-[0_0_45px_rgba(251,164,184,0.55)] border border-blush/80"
                    : "ring-1 ring-rosegold/30 border border-white/10 hover:ring-blush/60"
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

                {/* Highlight ring on hover */}
                <div
                  className={`pointer-events-none absolute inset-0 rounded-3xl border transition-opacity duration-300 ${
                    isCurrent
                      ? "border-blush/70 opacity-100"
                      : "border-transparent opacity-0 group-hover:opacity-60 group-hover:border-blush/40"
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
