import React, { useEffect, useState, useContext } from 'react'
import DesignContext from '../context/DesignContext'

export default function TextEditor() {
  const { sections, selectedSectionId, updateSectionContent } = useContext(DesignContext)
  const selected = sections.find(s => s.id === selectedSectionId)
  const isTextboxSelected = selected && selected.type === 'textbox'

  const [text, setText] = useState(selected?.content?.text || '')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => { setText(selected?.content?.text || '') }, [selected?.id, selected?.content?.text])

  const handleTextChange = (e) => {
    const newText = e.target.value
    setText(newText)
    if (selected) updateSectionContent(selected.id, newText)
  }

  return (
    <div className="panel">
      <h3 className="panel-title">Text editor</h3>
      {!isTextboxSelected ? (
        <p className="empty-hint">
          <span className="ph-icon">📝</span>
          Select a text box section to edit
        </p>
      ) : (
        <div>
          <label style={{ display: 'block', marginBottom: '8px', fontSize: '11.5px', fontWeight: '600', color: '#8b91a8', textTransform: 'uppercase', letterSpacing: '.06em' }}>Edit Content</label>
          <textarea value={text} onChange={handleTextChange} style={{ width: '100%', minHeight: '140px', padding: '10px', border: `1px solid ${isFocused ? '#7c5cff' : '#262c3d'}`, borderRadius: '8px', background: '#0f1319', color: '#e9ecf5', fontFamily: 'var(--sans)', fontSize: '13px', lineHeight: '1.6', resize: 'vertical', outline: 'none', transition: 'border-color .12s' }} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder="Enter your text here..." />
          <div style={{ marginTop: '10px', fontSize: '11px', color: '#5b6178' }}>{text.length} characters</div>
        </div>
      )}
    </div>
  )
}
