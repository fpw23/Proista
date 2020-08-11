import React from 'react'
import _ from 'lodash'
import Blockly from 'blockly'
import { comparePaths } from '@proista/client-tools/lib/index'

export class BlocklyEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      initComplete: false
    }
  }

  editor = null
  workspace = null

  onChange = (code, xml) => {
    const { onChange } = this.props
    if (_.isFunction(onChange)) {
      onChange(code, xml)
    }
  }

  componentDidMount () {
    const { RegisterBlocks, BuildToolBoxConfig, RootBlock = {}, NoOrphans = false, designXML, containerId } = this.props

    if (_.isFunction(RegisterBlocks)) {
      RegisterBlocks()
    }

    if (_.isFunction(BuildToolBoxConfig)) {
      this.workspace = Blockly.inject(this.editor,
        { toolbox: BuildToolBoxConfig() }
      )
    } else {
      this.workspace = Blockly.inject(this.editor)
    }

    let initDesignXml = '<xml></xml>'
    if (_.has(RootBlock, 'Name')) {
      initDesignXml = `<xml>
        <block type="${RootBlock.Name}" deletable="${RootBlock.deletable === true ? 'true' : 'false'}" movable="${RootBlock.movable === true ? 'true' : 'false'}">
        </block>
      </xml>`
    }

    Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(designXML || initDesignXml), this.workspace)
    this.workspace.addChangeListener(this.workspaceDidChange)

    if (NoOrphans === true) {
      this.workspace.addChangeListener(Blockly.Events.disableOrphans)
    }

    if (containerId) {
      const myContainer = document.querySelector(containerId)
      console.log(myContainer)
      if (myContainer) {
        _.each(['.blocklyWidgetDiv', '.blocklyTooltipDiv', '.blocklyDropDownDiv'], (c) => {
          console.log(c)
          const myBlock = document.querySelector(c)
          console.log(myBlock)
          if (myBlock) {
            myContainer.appendChild(myBlock)
          }
        })
      }
    }

    this.setState({
      initComplete: true
    })
  }

  componentWillUnmount () {
    if (this.workspace) {
      if (_.isFunction(this.workspace.removeChangeListener)) {
        this.workspace.removeChangeListener(this.workspaceDidChange)
      }
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const dimensions = comparePaths('dimensions', this.props, prevProps, {})

    if (dimensions.HasChanged) {
      Blockly.svgResize(this.workspace)
    }
  }

  workspaceDidChange = (event) => {
    if (event.type !== Blockly.Events.UI) {
      const code = Blockly.JavaScript.workspaceToCode(this.workspace)
      const xml = Blockly.Xml.workspaceToDom(this.workspace)
      const xmlText = Blockly.Xml.domToText(xml)
      this.onChange(code, xmlText)
    }
  }

  render () {
    return (
      <div ref={(c) => { this.editor = c }} style={{
        height: '100%',
        width: '100%',
        position: 'relative'
      }}>
      </div>
    )
  }
}

export default BlocklyEditor
