import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from '@/components/ui/Badge'

describe('Badge', () => {
  it('renders with children', () => {
    render(<Badge>Active</Badge>)
    expect(screen.getByText(/active/i)).toBeInTheDocument()
  })

  it('renders with default gray variant', () => {
    render(<Badge>Status</Badge>)
    const badge = screen.getByText(/status/i)
    expect(badge).toHaveClass('bg-gray-100')
    expect(badge).toHaveClass('text-gray-600')
  })

  it('renders with green variant', () => {
    render(<Badge variant="green">Success</Badge>)
    const badge = screen.getByText(/success/i)
    expect(badge).toHaveClass('bg-green-100')
    expect(badge).toHaveClass('text-green-700')
  })

  it('renders with blue variant', () => {
    render(<Badge variant="blue">Info</Badge>)
    const badge = screen.getByText(/info/i)
    expect(badge).toHaveClass('bg-blue-100')
    expect(badge).toHaveClass('text-blue-700')
  })

  it('renders with red variant', () => {
    render(<Badge variant="red">Error</Badge>)
    const badge = screen.getByText(/error/i)
    expect(badge).toHaveClass('bg-red-100')
    expect(badge).toHaveClass('text-red-700')
  })

  it('renders with yellow variant', () => {
    render(<Badge variant="yellow">Warning</Badge>)
    const badge = screen.getByText(/warning/i)
    expect(badge).toHaveClass('bg-yellow-100')
    expect(badge).toHaveClass('text-yellow-700')
  })

  it('applies custom className', () => {
    render(<Badge className="custom-badge">Badge</Badge>)
    const badge = screen.getByText(/badge/i)
    expect(badge).toHaveClass('custom-badge')
  })
})
