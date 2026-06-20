import React, { useContext, useState } from 'react'
import DesignContext from '../context/DesignContext'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import SidebarSectionItem from './SidebarSectionItem'
import MenuBuilder from './MenuBuilder'
import ImagePicker from './ImagePicker'

export default function SidebarLeft() {
  const { sections, reorderSections, addSection, sectionMeta } = useContext(DesignContext)
  const [activeTab, setActiveTab] = useState('sections')
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const sectionTypes = [
    { type: 'hero', ...sectionMeta.hero },
    { type: 'gallery', ...sectionMeta.gallery },
    { type: 'textbox', ...sectionMeta.textbox },
    { type: 'productGrid', ...sectionMeta.productGrid },
    { type: 'image', ...sectionMeta.image }
  ]

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  )

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex((s) => s.id === active.id);
      const newIndex = sections.findIndex((s) => s.id === over.id);
      reorderSections(oldIndex, newIndex);
    }
  }

  return (
    <aside className="left-panel">
      <div className="sidebar-tabs">
        <button 
          className={`tab-btn ${activeTab === 'sections' ? 'active' : ''}`}
          onClick={() => setActiveTab('sections')}
        >
          Sections
        </button>
        <button 
          className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={() => setActiveTab('settings')}
        >
          Theme Settings
        </button>
      </div>

      {activeTab === 'sections' && (
        <div className="sidebar-content">
          <div className="panel-title">Template</div>
          
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={sections.map(s => s.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="sidebar-section-list">
                {sections.map((section) => (
                  <SidebarSectionItem
                    key={section.id}
                    section={section}
                  />
                ))}
                {sections.length === 0 && (
                  <div className="empty-hint">No sections added yet.</div>
                )}
              </div>
            </SortableContext>
          </DndContext>

          <div className="dropdown mt-3" style={{ marginTop: '16px' }}>
            <button className="btn btn-primary w-100" style={{ width: '100%' }} onClick={() => setDropdownOpen(!dropdownOpen)}>
              + Add section
            </button>
            {dropdownOpen && (
              <div className="dropdown-menu" style={{ width: '100%', top: 'auto', bottom: 'calc(100% + 8px)' }}>
                {sectionTypes.map(s => (
                  <button key={s.type} onClick={() => { addSection(s.type); setDropdownOpen(false) }}>
                    <span className="swatch" style={{ background: s.color }}></span>
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="sidebar-content">
          <MenuBuilder />
          <ImagePicker />
        </div>
      )}
    </aside>
  )
}
