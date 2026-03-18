import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import { CardProvider, useCards } from '@/context/CardContext'

const mockCards = [
  {
    id: '1',
    cardholderName: 'John Doe',
    cardNumber: '1234567890123456',
    expiry: '12/25',
    cvv: '123',
    status: 'active',
  },
]

vi.mock('@/api/cardsApi', () => ({
  fetchCards: vi.fn(() => Promise.resolve(mockCards)),
  addCard: vi.fn((name) => Promise.resolve({ id: '2', cardholderName: name })),
  toggleFreezeCard: vi.fn((id) => Promise.resolve({ ...mockCards[0], id, status: 'frozen' })),
}))

function TestComponent() {
  const { cards, activeCard, loading, addCard, setActiveCard } = useCards()
  return (
    <div>
      <span data-testid="loading">{loading ? 'true' : 'false'}</span>
      <span data-testid="cards-length">{cards.length}</span>
      <span data-testid="active-card">{activeCard?.cardholderName || 'none'}</span>
      <button data-testid="add-btn" onClick={() => addCard('New Card')}>Add</button>
      <button data-testid="set-active-btn" onClick={() => setActiveCard('1')}>Set Active</button>
    </div>
  )
}

describe('CardContext', () => {
  it('provides initial loading state as true', async () => {
    render(
      <CardProvider>
        <TestComponent />
      </CardProvider>
    )
    expect(screen.getByTestId('loading')).toHaveTextContent('true')
  })

  it('loads cards and sets active card', async () => {
    render(
      <CardProvider>
        <TestComponent />
      </CardProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false')
    })
    expect(screen.getByTestId('cards-length')).toHaveTextContent('1')
    expect(screen.getByTestId('active-card')).toHaveTextContent('John Doe')
  })

  it('adds a new card', async () => {
    render(
      <CardProvider>
        <TestComponent />
      </CardProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('cards-length')).toHaveTextContent('1')
    })
    
    fireEvent.click(screen.getByTestId('add-btn'))
    
    await waitFor(() => {
      expect(screen.getByTestId('cards-length')).toHaveTextContent('2')
    })
  })

  it('sets active card', async () => {
    render(
      <CardProvider>
        <TestComponent />
      </CardProvider>
    )
    
    await waitFor(() => {
      expect(screen.getByTestId('cards-length')).toHaveTextContent('1')
    })
    
    fireEvent.click(screen.getByTestId('set-active-btn'))
    expect(screen.getByTestId('active-card')).toHaveTextContent('John Doe')
  })

  it('throws error when useCards is used outside provider', () => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    expect(() => render(<TestComponent />)).toThrow('useCards must be used inside <CardProvider>')
    consoleError.mockRestore()
  })
})
