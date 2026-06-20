import React, { useContext } from 'react'
import DesignContext from '../context/DesignContext'
import SectionRenderer from './SectionRenderer'
import TemplateRepairKit from './TemplateRepairKit'

export default function Canvas() {
  const { sections, menuItems, activePage, setActivePage, selectSection, selectedSectionId, resetSectionStyles, addSection, sectionMeta } = useContext(DesignContext)

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
          <span>No sections yet.</span>
          {sectionMeta && (
            <div style={{ marginTop: 12, display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {Object.keys(sectionMeta).map((type) => {
                const meta = sectionMeta[type] || {}
                return (
                  <button key={type} className="btn btn-small" onClick={() => addSection(type)} title={`Add ${meta.label || type}`}>
                    <span style={{ marginRight: 6 }}>{meta.icon}</span>
                    {meta.label || type}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      ) : (
        <div className="canvas-preview-container" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', alignContent: 'flex-start' }}>
          {sections.map((section) => {
            const widthPct = section?.styles?.width || 100
            const isSelected = selectedSectionId === section.id
            
            return (
              <div 
                key={section.id} 
                className={`preview-section-wrapper ${isSelected ? 'selected' : ''}`}
                style={{ flex: `0 0 ${widthPct}%`, maxWidth: `${widthPct}%`, position: 'relative' }}
                onClick={(e) => {
                  e.stopPropagation();
                  selectSection(section.id);
                }}
              >
                {isSelected && <div className="preview-section-overlay"></div>}
                <TemplateRepairKit onRepair={() => resetSectionStyles(section.id)}>
                  <SectionRenderer section={section} />
                </TemplateRepairKit>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}


