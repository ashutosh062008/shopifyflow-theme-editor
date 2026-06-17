import React, { useContext } from 'react'
import TemplateRepairKit from './TemplateRepairKit'
import SectionRenderer from './SectionRenderer'
import DesignContext from '../context/DesignContext'

export default function DraggableSection({ section, index, isSelected, isDragging, dragHandlers }) {
  const ctx = useContext(DesignContext)
  const { selectedSectionId, removeSection, selectSection, resetSectionStyles, sectionMeta } = ctx
  const meta = (sectionMeta && sectionMeta[section.type]) || {}

  const handleClick = (e) => {
    e.stopPropagation()
    selectSection(section.id)
  }

  const widthPct = section?.styles?.width || 100

  return (
    <div
      className={`draggable-section ${isSelected ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
      style={{ flex: `0 0 ${widthPct}%`, maxWidth: `${widthPct}%` }}
      draggable
      onClick={handleClick}
      onDragStart={(e) => dragHandlers?.onDragStart?.(e, index)}
      onDragOver={(e) => dragHandlers?.onDragOver?.(e, index)}
      onDrop={(e) => dragHandlers?.onDrop?.(e, index)}
    >
      <div className="section-label">{meta.icon} {meta.label}</div>
      <div className="section-toolbar">
        <span className="toolbar-btn drag-handle" title="Drag to reorder">⠿</span>
        <button
          className="toolbar-btn delete-btn"
          title="Delete section"
          onClick={(e) => { e.stopPropagation(); removeSection(section.id); }}
        >
          ✕
        </button>
        <button
          className="toolbar-btn"
          title="Reset styles"
          onClick={(e) => { e.stopPropagation(); resetSectionStyles(section.id); }}
        >
          ↺
        </button>
      </div>
      <div className="section-block">
        <TemplateRepairKit onRepair={() => resetSectionStyles(section.id)}>
          <SectionRenderer section={section} />
        </TemplateRepairKit>
      </div>
    </div>
  )
}
