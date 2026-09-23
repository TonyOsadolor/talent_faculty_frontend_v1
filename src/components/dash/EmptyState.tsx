import { SearchNormal1 } from "iconsax-react";
import SearchingIllustration from "./SearchingIllustration";

interface EmptyStateProps {
  title: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
  footerNote: string;
}

export default function EmptyState({ title, description, ctaLabel, onCtaClick, footerNote }: EmptyStateProps) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">{title}</h2>
          <p className="mt-1 text-sm text-slate-500">
            {description || "Discover courses designed to help you build new skills and deepen your knowledge."}
          </p>
        </div>
        {ctaLabel && (
          <button
            onClick={onCtaClick}
            disabled={!onCtaClick}
            className={`flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-white transition-opacity ${!onCtaClick ? "cursor-default opacity-40" : "hover:bg-primary"}`}
          >
            <SearchNormal1 color="#ffffff" size={16} />
            {ctaLabel}
          </button>
        )}
      </div>

      <div className="mt-8 flex flex-col items-center justify-center py-6">
        <SearchingIllustration />

        <p className="mt-6 rounded-full bg-slate-100 px-5 py-2 text-sm text-slate-500">
          {footerNote}
        </p>
      </div>
    </section>
  );
}

