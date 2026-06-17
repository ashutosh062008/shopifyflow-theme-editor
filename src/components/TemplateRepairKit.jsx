import React, { Component } from 'react'

export default class TemplateRepairKit extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch() {}

  handleContinue = () => {
    this.setState({ hasError: false })
    if (this.props.onRepair) this.props.onRepair()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="repair-fallback">
          <div className="repair-icon">⚠️</div>
          <h3>Section repaired automatically</h3>
          <p>Something went wrong while rendering a section. It's been reset to safe defaults.</p>
          <button className="btn btn-primary" onClick={this.handleContinue}>Continue editing</button>
        </div>
      )
    }
    return this.props.children
  }
}
