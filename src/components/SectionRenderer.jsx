import React, { useContext } from 'react'
import DesignContext from '../context/DesignContext'

export default function SectionRenderer({ section }) {
  const { styles, content, type } = section
  const { updateSectionContent } = useContext(DesignContext)

  if (type === 'hero') {
    return (
      <div
        className="hero-block"
        style={{
          background: styles.color,
          width: '100%',
          fontSize: `${styles.fontSize}px`,
          padding: `${styles.padding}px 20px`,
          borderRadius: `${styles.borderRadius}px`,
          textAlign: styles.textAlign || 'center',
          opacity: `${(styles.opacity || 100) / 100}`,
          boxShadow: styles.shadow > 0 ? `0 ${styles.shadow}px ${styles.shadow * 2}px rgba(0,0,0,0.2)` : 'none',
          letterSpacing: `${styles.letterSpacing || 0}px`,
          lineHeight: styles.lineHeight || 1.5
        }}
      >
        <h2 style={{ fontSize: `${styles.fontSize * 1.4}px` }}>{content.heading}</h2>
        <p>{content.sub}</p>
      </div>
    )
  }

  if (type === 'gallery') {
    return (
      <div
        className="gallery-block"
        style={{
          background: styles.color,
          width: '100%',
          fontSize: `${styles.fontSize}px`,
          padding: `${styles.padding}px`,
          borderRadius: `${styles.borderRadius}px`,
          opacity: `${(styles.opacity || 100) / 100}`,
          boxShadow: styles.shadow > 0 ? `0 ${styles.shadow}px ${styles.shadow * 2}px rgba(0,0,0,0.2)` : 'none'
        }}
      >
        {(!styles.images || styles.images.length === 0) && (
          <div className="gallery-empty">No images yet — use the Image Picker to add some.</div>
        )}
        {(styles.images || []).map((item, i) => {
          const url = typeof item === 'string' ? item : item.url;
          const name = typeof item === 'string' ? '' : item.name;
          const price = typeof item === 'string' ? '' : item.price;
          
          return (
            <div key={i} className="gallery-item-wrapper" style={{ display: 'inline-block', verticalAlign: 'top', margin: '4px', textAlign: 'center' }}>
              <img src={url} loading="lazy" alt={`gallery-${i}`} style={{ borderRadius: `${styles.borderRadius}px`, maxWidth: '100%', display: 'block' }} onLoad={(e) => {
                try {
                  if (url && url.startsWith && url.startsWith('blob:')) URL.revokeObjectURL(url)
                } catch (err) {}
              }} />
              {(name || price) && (
                <div style={{ marginTop: '8px', fontSize: '0.9em', color: '#e9ecf5' }}>
                  {name && <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>{name}</div>}
                  {price && <div style={{ opacity: 0.7 }}>{price}</div>}
                </div>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  if (type === 'textbox') {
    const handleInput = (e) => {
      updateSectionContent(section.id, e.currentTarget.textContent)
    }
    return (
      <div
        className="textbox-block"
        style={{
          color: styles.color,
          width: '100%',
          fontSize: `${styles.fontSize}px`,
          background: 'var(--panel)',
          padding: `${styles.padding}px`,
          borderRadius: `${styles.borderRadius}px`,
          textAlign: styles.textAlign || 'left',
          lineHeight: styles.lineHeight || 1.5,
          letterSpacing: `${styles.letterSpacing || 0}px`,
          opacity: `${(styles.opacity || 100) / 100}`,
          boxShadow: styles.shadow > 0 ? `0 ${styles.shadow}px ${styles.shadow * 2}px rgba(0,0,0,0.2)` : 'none'
        }}
      >
        <div contentEditable suppressContentEditableWarning onInput={handleInput} style={{ outline: 'none', minHeight: '1em' }}>
          {content.text}
        </div>
      </div>
    )
  }

  if (type === 'productGrid') {
    const products = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      title: `Product ${i + 1}`,
      price: `$${(19.99 + i * 5).toFixed(2)}`,
      img: `https://picsum.photos/seed/product-${section.id}-${i}/200/150`
    }))

    return (
      <div
        className="productgrid-block"
        style={{
          background: styles.color,
          width: '100%',
          fontSize: `${styles.fontSize}px`,
          padding: `${styles.padding}px`,
          borderRadius: `${styles.borderRadius}px`,
          opacity: `${(styles.opacity || 100) / 100}`,
          boxShadow: styles.shadow > 0 ? `0 ${styles.shadow}px ${styles.shadow * 2}px rgba(0,0,0,0.2)` : 'none'
        }}
      >
        {products.map(p => (
          <div className="product-card" key={p.id} style={{ borderRadius: `${styles.borderRadius}px` }}>
            <img src={p.img} loading="lazy" alt={p.title} />
            <div className="pc-body">
              <p className="pc-title">{p.title}</p>
              <p className="pc-price">{p.price}</p>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === 'image') {
    const [dragActive, setDragActive] = React.useState(false)

    const handleFileDrop = (e) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0]
      if (file && file.type.startsWith('image/')) {
        const url = URL.createObjectURL(file)
        updateSectionContent(section.id, { src: url })
      }
    }

    return (
      <div
        className={`image-block ${dragActive ? 'drag-active' : ''}`}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setDragActive(true) }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleFileDrop}
        style={{
          background: styles.color || 'var(--panel)',
          width: '100%',
          padding: `${styles.padding}px`,
          borderRadius: `${styles.borderRadius}px`,
          opacity: `${(styles.opacity || 100) / 100}`,
          boxShadow: styles.shadow > 0 ? `0 ${styles.shadow}px ${styles.shadow * 2}px rgba(0,0,0,0.2)` : 'none',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '200px'
        }}
      >
        {content.src ? (
          <img src={content.src} alt="Uploaded" style={{ width: '100%', borderRadius: `${styles.borderRadius}px`, display: 'block' }} />
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--ink-faint)', pointerEvents: 'none' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>🖼</div>
            <div>Drag & drop an image here</div>
          </div>
        )}
      </div>
    )
  }

  throw new Error(`Unknown section type: ${type}`)
}
