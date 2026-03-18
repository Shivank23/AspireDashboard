import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Input from '@/components/ui/Input'

describe('Input', () => {
  it('renders without label', () => {
    render(<Input placeholder="Enter text" />)
    const input = screen.getByPlaceholderText(/enter text/i)
    expect(input).toBeInTheDocument()
  })

  it('renders with label', () => {
    render(<Input label="Email" id="email" />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })

  it('displays error message when error prop is provided', () => {
    render(<Input error="This field is required" />)
    expect(screen.getByText(/this field is required/i)).toBeInTheDocument()
  })

  it('applies error styling when error prop is provided', () => {
    render(<Input error="Error message" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('border-red-400')
    expect(input).toHaveClass('bg-red-50')
  })

  it('handles input changes', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} />)
    
    const input = screen.getByRole('textbox')
    fireEvent.change(input, { target: { value: 'test value' } })
    expect(handleChange).toHaveBeenCalled()
  })

  it('applies custom className', () => {
    render(<Input className="custom-input-class" />)
    const input = screen.getByRole('textbox')
    expect(input).toHaveClass('custom-input-class')
  })

  it('associates label with input via id', () => {
    render(<Input label="Username" id="username" />)
    const label = screen.getByLabelText(/username/i)
    const input = screen.getByRole('textbox')
    // Check that input has the id
    expect(input.id).toBe('username')
    // Check that the label is associated (getByLabelText already verifies this)
    expect(label).toBeInTheDocument()
  })
})
