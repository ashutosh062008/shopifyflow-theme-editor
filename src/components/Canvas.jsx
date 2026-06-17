import React, { useContext } from 'react'
import DesignContext from '../context/DesignContext'
import DraggableSection from './DraggableSection'
import useDragDrop from '../hooks/useDragDrop'

export default function Canvas() {
  const { sections, reorderSections, menuItems, activePage, setActivePage } = useContext(DesignContext)
  const { draggingIndex, handlers } = useDragDrop(reorderSections)

  return (
    <div>
      {menuItems && menuItems.length > 0 && ( 
        <nav className="live-navbar">
          {menuItems.map(item => (
            <a
              key={item.id}
              href={item.link}
              className={activePage === item.link ? 'active' : ''}
              onClick={e => { e.preventDefault(); setActivePage(item.link) }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
      {sections.length === 0 ? (
        <div className="canvas-placeholder">
          <span className="ph-icon">⊕</span>
          <span>Drag sections here or add one from the header</span>
        </div>
      ) : (
        <div className="canvas-sections-container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', alignContent: 'flex-start' }}>
          {sections.map((section, index) => (
            <DraggableSection
              key={section.id}
              section={section}
              index={index}
              isDragging={draggingIndex === index}
              dragHandlers={handlers}
            />
          ))}
        </div>
      )}
    </div>
  )
}
