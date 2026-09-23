import type { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-[1px]">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 cursor-default"
        tabIndex={-1}
      />
      <div className="relative w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        {children}
      </div>
    </div>
  );
}
