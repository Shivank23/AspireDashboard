import { useCards } from '@/context/CardContext'
import { CARD_STATUS } from '@/constants'
import Badge from '@/components/ui/Badge'

export default function CardDetails() {
  const { activeCard } = useCards()
  if (!activeCard) return null

  const isFrozen = activeCard.status === CARD_STATUS.FROZEN

  return (
    <div className="grid grid-cols-2 gap-y-4 gap-x-6 pt-4 text-sm">
      <div>
        <p className="text-gray-400 text-xs mb-1">Card type</p>
        <p className="font-semibold text-gray-800">Visa Debit</p>
      </div>
      <div>
        <p className="text-gray-400 text-xs mb-1">Status</p>
        <Badge variant={isFrozen ? 'yellow' : 'green'}>
          {isFrozen ? 'Frozen' : 'Active'}
        </Badge>
      </div>
      <div>
        <p className="text-gray-400 text-xs mb-1">Cardholder</p>
        <p className="font-semibold text-gray-800">{activeCard.cardholderName}</p>
      </div>
      <div>
        <p className="text-gray-400 text-xs mb-1">Expiry</p>
        <p className="font-semibold text-gray-800">{activeCard.expiry}</p>
      </div>
      <div>
        <p className="text-gray-400 text-xs mb-1">Spend limit</p>
        <p className="font-semibold text-gray-800">No limit set</p>
      </div>
      <div>
        <p className="text-gray-400 text-xs mb-1">Issued</p>
        <p className="font-semibold text-gray-800">
          {new Date(activeCard.createdAt).toLocaleDateString('en-SG', {
            day: '2-digit', month: 'short', year: 'numeric',
          })}
        </p>
      </div>
    </div>
  )
}
