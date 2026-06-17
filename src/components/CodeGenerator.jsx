import React, { useContext, useMemo, useState } from 'react'
import DesignContext from '../context/DesignContext'
import { generateCSS } from '../utils/generateCSS'

export default function CodeGenerator() {
  const { sections } = useContext(DesignContext)
  const [copied, setCopied] = useState(false)

  const css = useMemo(() => generateCSS(sections), [sections])

  const handleCopy = () => {
    navigator.clipboard.writeText(css).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }

  const highlighted = useMemo(() => {
    return css.split('\n').map((line, i) => {
      if (line.trim().startsWith('.section-')) {
        return <span key={i} className="cm-sel">{line}{"\n"}</span>
      }
      if (line.includes(':')) {
        const [prop, ...rest] = line.split(':')
        return <span key={i}><span className="cm-prop">{prop}</span>:{rest.join(':')}{"\n"}</span>
      }
      return <span key={i}>{line}{"\n"}</span>
    })
  }, [css])

  return (
    <div className="panel">
      <h3 className="panel-title">Generated CSS</h3>
      <pre className="code-block"><code>{highlighted}</code></pre>
      <button className="btn" onClick={handleCopy}>{copied ? '✓ Copied to clipboard' : 'Copy CSS'}</button>
    </div>
  )
}
