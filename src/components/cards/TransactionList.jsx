import { useTransactions } from '@/hooks/useTransactions'
import { formatCurrency } from '@/utils/cardUtils'
import Icon from '@/components/ui/Icon'
import Spinner from '@/components/ui/Spinner'

const ICON_STYLES = {
  plane:    { bg: 'bg-blue-100',  text: 'text-blue-500' },
  shopping: { bg: 'bg-red-100',   text: 'text-red-400'  },
  default:  { bg: 'bg-gray-100',  text: 'text-gray-500' },
}

function TransactionRow({ tx }) {
  const isPositive = tx.amount > 0
  const style = ICON_STYLES[tx.icon] ?? ICON_STYLES.default

  return (
    <div className="flex items-center justify-between py-3.5 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${style.bg}`}>
          <Icon name={tx.icon} className={`w-5 h-5 ${style.text}`} />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{tx.merchant}</p>
          <p className="text-xs text-gray-400 mt-0.5">{tx.date}</p>
          <div className="flex items-center gap-1 mt-1">
            <div className="w-4 h-4 rounded-full bg-aspire-blue flex items-center justify-center">
              <Icon name="cards" className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="text-xs text-aspire-blue font-medium">{tx.label}</span>
          </div>
        </div>
      </div>
      <span className={`text-sm font-bold ${isPositive ? 'text-aspire-green' : 'text-gray-800'}`}>
        {isPositive ? '+ ' : '- '}{formatCurrency(Math.abs(tx.amount))}
      </span>
    </div>
  )
}

export default function TransactionList() {
  const { transactions, loading } = useTransactions()

  if (loading) {
    return <div className="flex justify-center py-6"><Spinner size="md" /></div>
  }

  if (!transactions.length) {
    return <p className="text-sm text-gray-400 text-center py-6">No transactions yet.</p>
  }

  return (
    <div>
      {transactions.map((tx) => <TransactionRow key={tx.id} tx={tx} />)}
      <button className="w-full text-center text-sm text-aspire-green font-semibold py-3 hover:opacity-70 transition-opacity">
        View all card transactions
      </button>
    </div>
  )
}
