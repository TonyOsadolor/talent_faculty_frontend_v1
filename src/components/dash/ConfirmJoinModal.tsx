import Modal from "./Modal";
import type { Cohort, Track } from "../../types";

interface ConfirmJoinModalProps {
  isOpen: boolean;
  cohort: Cohort | null;
  track: Track | null;
  onGoBack: () => void;
  onConfirm: () => void;
}

export default function ConfirmJoinModal({
  isOpen,
  cohort,
  track,
  onGoBack,
  onConfirm,
}: ConfirmJoinModalProps) {
  if (!cohort || !track) return null;
  const cohortRange = cohort.name.replace(" Cohort", "");

  return (
    <Modal isOpen={isOpen} onClose={onGoBack}>
      <h2 className="text-center text-2xl font-extrabold text-slate-900">Ready to Join Cohort?</h2>
      <p className="mt-3 text-center text-sm text-slate-500">
        You&apos;re about to join the <span className="font-semibold text-primary">{cohortRange} cohort</span>{" "}
        under the {track.name} track.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-y-5">
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400">COHORT</p>
          <p className="mt-1 font-bold text-slate-900">{cohortRange}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400">LEARNING MODE</p>
          <p className="mt-1 font-bold text-slate-900">Online</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400">TRACK</p>
          <p className="mt-1 font-bold text-slate-900">{track.name}</p>
        </div>
        <div>
          <p className="text-xs font-semibold tracking-wide text-slate-400">DURATION</p>
          <p className="mt-1 font-bold text-slate-900">3 Months</p>
        </div>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={onGoBack}
          className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
        >
          Go Back
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary"
        >
          Join Cohort
        </button>
      </div>
    </Modal>
  );
}
