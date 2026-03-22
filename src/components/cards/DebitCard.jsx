import { useState } from 'react'
import { maskCardNumber } from '@/utils/cardUtils'
import { CARD_STATUS } from '@/constants'
import Icon from '@/components/ui/Icon'

export default function DebitCard({ card }) {
  const [showNumber, setShowNumber] = useState(false)
  const isFrozen = card.status === CARD_STATUS.FROZEN
  const displayNumber = showNumber ? card.cardNumber : maskCardNumber(card.cardNumber)

  return (
    <div>
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setShowNumber((prev) => !prev)}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-aspire-green hover:opacity-80 transition-opacity"
        >
          <Icon name={showNumber ? 'eyeOff' : 'eye'} className="w-4 h-4" />
          {showNumber ? 'Hide' : 'Show'}
        </button>
      </div>

      <div
        className={`relative rounded-2xl p-4 sm:p-6 overflow-hidden select-none transition-all duration-300
          ${isFrozen ? 'bg-gray-400 opacity-70 grayscale' : 'bg-aspire-green'}`}
        style={{ minHeight: 180, minHeight: 'auto' }}
      >
        <div className="absolute -top-6 -right-6 w-28 sm:w-36 h-28 sm:h-36 rounded-full bg-white/10 pointer-events-none" />
        <div className="absolute -bottom-6 sm:-bottom-8 -right-2 w-20 sm:w-28 h-20 sm:h-28 rounded-full bg-white/10 pointer-events-none" />

        {isFrozen && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <span className="bg-black/30 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              Frozen
            </span>
          </div>
        )}

        <div className="flex justify-end mb-4 sm:mb-6 relative z-10">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-sm bg-white/30 flex items-center justify-center">
              <svg viewBox="0 0 32 32" className="w-3 h-3" fill="none">
                <path d="M16 4L4 10l12 6 12-6-12-6zM4 20l12 6 12-6M4 15l12 6 12-6"
                  stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-white text-sm font-bold">aspire</span>
          </div>
        </div>

        <p className="text-white text-base sm:text-lg font-bold mb-3 sm:mb-5 relative z-10">
          {card.cardholderName}
        </p>

        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 relative z-10 font-mono">
          {displayNumber.split(' ').map((group, i) => (
            <span key={i} className="text-white text-xs sm:text-sm tracking-widest">{group}</span>
          ))}
        </div>

        <div className="flex gap-4 sm:gap-6 relative z-10">
          <div className="text-white/80 text-xs">
            Thru: <span className="text-white font-semibold">{card.expiry}</span>
          </div>
          <div className="text-white/80 text-xs">
            CVV: <span className="text-white font-semibold">{showNumber ? card.cvv : '•••'}</span>
          </div>
        </div>

        <div className="absolute bottom-4 sm:bottom-5 right-4 sm:right-6 z-10">
          <span className="text-white text-xl sm:text-2xl font-black italic">VISA</span>
        </div>
      </div>
    </div>
  )
}
