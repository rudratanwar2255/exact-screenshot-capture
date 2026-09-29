import { useState } from "react";

/**
 * Shows an image from /public/images/<name>.
 * Until the real photo is uploaded, it renders a soft dreamy placeholder
 * with the expected filename so you know which photo goes where.
 */
export function SmartImage({
  name,
  alt,
  className = "",
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`flex items-center justify-center bg-plum-glass text-center ${className}`}
      >
        <span className="px-3 font-body text-[11px] tracking-wide text-cream/50">
          {name}
        </span>
      </div>
    );
  }

  return (
    <img
      src={`/images/${name}`}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
