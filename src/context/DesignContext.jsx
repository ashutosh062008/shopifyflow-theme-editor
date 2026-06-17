import React, { createContext, useReducer } from 'react'
import { defaultStyles } from '../utils/colorUtils'

export const DesignContext = createContext(null)

let idCounter = 1
function genId(prefix) {
  return `${prefix}-${idCounter++}-${Math.random().toString(36).slice(2, 6)}`
}

const sectionDefaults = {
  hero: { content: { heading: 'Welcome to the Store', sub: 'Big sales, every day.' } },
  gallery: { content: {} },
  textbox: { content: { text: 'Edit this text to describe your brand, products, or story. Use the sidebar to tweak font size, color, and width.' } },
  productGrid: { content: {} }
}

const sectionMeta = {
  hero: { label: 'Hero Banner', icon: '▢', color: '#7c5cff' },
  gallery: { label: 'Photo Gallery', icon: '▦', color: '#22d3c5' },
  textbox: { label: 'Text Box', icon: '▤', color: '#ffb86b' },
  productGrid: { label: 'Product Grid', icon: '▣', color: '#ff6b9d' }
}

const initialState = {
  pages: {
    '/': [
      {
        id: 'seed-hero',
        type: 'hero',
        content: sectionDefaults.hero.content,
        styles: { fontSize: 32, color: '#7c5cff', width: 68, padding: 56, borderRadius: 12, shadow: 0, opacity: 100, letterSpacing: 0, lineHeight: 1.5, textAlign: 'center', images: [] }
      },
      {
        id: 'seed-grid',
        type: 'productGrid',
        content: sectionDefaults.productGrid.content,
        styles: { fontSize: 14, color: '#11141d', width: 28, padding: 12, borderRadius: 10, shadow: 0, opacity: 100, letterSpacing: 0, lineHeight: 1.5, textAlign: 'left', images: [] }
      }
    ]
  },
  activePage: '/',
  selectedSectionId: null,
  menuItems: [
    { id: 'menu-1', label: 'Home', link: '/' },
    { id: 'menu-2', label: 'Shop', link: '/shop' },
    { id: 'menu-3', label: 'About', link: '/about' }
  ]
}

function reducer(state, action) {
  const currentSections = state.pages[state.activePage] || []

  switch (action.type) {
    case 'SET_ACTIVE_PAGE': {
      return { ...state, activePage: action.payload, selectedSectionId: null }
    }
    case 'ADD_SECTION': {
      const type = action.payload
      const newSection = {
        id: genId(type),
        type,
        content: sectionDefaults[type].content,
        styles: defaultStyles()
      }
      return { ...state, pages: { ...state.pages, [state.activePage]: [...currentSections, newSection] } }
    }
    case 'REMOVE_SECTION': {
      const id = action.payload
      return {
        ...state,
        pages: { ...state.pages, [state.activePage]: currentSections.filter(s => s.id !== id) },
        selectedSectionId: state.selectedSectionId === id ? null : state.selectedSectionId
      }
    }
    case 'UPDATE_SECTION_CONTENT': {
      const { id, content } = action.payload
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.activePage]: currentSections.map(s =>
            s.id === id ? { ...s, content: typeof content === 'string' ? { ...s.content, text: content } : { ...s.content, ...content } } : s
          )
        }
      }
    }
    case 'UPDATE_SECTION_STYLE': {
      const { id, key, value } = action.payload
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.activePage]: currentSections.map(s =>
            s.id === id ? { ...s, styles: { ...s.styles, [key]: value } } : s
          )
        }
      }
    }
    case 'REORDER_SECTIONS': {
      const { fromIndex, toIndex } = action.payload
      const updated = [...currentSections]
      const [moved] = updated.splice(fromIndex, 1)
      updated.splice(toIndex, 0, moved)
      return { ...state, pages: { ...state.pages, [state.activePage]: updated } }
    }
    case 'SELECT_SECTION': {
      return { ...state, selectedSectionId: action.payload }
    }
    case 'ADD_IMAGE_TO_SECTION': {
      const { sectionId, imageUrl } = action.payload
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.activePage]: currentSections.map(s =>
            s.id === sectionId
              ? { ...s, styles: { ...s.styles, images: [...(s.styles.images || []), imageUrl] } }
              : s
          )
        }
      }
    }
    case 'ADD_MENU_ITEM': {
      const { label, link } = action.payload
      return { ...state, menuItems: [...state.menuItems, { id: genId('menu'), label, link }] }
    }
    case 'REMOVE_MENU_ITEM': {
      return { ...state, menuItems: state.menuItems.filter(m => m.id !== action.payload) }
    }
    case 'RESET_SECTION_STYLES': {
      const id = action.payload
      return {
        ...state,
        pages: {
          ...state.pages,
          [state.activePage]: currentSections.map(s =>
            s.id === id ? { ...s, styles: defaultStyles() } : s
          )
        }
      }
    }
    default:
      return state
  }
}

export function DesignProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = {
    ...state,
    sections: state.pages[state.activePage] || [],
    setActivePage: (link) => dispatch({ type: 'SET_ACTIVE_PAGE', payload: link }),
    addSection: (type) => dispatch({ type: 'ADD_SECTION', payload: type }),
    removeSection: (id) => dispatch({ type: 'REMOVE_SECTION', payload: id }),
    updateSectionStyle: (id, key, val) => dispatch({ type: 'UPDATE_SECTION_STYLE', payload: { id, key, value: val } }),
    reorderSections: (fromIndex, toIndex) => dispatch({ type: 'REORDER_SECTIONS', payload: { fromIndex, toIndex } }),
    selectSection: (id) => dispatch({ type: 'SELECT_SECTION', payload: id }),
    updateSectionContent: (id, content) => dispatch({ type: 'UPDATE_SECTION_CONTENT', payload: { id, content } }),
    addImageToSection: (sectionId, imageUrl) => dispatch({ type: 'ADD_IMAGE_TO_SECTION', payload: { sectionId, imageUrl } }),
    addMenuItem: (label, link) => dispatch({ type: 'ADD_MENU_ITEM', payload: { label, link } }),
    removeMenuItem: (id) => dispatch({ type: 'REMOVE_MENU_ITEM', payload: id }),
    resetSectionStyles: (id) => dispatch({ type: 'RESET_SECTION_STYLES', payload: id }),
    sectionDefaults,
    sectionMeta
  }

  return <DesignContext.Provider value={value}>{children}</DesignContext.Provider>
}

export default DesignContext
