"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  className?: string;
  priority?: boolean;
};

export function ItemImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  className,
  priority,
}: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    const initial = alt.trim().charAt(0).toUpperCase() || "?";
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className ?? ""}`}
        aria-label={`${alt} (image unavailable)`}
      >
        <span className="text-3xl font-semibold">{initial}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      width={width}
      height={height}
      sizes={sizes}
      className={className}
      priority={priority}
      onError={() => setFailed(true)}
      unoptimized
    />
  );
}
