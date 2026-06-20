import React, { useEffect, useState, useContext } from 'react'
import DesignContext from '../context/DesignContext'

export default function TextEditor() {
  const { sections, selectedSectionId, updateSectionContent, updateSectionStyle } = useContext(DesignContext)
  const selected = sections.find(s => s.id === selectedSectionId)
  
  const isTextbox = selected?.type === 'textbox'
  const isHero = selected?.type === 'hero'
  const isGallery = selected?.type === 'gallery'
  const isEditable = isTextbox || isHero || isGallery

  const [text, setText] = useState('')
  const [heading, setHeading] = useState('')
  const [sub, setSub] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    if (isTextbox) setText(selected?.content?.text || '')
    if (isHero) {
      setHeading(selected?.content?.heading || '')
      setSub(selected?.content?.sub || '')
    }
  }, [selected?.id, selected?.content?.text, selected?.content?.heading, selected?.content?.sub])

  const handleTextChange = (e) => {
    const newText = e.target.value
    setText(newText)
    if (selected) updateSectionContent(selected.id, newText)
  }

  const handleHeadingChange = (e) => {
    const newHeading = e.target.value
    setHeading(newHeading)
    if (selected) updateSectionContent(selected.id, { heading: newHeading })
  }

  const handleSubChange = (e) => {
    const newSub = e.target.value
    setSub(newSub)
    if (selected) updateSectionContent(selected.id, { sub: newSub })
  }

  const handleGalleryItemChange = (index, field, value) => {
    if (!selected || !selected.styles.images) return
    const newImages = [...selected.styles.images]
    const item = newImages[index]
    const itemObj = typeof item === 'string' ? { url: item, name: '', price: '' } : { ...item }
    itemObj[field] = value
    newImages[index] = itemObj
    updateSectionStyle(selected.id, 'images', newImages)
  }

  return (
    <div className="panel">
      <h3 className="panel-title">Content editor</h3>
      {!isEditable ? (
        <p className="empty-hint">
          <span className="ph-icon">📝</span>
          Select a text box, hero, or gallery section to edit
        </p>
      ) : (
        <div>
          {isTextbox && (
            <>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '11.5px', fontWeight: '600', color: '#8b91a8', textTransform: 'uppercase', letterSpacing: '.06em' }}>Edit Content</label>
              <textarea value={text} onChange={handleTextChange} style={{ width: '100%', minHeight: '140px', padding: '10px', border: `1px solid ${isFocused ? '#7c5cff' : '#262c3d'}`, borderRadius: '8px', background: '#0f1319', color: '#e9ecf5', fontFamily: 'var(--sans)', fontSize: '13px', lineHeight: '1.6', resize: 'vertical', outline: 'none', transition: 'border-color .12s' }} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder="Enter your text here..." />
              <div style={{ marginTop: '10px', fontSize: '11px', color: '#5b6178' }}>{text.length} characters</div>
            </>
          )}
          {isHero && (
            <>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '11.5px', fontWeight: '600', color: '#8b91a8', textTransform: 'uppercase', letterSpacing: '.06em' }}>Heading</label>
              <textarea value={heading} onChange={handleHeadingChange} style={{ width: '100%', minHeight: '60px', padding: '10px', border: `1px solid ${isFocused ? '#7c5cff' : '#262c3d'}`, borderRadius: '8px', background: '#0f1319', color: '#e9ecf5', fontFamily: 'var(--sans)', fontSize: '13px', lineHeight: '1.6', resize: 'vertical', outline: 'none', transition: 'border-color .12s', marginBottom: '16px' }} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder="Enter heading..." />
              
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '11.5px', fontWeight: '600', color: '#8b91a8', textTransform: 'uppercase', letterSpacing: '.06em' }}>Subheading</label>
              <textarea value={sub} onChange={handleSubChange} style={{ width: '100%', minHeight: '80px', padding: '10px', border: `1px solid ${isFocused ? '#7c5cff' : '#262c3d'}`, borderRadius: '8px', background: '#0f1319', color: '#e9ecf5', fontFamily: 'var(--sans)', fontSize: '13px', lineHeight: '1.6', resize: 'vertical', outline: 'none', transition: 'border-color .12s' }} onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)} placeholder="Enter subheading..." />
            </>
          )}
          {isGallery && (
            <div>
              <label style={{ display: 'block', marginBottom: '12px', fontSize: '11.5px', fontWeight: '600', color: '#8b91a8', textTransform: 'uppercase', letterSpacing: '.06em' }}>Gallery Items</label>
              {(!selected.styles.images || selected.styles.images.length === 0) ? (
                <div className="empty-hint" style={{ fontSize: '12px' }}>No images in this gallery yet.</div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {selected.styles.images.map((item, index) => {
                    const url = typeof item === 'string' ? item : item.url;
                    const name = typeof item === 'string' ? '' : item.name;
                    const price = typeof item === 'string' ? '' : item.price;
                    return (
                      <div key={index} style={{ display: 'flex', gap: '12px', background: '#1c2130', padding: '12px', borderRadius: '8px' }}>
                        <img src={url} alt={`thumb-${index}`} style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          <input type="text" value={name} onChange={(e) => handleGalleryItemChange(index, 'name', e.target.value)} placeholder="Item Name" style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #262c3d', background: '#0f1319', color: '#e9ecf5', fontSize: '12px', outline: 'none' }} />
                          <input type="text" value={price} onChange={(e) => handleGalleryItemChange(index, 'price', e.target.value)} placeholder="Price (e.g., $19.99)" style={{ width: '100%', padding: '6px 8px', borderRadius: '4px', border: '1px solid #262c3d', background: '#0f1319', color: '#e9ecf5', fontSize: '12px', outline: 'none' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
