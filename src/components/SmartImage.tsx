import { useState } from "react";
import { usePhotoModal } from "@/components/PhotoModal";

export function SmartImage({
  name,
  alt,
  className = "",
  modalCaption,
  modalTitle,
  modalBadge,
  enableModal = true,
  onClick,
}: {
  name: string;
  alt: string;
  className?: string;
  modalCaption?: string;
  modalTitle?: string;
  modalBadge?: string;
  enableModal?: boolean;
  onClick?: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const { openPhoto } = usePhotoModal();

  const handleClick = () => {
    if (onClick) {
      onClick();
      return;
    }
    if (enableModal) {
      openPhoto({
        src: name,
        alt,
        title: modalTitle,
        caption: modalCaption || alt,
        badge: modalBadge,
      });
    }
  };

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

  const src = name.startsWith("/") || name.startsWith("http") ? name : `/images/${name}`;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onClick={handleClick}
      onError={() => setFailed(true)}
      className={`${className} ${enableModal ? "cursor-pointer transition-transform duration-200 hover:scale-[1.01]" : ""}`}
    />
  );
}
