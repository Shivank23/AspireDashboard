import { useCards } from '@/context/CardContext'
import { CARD_STATUS } from '@/constants'
import Icon from '@/components/ui/Icon'

const ACTIONS = [
  { id: 'freeze',  icon: 'freeze',  baseLabel: 'Freeze card',     frozenLabel: 'Unfreeze card' },
  { id: 'spend',   icon: 'spend',   baseLabel: 'Set spend limit'  },
  { id: 'gpay',    icon: 'gpay',    baseLabel: 'Add to GPay'      },
  { id: 'replace', icon: 'replace', baseLabel: 'Replace card'     },
  { id: 'cancel',  icon: 'cancel',  baseLabel: 'Cancel card'      },
]

export default function CardActions() {
  const { activeCard, toggleFreezeCard } = useCards()
  if (!activeCard) return null

  const isFrozen = activeCard.status === CARD_STATUS.FROZEN

  const handleAction = (actionId) => {
    if (actionId === 'freeze') toggleFreezeCard(activeCard.id)
  }

  return (
    <div className="bg-aspire-blue-light rounded-2xl px-6 py-5 mt-4">
      <div className="grid grid-cols-5 gap-3">
        {ACTIONS.map((action) => {
          const label = action.id === 'freeze' && isFrozen ? action.frozenLabel : action.baseLabel
          const isActive = action.id === 'freeze' && isFrozen

          return (
            <button
              key={action.id}
              onClick={() => handleAction(action.id)}
              className="flex flex-col items-center gap-2 group"
              aria-label={label}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-150
                ${isActive ? 'bg-aspire-green' : 'bg-aspire-blue group-hover:bg-blue-700'}`}>
                {action.id === 'gpay'
                  ? <span className="text-white text-sm font-bold">G</span>
                  : <Icon name={action.icon} className="w-5 h-5 text-white" />
                }
              </div>
              <span className="text-xs text-center text-gray-600 leading-tight">{label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
