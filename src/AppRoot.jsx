import React, { useState } from 'react'
import { DesignProvider } from './context/DesignContext'
import Header from './components/Header'
import Canvas from './components/Canvas'
import SidebarLeft from './components/SidebarLeft'
import StyleTweakerSidebar from './components/StyleTweakerSidebar'
import TextEditor from './components/TextEditor'
import CodeGenerator from './components/CodeGenerator'
import Footer from './components/Footer'

export default function AppRoot() {
  const [previewMode, setPreviewMode] = useState(false)

  return (
    <DesignProvider>
      <div className="app-shell">
        <Header previewMode={previewMode} setPreviewMode={setPreviewMode} />
        <div className={"app-layout" + (previewMode ? ' preview' : '')}>
          {!previewMode && (
            <SidebarLeft />
          )}
          <main className="canvas-area">
            <Canvas />
          </main>
          {!previewMode && (
            <aside className="right-panel">
              <StyleTweakerSidebar />
              <TextEditor />
              <CodeGenerator />
            </aside>
          )}
        </div>
        <Footer />
      </div>
    </DesignProvider>
  )
}
