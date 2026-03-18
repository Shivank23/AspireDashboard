import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import DebitCard from '@/components/cards/DebitCard'
import { CARD_STATUS } from '@/constants'

const mockCard = {
  id: '1',
  cardholderName: 'John Doe',
  cardNumber: '1234 5678 9012 3456',
  expiry: '12/25',
  cvv: '123',
  status: CARD_STATUS.ACTIVE,
}

describe('DebitCard', () => {
  it('renders cardholder name', () => {
    render(<DebitCard card={mockCard} />)
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('renders masked card number by default', () => {
    render(<DebitCard card={mockCard} />)
    // Check for masked groups (••••) - there should be multiple
    const maskedGroups = screen.getAllByText('••••')
    expect(maskedGroups.length).toBe(3)
    expect(screen.getByText('3456')).toBeInTheDocument()
  })

  it('shows full card number when show button is clicked', () => {
    render(<DebitCard card={mockCard} />)
    
    const showButton = screen.getByText(/show card number/i)
    fireEvent.click(showButton)
    
    expect(screen.getByText('1234')).toBeInTheDocument()
    expect(screen.getByText('5678')).toBeInTheDocument()
    expect(screen.getByText('9012')).toBeInTheDocument()
    expect(screen.getByText('3456')).toBeInTheDocument()
  })

  it('hides card number when hide button is clicked', () => {
    render(<DebitCard card={mockCard} />)
    
    const showButton = screen.getByText(/show card number/i)
    fireEvent.click(showButton)
    expect(screen.getByText('1234')).toBeInTheDocument()
    
    const hideButton = screen.getByText(/hide card number/i)
    fireEvent.click(hideButton)
    // Now should show masked groups again
    const maskedGroups = screen.getAllByText('••••')
    expect(maskedGroups.length).toBe(3)
  })

  it('displays expiry date', () => {
    render(<DebitCard card={mockCard} />)
    expect(screen.getByText('Thru:')).toBeInTheDocument()
    expect(screen.getByText('12/25')).toBeInTheDocument()
  })

  it('shows CVV when card number is shown', () => {
    render(<DebitCard card={mockCard} />)
    
    const showButton = screen.getByText(/show card number/i)
    fireEvent.click(showButton)
    
    expect(screen.getByText('123')).toBeInTheDocument()
  })

  it('hides CVV when card number is hidden', () => {
    render(<DebitCard card={mockCard} />)
    expect(screen.getByText('•••')).toBeInTheDocument()
  })

  it('renders frozen state correctly', () => {
    const frozenCard = { ...mockCard, status: CARD_STATUS.FROZEN }
    render(<DebitCard card={frozenCard} />)
    
    expect(screen.getByText('Frozen')).toBeInTheDocument()
  })

  it('does not show frozen badge for active card', () => {
    render(<DebitCard card={mockCard} />)
    expect(screen.queryByText('Frozen')).not.toBeInTheDocument()
  })

  it('renders aspire branding', () => {
    render(<DebitCard card={mockCard} />)
    expect(screen.getByText('aspire')).toBeInTheDocument()
    expect(screen.getByText('VISA')).toBeInTheDocument()
  })
})
