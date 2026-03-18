import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useCards } from '@/context/CardContext'

export default function AddCardModal({ isOpen, onClose }) {
  const { addCard } = useCards()
  const [cardholderName, setCardholderName] = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const validate = (value) => {
    if (!value.trim()) return 'Cardholder name is required.'
    if (value.trim().length < 2) return 'Name must be at least 2 characters.'
    if (value.trim().length > 50) return 'Name must be under 50 characters.'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validate(cardholderName)
    if (validationError) { setError(validationError); return }
    setLoading(true)
    try {
      await addCard(cardholderName.trim())
      setCardholderName('')
      setError('')
      onClose()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setCardholderName('')
    setError('')
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Add new card">
      <p className="text-sm text-gray-500 mb-5">
        Enter the cardholder name. Card number and expiry will be auto-generated.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-6">
          <Input
            id="cardholderName"
            label="Cardholder name"
            placeholder="e.g. Jane Smith"
            value={cardholderName}
            onChange={(e) => {
              setCardholderName(e.target.value)
              if (error) setError(validate(e.target.value))
            }}
            error={error}
            autoFocus
            maxLength={50}
          />
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={handleClose} disabled={loading}>Cancel</Button>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? 'Adding…' : 'Add card'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
