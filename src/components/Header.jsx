import React from 'react'

export default function Header({ previewMode, setPreviewMode }) {
  return (  
    <header className="app-header">
      <div className="app-title">
        <span className="mark">SF</span>
        ShopifyFlow
        <span className="sub">theme editor</span>
      </div>
      <div className="header-controls">
        <button className={"btn btn-toggle" + (previewMode ? ' active' : '')} onClick={() => setPreviewMode(!previewMode)}>
          {previewMode ? '✕ Exit preview' : '▶️ Preview'}
        </button>
      </div>
    </header>
  )
}

