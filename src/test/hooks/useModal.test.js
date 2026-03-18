import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useModal } from '@/hooks/useModal'

describe('useModal', () => {
  it('initializes with isOpen as false', () => {
    const { result } = renderHook(() => useModal())
    expect(result.current.isOpen).toBe(false)
  })

  it('opens modal with open function', () => {
    const { result } = renderHook(() => useModal())
    
    act(() => {
      result.current.open()
    })
    
    expect(result.current.isOpen).toBe(true)
  })

  it('closes modal with close function', () => {
    const { result } = renderHook(() => useModal())
    
    act(() => {
      result.current.open()
    })
    expect(result.current.isOpen).toBe(true)
    
    act(() => {
      result.current.close()
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('toggles modal with toggle function', () => {
    const { result } = renderHook(() => useModal())
    
    expect(result.current.isOpen).toBe(false)
    
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isOpen).toBe(true)
    
    act(() => {
      result.current.toggle()
    })
    expect(result.current.isOpen).toBe(false)
  })

  it('returns all required functions', () => {
    const { result } = renderHook(() => useModal())
    
    expect(result.current.isOpen).toBe(false)
    expect(typeof result.current.open).toBe('function')
    expect(typeof result.current.close).toBe('function')
    expect(typeof result.current.toggle).toBe('function')
  })
})
