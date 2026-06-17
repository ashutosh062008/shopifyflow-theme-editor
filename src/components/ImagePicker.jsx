import React, { useRef, useState, useContext } from 'react'
import { mockImages } from '../data/mockImages'
import DesignContext from '../context/DesignContext'

const ROW_HEIGHT = 56
const LIST_HEIGHT = 320

export default function ImagePicker() {
  const { sections, selectedSectionId, addImageToSection } = useContext(DesignContext)
  const selected = sections.find(s => s.id === selectedSectionId)
  const isGallerySelected = selected && selected.type === 'gallery'

  const containerRef = useRef(null)
  const [scrollTop, setScrollTop] = useState(0)
  const [dragActive, setDragActive] = useState(false)

  const totalHeight = mockImages.length * ROW_HEIGHT
  const startIndex = Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - 3)
  const endIndex = Math.min(mockImages.length, Math.ceil((scrollTop + LIST_HEIGHT) / ROW_HEIGHT) + 3)
  const visibleItems = mockImages.slice(startIndex, endIndex)

  const handleScroll = (e) => setScrollTop(e.target.scrollTop)

  const handleFileDrop = (e) => {
    e.preventDefault()
    setDragActive(false)
    if (!isGallerySelected) return
    const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      addImageToSection(selectedSectionId, url)
    }
  }

  return (
    <div className="panel">
      <h3 className="panel-title">Image picker</h3>
      {!isGallerySelected && (
        <p style={{ color: 'var(--ink-faint)', fontSize: 11.5, margin: '0 0 10px', fontFamily: 'var(--mono)' }}>
          Select a gallery section to enable
        </p>
      )}
      <div
        className={`image-upload-zone ${dragActive ? 'drag-active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleFileDrop}
      >
        <span className="iu-icon">☁</span>
        <span className="iu-text">{isGallerySelected ? 'Drag & drop image here or click to upload' : 'Select gallery to upload'}</span>
        <input type="file" accept="image/*" onChange={handleFileDrop} disabled={!isGallerySelected} />
      </div>
      <div className="image-picker-list" ref={containerRef} onScroll={handleScroll} style={{ height: LIST_HEIGHT, overflowY: 'auto', position: 'relative' }}>
        <div style={{ height: totalHeight, position: 'relative' }}>
          {visibleItems.map(img => (
            <div key={img.id} className="image-row" style={{ position: 'absolute', top: img.id * ROW_HEIGHT, left: 0, right: 0, height: ROW_HEIGHT }}>
              <img src={img.url} loading="lazy" alt={`thumb-${img.id}`} />
              <span className="img-meta">#{String(img.id).padStart(3, '0')}</span>
              <button className="btn btn-small" disabled={!isGallerySelected} title={!isGallerySelected ? 'Select a gallery section first' : 'Add to Gallery'} onClick={() => isGallerySelected && addImageToSection(selectedSectionId, img.url)}>Add</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
