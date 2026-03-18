import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Accordion from '@/components/ui/Accordion'

describe('Accordion', () => {
  it('renders with title', () => {
    render(<Accordion title="Test Accordion">Content</Accordion>)
    expect(screen.getByText(/test accordion/i)).toBeInTheDocument()
  })

  it('is closed by default', () => {
    render(<Accordion title="Test Accordion">Hidden Content</Accordion>)
    expect(screen.queryByText(/hidden content/i)).not.toBeInTheDocument()
  })

  it('opens when clicked', () => {
    render(<Accordion title="Test Accordion">Visible Content</Accordion>)
    
    fireEvent.click(screen.getByText(/test accordion/i))
    expect(screen.getByText(/visible content/i)).toBeInTheDocument()
  })

  it('toggles open/close state', () => {
    render(<Accordion title="Test Accordion">Content</Accordion>)
    
    const button = screen.getByText(/test accordion/i)
    fireEvent.click(button)
    expect(screen.getByText(/content/i)).toBeInTheDocument()
    
    fireEvent.click(button)
    expect(screen.queryByText(/content/i)).not.toBeInTheDocument()
  })

  it('starts open when defaultOpen is true', () => {
    render(<Accordion title="Test Accordion" defaultOpen={true}>Open Content</Accordion>)
    expect(screen.getByText(/open content/i)).toBeInTheDocument()
  })

  it('displays icon when provided', () => {
    render(<Accordion title="Test Accordion" icon={<span data-testid="icon">★</span>}>Content</Accordion>)
    expect(screen.getByTestId('icon')).toBeInTheDocument()
  })

  it('renders button element', () => {
    render(<Accordion title="Test Accordion">Content</Accordion>)
    const button = screen.getByRole('button', { name: /test accordion/i })
    expect(button).toBeInTheDocument()
  })
})
