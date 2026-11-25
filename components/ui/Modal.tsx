"use client";

import { useEffect, useId, useRef, type MouseEvent, type ReactNode } from "react";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

/** Native modal dialog supplies focus trapping, Escape, and focus restoration. */
export function Modal({ open, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const lenis = useLenis();

  useEffect(() => {
    if (!open || !lenis) return;

    lenis.stop();
    return () => lenis.start();
  }, [lenis, open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const syncModalCursor = () => {
      document.documentElement.classList.toggle("modal-open", Boolean(document.querySelector("dialog[open]")));
    };

    if (open && !dialog.open) {
      dialog.showModal();
      syncModalCursor();
    }
    if (!open && dialog.open) {
      dialog.close();
      syncModalCursor();
    }

    return () => {
      if (dialog.open) {
        dialog.close();
        syncModalCursor();
      }
    };
  }, [open]);

  function onBackdropClick(event: MouseEvent<HTMLDialogElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      data-lenis-prevent
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={onBackdropClick}
      className={cn("w-[min(92vw,840px)] max-h-[88dvh] overflow-y-auto overscroll-y-contain rounded-card border border-white/15 bg-surface p-0 text-foreground shadow-2xl backdrop:bg-black/80 backdrop:backdrop-blur-sm", className)}
    >
      <div className="flex items-center justify-between gap-6 border-b border-stroke px-6 py-5 sm:px-8">
        <h2 id={titleId} className="font-display text-xl font-semibold sm:text-2xl">{title}</h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-secondary transition-colors hover:border-accent hover:text-accent"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
      <div className="px-6 py-6 sm:px-8 sm:py-8">{children}</div>
    </dialog>
  );
}
