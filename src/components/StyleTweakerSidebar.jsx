import React, { useContext } from 'react'
import DesignContext from '../context/DesignContext'
import SmartColorInput from './SmartColorInput'

export default function StyleTweakerSidebar() {
  const { sections, selectedSectionId, updateSectionStyle, sectionMeta } = useContext(DesignContext)
  const selected = sections.find(s => s.id === selectedSectionId)
  const meta = selected ? sectionMeta[selected.type] : null

  return (
    <div className="panel">
      <h3 className="panel-title">Style tweaker</h3>
      {!selected ? (
        <p className="empty-hint">
          <span className="ph-icon">◆</span>
          Select a section to edit its style
        </p>
      ) : (
        <div>
          <div className="field">
            <label>
              <span>{meta.icon} {meta.label}</span>
            </label>
          </div>
          <div className="field">
            <label>
              Font size <span className="field-value">{selected.styles.fontSize}px</span>
            </label>
            <input type="range" min="10" max="60" value={selected.styles.fontSize} onChange={(e) => updateSectionStyle(selected.id, 'fontSize', Number(e.target.value))} />
          </div>
          <div className="field">
            <label>
              Width <span className="field-value">{selected.styles.width}%</span>
            </label>
            <input type="range" min="20" max="100" value={selected.styles.width} onChange={(e) => updateSectionStyle(selected.id, 'width', Number(e.target.value))} />
          </div>
          <div className="field">
            <label>
              Padding <span className="field-value">{selected.styles.padding}px</span>
            </label>
            <input type="range" min="0" max="120" value={selected.styles.padding} onChange={(e) => updateSectionStyle(selected.id, 'padding', Number(e.target.value))} />
          </div>
          <div className="field">
            <label>
              Radius <span className="field-value">{selected.styles.borderRadius}px</span>
            </label>
            <input type="range" min="0" max="40" value={selected.styles.borderRadius} onChange={(e) => updateSectionStyle(selected.id, 'borderRadius', Number(e.target.value))} />
          </div>
          <div className="field">
            <label>
              Shadow <span className="field-value">{selected.styles.shadow}px</span>
            </label>
            <input type="range" min="0" max="30" value={selected.styles.shadow || 0} onChange={(e) => updateSectionStyle(selected.id, 'shadow', Number(e.target.value))} />
          </div>
          <div className="field">
            <label>
              Opacity <span className="field-value">{selected.styles.opacity || 100}%</span>
            </label>
            <input type="range" min="10" max="100" value={selected.styles.opacity || 100} onChange={(e) => updateSectionStyle(selected.id, 'opacity', Number(e.target.value))} />
          </div>
          <div className="field">
            <label>
              Letter Spacing <span className="field-value">{selected.styles.letterSpacing || 0}px</span>
            </label>
            <input type="range" min="-2" max="10" value={selected.styles.letterSpacing || 0} onChange={(e) => updateSectionStyle(selected.id, 'letterSpacing', Number(e.target.value))} />
          </div>
          <div className="field">
            <label>
              Line Height <span className="field-value">{(selected.styles.lineHeight || 1.5).toFixed(1)}</span>
            </label>
            <input type="range" min="1" max="3" step="0.1" value={selected.styles.lineHeight || 1.5} onChange={(e) => updateSectionStyle(selected.id, 'lineHeight', Number(e.target.value))} />
          </div>
          <div className="field">
            <label>Text Alignment</label>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
              {['left', 'center', 'right', 'justify'].map(align => {
                const isActive = (selected.styles.textAlign || 'left') === align
                return (
                  <button key={align} className="btn btn-small" onClick={() => updateSectionStyle(selected.id, 'textAlign', align)} style={{ flex: 1, background: isActive ? '#7c5cff' : '#1c2130', color: isActive ? '#fff' : '#e9ecf5', border: isActive ? '1px solid #7c5cff' : '1px solid #262c3d', fontWeight: isActive ? '700' : '600', cursor: 'pointer', transition: 'all .15s' }}>{align.charAt(0).toUpperCase()}</button>
                )
              })}
            </div>
          </div>
          <div className="field" style={{ marginBottom: 4 }}>
            <label>Color</label>
            <SmartColorInput value={selected.styles.color} onChange={(val) => updateSectionStyle(selected.id, 'color', val)} />
          </div>
        </div>
      )}
    </div>
  )
}
