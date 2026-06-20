import React, { useState, useEffect } from 'react'
import { isValidHex } from '../utils/colorUtils'

export default function SmartColorInput({ value, onChange }) {
  const [localValue, setLocalValue] = useState(value)

  useEffect(() => setLocalValue(value), [value])

  const valid = isValidHex(localValue)
  const isEmpty = localValue === ''

  const handleInput = (e) => {
    const v = e.target.value
    setLocalValue(v)
    onChange(v)
  }

  return (
    <div>
      <div className="color-input-row">
        <input
          type="color"
          className="color-picker-input"
          value={valid ? localValue : '#000000'}
          onChange={handleInput}
          style={{
            width: '100%',
            height: '40px',
            padding: '0',
            border: '1px solid var(--line)',
            borderRadius: '8px',
            background: 'var(--panel)',
            cursor: 'pointer'
          }}
        />
      </div>
    </div>
  )
}
