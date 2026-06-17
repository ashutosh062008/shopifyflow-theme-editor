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
    if (isValidHex(v)) onChange(v)
  }

  return (
    <div>
      <div className="color-input-row">
        <div
          className="color-swatch"
          style={{
            background: valid ? localValue : '#1c2130',
            boxShadow: valid ? `0 0 0 2px #7c5cff33` : 'none',
            transition: 'box-shadow .2s'
          }}
        />
        <input
          type="text"
          className={!valid && !isEmpty ? 'invalid' : ''}
          value={localValue}
          onChange={handleInput}
          placeholder="#7c5cff"
        />
      </div>
      {!valid && !isEmpty && <div className="invalid-text">Invalid hex code</div>}
    </div>
  )
}
