import React, { useContext } from 'react'
import DesignContext from '../context/DesignContext'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

export default function SidebarSectionItem({ section }) {
  const { selectedSectionId, selectSection, removeSection, sectionMeta } = useContext(DesignContext)
  const meta = (sectionMeta && sectionMeta[section.type]) || {}

  const isSelected = selectedSectionId === section.id

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id: section.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 'auto',
  }

  const handleClick = (e) => {
    e.stopPropagation()
    selectSection(section.id)
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`sidebar-section-item ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      onClick={handleClick}
    >
      <span 
        className="drag-handle-sidebar"
        title="Drag to reorder"
        {...attributes}
        {...listeners}
      >
        ⠿
      </span>
      <span className="section-icon">{meta.icon}</span>
      <span className="section-name">{meta.label}</span>
      <button 
        className="sidebar-delete-btn"
        title="Delete section"
        onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
      >
        ✕
      </button>
    </div>
  )
}

