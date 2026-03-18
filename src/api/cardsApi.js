import { createCard } from '@/utils/cardUtils'
import { LOCAL_STORAGE_KEY, CARD_STATUS } from '@/constants'

const SEED_CARDS = [
  {
    id: '1',
    cardholderName: 'Mark Henry',
    cardNumber: '4242 4242 4242 4242',
    expiry: '12/25',
    cvv: '123',
    status: CARD_STATUS.ACTIVE,
    createdAt: '2024-01-01T00:00:00.000Z',
  },
  {
    id: '2',
    cardholderName: 'Sarah Johnson',
    cardNumber: '5555 5555 5555 4444',
    expiry: '09/26',
    cvv: '456',
    status: CARD_STATUS.ACTIVE,
    createdAt: '2024-03-15T00:00:00.000Z',
  },
]

const delay = (ms = 150) => new Promise((res) => setTimeout(res, ms))

function readStorage() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function writeStorage(cards) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cards))
}

export async function fetchCards() {
  await delay()
  const stored = readStorage()
  if (stored) return stored
  writeStorage(SEED_CARDS)
  return SEED_CARDS
}

export async function addCard(cardholderName) {
  await delay()
  const cards = readStorage() ?? []
  const newCard = createCard(cardholderName)
  const updated = [...cards, newCard]
  writeStorage(updated)
  return newCard
}

export async function toggleFreezeCard(cardId) {
  await delay()
  const cards = readStorage() ?? []
  const updated = cards.map((card) =>
    card.id === cardId
      ? {
          ...card,
          status:
            card.status === CARD_STATUS.FROZEN
              ? CARD_STATUS.ACTIVE
              : CARD_STATUS.FROZEN,
        }
      : card
  )
  writeStorage(updated)
  return updated.find((c) => c.id === cardId)
}

export async function fetchTransactions() {
  await delay()
  return [
    {
      id: 't1',
      merchant: 'Hamleys',
      date: '20 May 2024',
      amount: 150,
      type: 'refund',
      label: 'Refund on debit card',
      icon: 'shopping',
    },
    {
      id: 't2',
      merchant: 'Hamleys',
      date: '20 May 2024',
      amount: -150,
      type: 'debit',
      label: 'Charged to debit card',
      icon: 'plane',
    },
    {
      id: 't3',
      merchant: 'Hamleys',
      date: '20 May 2024',
      amount: -150,
      type: 'debit',
      label: 'Charged to debit card',
      icon: 'shopping',
    },
  ]
}
