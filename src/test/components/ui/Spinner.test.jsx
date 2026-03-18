import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Spinner from '@/components/ui/Spinner'

describe('Spinner', () => {
  it('renders with default size', () => {
    const { container } = render(<Spinner />)
    const spinner = container.querySelector('svg')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('w-6 h-6')
  })

  it('renders with small size', () => {
    const { container } = render(<Spinner size="sm" />)
    const spinner = container.querySelector('svg')
    expect(spinner).toHaveClass('w-4 h-4')
  })

  it('renders with large size', () => {
    const { container } = render(<Spinner size="lg" />)
    const spinner = container.querySelector('svg')
    expect(spinner).toHaveClass('w-10 h-10')
  })

  it('has animate-spin class', () => {
    const { container } = render(<Spinner />)
    const spinner = container.querySelector('svg')
    expect(spinner).toHaveClass('animate-spin')
  })

  it('has aspire-blue color', () => {
    const { container } = render(<Spinner />)
    const spinner = container.querySelector('svg')
    expect(spinner).toHaveClass('text-aspire-blue')
  })

  it('applies custom className', () => {
    const { container } = render(<Spinner className="custom-spinner" />)
    const spinner = container.querySelector('svg')
    expect(spinner).toHaveClass('custom-spinner')
  })
})
