import type { ReactNode } from "react";

export function VideoFrame({ format, children, className = "" }: {
  format: "16:9" | "9:16";
  children: ReactNode;
  className?: string;
}) {
  const aspect = format === "9:16"
    ? "mx-auto aspect-[9/16] w-[min(100%,34.875dvh)]"
    : "aspect-video w-full";

  return (
    <div className={`relative overflow-hidden rounded-xl bg-black ${aspect} ${className}`}>
      {children}
    </div>
  );
}
