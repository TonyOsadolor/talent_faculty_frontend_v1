import React from 'react'
import { Download, Share2 } from 'lucide-react'
import type { Certificate } from '../../pages/student/Certificates'

interface CertificateRowProps {
  certificate: Certificate
  locked?: boolean
  onDownload?: (certificate: Certificate) => void
  onShare?: (certificate: Certificate) => void
}

const CertificateRow: React.FC<CertificateRowProps> = ({
  certificate,
  locked = false,
  onDownload,
  onShare,
}) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-4 border-b border-neutral-50 last:border-0">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="h-16 w-16 rounded-lg bg-neutral-100 flex-shrink-0 overflow-hidden">
          <img
            src={certificate.image_url || '/course-image.jpg'}
            alt={certificate.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <h4 className="text-sm font-semibold text-neutral-800 truncate">
            {certificate.title}
          </h4>

          <p className="text-xs text-neutral-400 mt-0.5">
            {certificate.instructor}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2.5 sm:flex-shrink-0">
        <button
          onClick={locked ? undefined : () => onDownload?.(certificate)}
          disabled={locked}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-xl transition-colors whitespace-nowrap ${
            locked
              ? 'bg-primary/30 text-white cursor-not-allowed'
              : 'bg-primary text-white hover:bg-primary-dark'
          }`}
        >
          <Download size={16} />
          Download Certificate
        </button>

        <button
          onClick={locked ? undefined : () => onShare?.(certificate)}
          disabled={locked}
          className={`flex items-center justify-center gap-2 px-4 py-2.5 border text-sm font-semibold rounded-xl transition-colors whitespace-nowrap ${
            locked
              ? 'border-neutral-200 text-neutral-300 cursor-not-allowed'
              : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
          }`}
        >
          <Share2 size={16} />
          Share Certificate
        </button>
      </div>
    </div>
  )
}

export default CertificateRow
