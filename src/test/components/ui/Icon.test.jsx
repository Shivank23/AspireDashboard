import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Icon from '@/components/ui/Icon'

describe('Icon', () => {
  it('renders home icon', () => {
    const { container } = render(<Icon name="home" />)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders cards icon', () => {
    const { container } = render(<Icon name="cards" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders payments icon', () => {
    const { container } = render(<Icon name="payments" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders credit icon', () => {
    const { container } = render(<Icon name="credit" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders settings icon', () => {
    const { container } = render(<Icon name="settings" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders eye icon', () => {
    const { container } = render(<Icon name="eye" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('renders with custom className', () => {
    const { container } = render(<Icon name="home" className="w-8 h-8" />)
    const span = container.querySelector('span')
    expect(span).toHaveClass('w-8 h-8')
  })

  it('returns null for unknown icon', () => {
    const { container } = render(<Icon name="unknown" />)
    expect(container.firstChild).toBeNull()
  })

  it('renders multiple icons correctly', () => {
    const { rerender, container } = render(<Icon name="home" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    
    rerender(<Icon name="cards" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
    
    rerender(<Icon name="eye" />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
})
