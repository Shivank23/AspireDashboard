import { useCards } from '@/context/CardContext'
import DebitCard from './DebitCard'
import Icon from '@/components/ui/Icon'

export default function CardCarousel() {
  const { cards, activeCardId, setActiveCard } = useCards()
  const activeIndex = cards.findIndex((c) => c.id === activeCardId)

  if (!cards.length) return null

  const goPrev = () => {
    const prevIndex = (activeIndex - 1 + cards.length) % cards.length
    setActiveCard(cards[prevIndex].id)
  }

  const goNext = () => {
    const nextIndex = (activeIndex + 1) % cards.length
    setActiveCard(cards[nextIndex].id)
  }

  return (
    <div>
      <div className="relative px-2">
        {cards.length > 1 && (
          <>
            <button
              onClick={goPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Previous card"
            >
              <Icon name="chevronLeft" className="w-4 h-4 text-gray-600" />
            </button>
            <button
              onClick={goNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
              aria-label="Next card"
            >
              <Icon name="chevronRight" className="w-4 h-4 text-gray-600" />
            </button>
          </>
        )}
        <DebitCard card={cards[activeIndex]} />
      </div>

      {cards.length > 1 && (
        <div className="flex justify-center gap-2 mt-3">
          {cards.map((card, i) => (
            <button
              key={card.id}
              onClick={() => setActiveCard(card.id)}
              aria-label={`Go to card ${i + 1}`}
              className={`transition-all duration-200 rounded-full
                ${card.id === activeCardId
                  ? 'w-4 h-2 bg-aspire-green'
                  : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
