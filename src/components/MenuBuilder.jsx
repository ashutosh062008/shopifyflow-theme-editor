import React, { useState, useContext } from 'react'
import DesignContext from '../context/DesignContext'

export default function MenuBuilder() {
  const { menuItems, addMenuItem, removeMenuItem } = useContext(DesignContext)
  const [label, setLabel] = useState('')
  const [link, setLink] = useState('')

  const handleAdd = () => {
    if (!label.trim() || !link.trim()) return
    addMenuItem(label.trim(), link.trim())
    setLabel('')
    setLink('')
  }

  const handleKeyDown = (e) => { if (e.key === 'Enter') handleAdd() }

  return (
    <div className="panel">
      <h3 className="panel-title">Menu builder</h3>
      <div className="menu-form">
        <input type="text" placeholder="Label — e.g. Shop" value={label} onChange={(e) => setLabel(e.target.value)} onKeyDown={handleKeyDown} />
        <input type="text" placeholder="Link — e.g. /shop" value={link} onChange={(e) => setLink(e.target.value)} onKeyDown={handleKeyDown} />
        <button className="btn btn-primary" onClick={handleAdd}>+ Add menu item</button>
      </div>
      <ul className="menu-list">
        {menuItems.map(item => (
          <li key={item.id}>
            <span><span className="ml-label">{item.label}</span><span className="ml-link">{item.link}</span></span>
            <button className="x-btn" onClick={() => removeMenuItem(item.id)}>✕</button>
          </li>
        ))}
      </ul>
      <div className="menu-preview">
        {menuItems.length === 0 ? (
          <span className="menu-preview-empty">No menu items yet</span>
        ) : (
          menuItems.map(item => (
            <a key={item.id} href={item.link} onClick={(e) => e.preventDefault()}>{item.label}</a>
          ))
        )}
      </div>
    </div>
  )
}
