import Modal from "./Modal";

interface SuccessModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  ctaLabel: string;
  onCta: () => void;
}

export default function SuccessModal({ isOpen, title, message, ctaLabel, onCta }: SuccessModalProps) {
  return (
    <Modal isOpen={isOpen}>
      <h2 className="text-center text-2xl font-extrabold text-slate-900">{title}</h2>
      <p className="mt-3 text-center text-sm text-slate-500">{message}</p>

      <button
        onClick={onCta}
        className="mt-8 w-full rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary"
      >
        {ctaLabel}
      </button>
    </Modal>
  );
}
