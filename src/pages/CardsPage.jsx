import { useState } from 'react'
import { useCards } from '@/context/CardContext'
import CardCarousel from '@/components/cards/CardCarousel'
import CardActions from '@/components/cards/CardActions'
import CardDetails from '@/components/cards/CardDetails'
import TransactionList from '@/components/cards/TransactionList'
import AddCardModal from '@/components/modals/AddCardModal'
import Accordion from '@/components/ui/Accordion'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import Spinner from '@/components/ui/Spinner'
import { useModal } from '@/hooks/useModal'

export default function CardsPage() {
  const { loading, error } = useCards()
  const { isOpen, open, close } = useModal()
  const [activeTab, setActiveTab] = useState('my')

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner size="lg" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-sm">
        Failed to load cards: {error}
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-6 md:py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
        <div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">
            Available balance
          </p>
          <div className="flex items-center gap-3">
            <span className="bg-aspire-green text-white text-xs font-bold px-2 py-0.5 rounded">
              S$
            </span>
            <span className="text-3xl md:text-4xl font-bold text-gray-900">3,000</span>
          </div>
        </div>
        <Button onClick={open} variant="primary" size="md" className="self-start sm:self-auto">
          <Icon name="plus" className="w-4 h-4" />
          <span className="hidden sm:inline">New card</span>
          <span className="sm:hidden">Add</span>
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 md:gap-8 border-b border-gray-200 mb-8 overflow-x-auto">
        {[
          { id: 'my',  label: 'My debit cards'    },
          { id: 'all', label: 'All company cards'  },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 text-sm font-semibold border-b-2 -mb-px transition-colors duration-150 whitespace-nowrap
              ${activeTab === tab.id
                ? 'border-aspire-green text-gray-900'
                : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Two-column layout - stacks on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div>
          <CardCarousel />
          <CardActions />
        </div>
        <div className="flex flex-col gap-3">
          <Accordion
            title="Card details"
            icon={<Icon name="cardDetail" className="w-5 h-5" />}
          >
            <CardDetails />
          </Accordion>
          <Accordion
            title="Recent transactions"
            icon={<Icon name="transactions" className="w-5 h-5" />}
            defaultOpen
          >
            <TransactionList />
          </Accordion>
        </div>
      </div>

      <AddCardModal isOpen={isOpen} onClose={close} />
    </div>
  )
}
