import React, { useState, useContext } from 'react'
import DesignContext from '../context/DesignContext'

export default function Header({ previewMode, setPreviewMode }) {
  const { addSection, sectionMeta } = useContext(DesignContext)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const sectionTypes = [
    { type: 'hero', ...sectionMeta.hero },
    { type: 'gallery', ...sectionMeta.gallery },
    { type: 'textbox', ...sectionMeta.textbox },
    { type: 'productGrid', ...sectionMeta.productGrid }
  ]

  return (  
    <header className="app-header">
      <div className="app-title">
        <span className="mark">SF</span>
        ShopifyFlow
        <span className="sub">theme editor</span>
      </div>
      <div className="header-controls">
        <div className="dropdown">
          <button className="btn btn-primary" onClick={() => setDropdownOpen(!dropdownOpen)}>+ Add section</button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              {sectionTypes.map(s => (
                <button key={s.type} onClick={() => { addSection(s.type); setDropdownOpen(false) }}>
                  <span className="swatch" style={{ background: s.color }}></span>
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button className={"btn btn-toggle" + (previewMode ? ' active' : '')} onClick={() => setPreviewMode(!previewMode)}>
          {previewMode ? '✕ Exit preview' : '▶️ Preview'}
        </button>
      </div>
    </header>
  )
}
