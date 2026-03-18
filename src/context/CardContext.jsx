import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { fetchCards, addCard, toggleFreezeCard } from '@/api/cardsApi'

const ACTIONS = {
  SET_CARDS:    'SET_CARDS',
  ADD_CARD:     'ADD_CARD',
  UPDATE_CARD:  'UPDATE_CARD',
  SET_ACTIVE:   'SET_ACTIVE',
  SET_LOADING:  'SET_LOADING',
  SET_ERROR:    'SET_ERROR',
}

function cardReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload }
    case ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false }
    case ACTIONS.SET_CARDS:
      return {
        ...state,
        cards: action.payload,
        activeCardId: action.payload[0]?.id ?? null,
        loading: false,
      }
    case ACTIONS.ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, action.payload],
        activeCardId: action.payload.id,
      }
    case ACTIONS.UPDATE_CARD:
      return {
        ...state,
        cards: state.cards.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      }
    case ACTIONS.SET_ACTIVE:
      return { ...state, activeCardId: action.payload }
    default:
      return state
  }
}

const initialState = {
  cards: [],
  activeCardId: null,
  loading: true,
  error: null,
}

const CardContext = createContext(null)

export function CardProvider({ children }) {
  const [state, dispatch] = useReducer(cardReducer, initialState)

  useEffect(() => {
    dispatch({ type: ACTIONS.SET_LOADING, payload: true })
    fetchCards()
      .then((cards) => dispatch({ type: ACTIONS.SET_CARDS, payload: cards }))
      .catch((err) => dispatch({ type: ACTIONS.SET_ERROR, payload: err.message }))
  }, [])

  const handleAddCard = useCallback(async (cardholderName) => {
    const newCard = await addCard(cardholderName)
    dispatch({ type: ACTIONS.ADD_CARD, payload: newCard })
  }, [])

  const handleToggleFreeze = useCallback(async (cardId) => {
    const updatedCard = await toggleFreezeCard(cardId)
    dispatch({ type: ACTIONS.UPDATE_CARD, payload: updatedCard })
  }, [])

  const setActiveCard = useCallback((cardId) => {
    dispatch({ type: ACTIONS.SET_ACTIVE, payload: cardId })
  }, [])

  const activeCard = state.cards.find((c) => c.id === state.activeCardId) ?? null

  const value = {
    cards:            state.cards,
    activeCard,
    activeCardId:     state.activeCardId,
    loading:          state.loading,
    error:            state.error,
    addCard:          handleAddCard,
    toggleFreezeCard: handleToggleFreeze,
    setActiveCard,
  }

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>
}

export function useCards() {
  const ctx = useContext(CardContext)
  if (!ctx) throw new Error('useCards must be used inside <CardProvider>')
  return ctx
}
