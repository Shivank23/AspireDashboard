import { useState, useEffect } from 'react'
import { fetchTransactions } from '@/api/cardsApi'

export function useTransactions() {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading]           = useState(true)

  useEffect(() => {
    setLoading(true)
    fetchTransactions()
      .then(setTransactions)
      .finally(() => setLoading(false))
  }, [])

  return { transactions, loading }
}
