import { useState } from "react";
import Modal from "./Modal";
import type { Cohort, Track } from "../../types";

interface TrackSelectionModalProps {
  isOpen: boolean;
  cohort: Cohort | null;
  tracks: Track[];
  onCancel: () => void;
  onContinue: (track: Track) => void;
}

export default function TrackSelectionModal({
  isOpen,
  cohort,
  tracks,
  onCancel,
  onContinue,
}: TrackSelectionModalProps) {
  const [selectedTrackId, setSelectedTrackId] = useState(tracks[0]?.id ?? "");

  if (!cohort) return null;
  const selectedTrack = tracks.find((t) => t.id === selectedTrackId) ?? tracks[0];

  return (
    <Modal isOpen={isOpen} onClose={onCancel}>
      <h2 className="text-center text-2xl font-extrabold text-slate-900">
        Choose Your Learning Track
      </h2>
      <p className="mt-3 text-center text-sm text-slate-500">
        Select a track you&apos;d like to pursue in{" "}
        <span className="font-semibold text-primary">{cohort.name.replace(" Cohort", " cohort")}</span>.
        <br />
        You can only enroll in one track per cohort.
      </p>

      <div className="mt-6">
        <label className="mb-2 block text-sm font-semibold text-slate-800">Select a track</label>
        <select
          value={selectedTrackId}
          onChange={(e) => setSelectedTrackId(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {tracks.map((track) => (
            <option key={track.id} value={track.id}>
              {track.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8 flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-800 hover:bg-slate-50"
        >
          Cancel
        </button>
        <button
          onClick={() => selectedTrack && onContinue(selectedTrack)}
          className="flex-1 rounded-xl bg-primary py-3 text-sm font-bold text-white hover:bg-primary"
        >
          Continue
        </button>
      </div>
    </Modal>
  );
}
