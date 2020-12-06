/* eslint-disable import/first */
/* eslint-disable import/no-webpack-loader-syntax */
import React from 'react'
import _ from 'lodash'

import { comparePaths } from '@proista/client-tools/lib/index'

import AceEditor from 'react-ace'

import 'ace-builds/src-min-noconflict/ext-language_tools'
import 'ace-builds/src-min-noconflict/mode-json'
import 'ace-builds/src-min-noconflict/mode-text'
import 'ace-builds/src-min-noconflict/mode-javascript'
import 'ace-builds/src-min-noconflict/theme-github'

const ace = require('ace-builds/src-min-noconflict/ace')
ace.config.setModuleUrl('ace/mode/javascript_worker', '/content/js/worker-javascript.js')
ace.config.setModuleUrl('ace/mode/json_worker', '/content/js/worker-json.js')
ace.config.setModuleUrl('ace/mode/html_worker', '/content/js/worker-html.js')
ace.config.setModuleUrl('ace/mode/css_worker', '/content/js/worker-css.js')

export class CodeEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      containerHeight: 0,
      containerWidth: 0
    }
  }

  wrapperDiv = null
  editor = null

  componentDidMount () {
    this.updateDimensions()
  }

  componentDidUpdate (prevProps, prevState) {
    const dimensions = comparePaths('dimensions', this.props, prevProps, 0)

    if (dimensions.HasChanged) {
      this.updateDimensions()
    }
  }

  updateDimensions () {
    if (this.wrapperDiv) {
      const rect = this.wrapperDiv.getBoundingClientRect()
      this.setState({
        containerHeight: rect.height,
        containerWidth: rect.width
      })
    }
  }

  onChange = (newCode, event) => {
    const { onChange } = this.props

    this.setState({
      code: newCode
    }, () => {
      if (_.isFunction(onChange)) {
        onChange(newCode, event)
      }
    })
  }

  render () {
    const { containerHeight = 0, containerWidth = 0 } = this.state
    const { className, mode = 'text', ...rest } = this.props
    return <div style={{ height: '100%', width: '100%', position: 'relative' }} className={className} ref={(c) => { this.wrapperDiv = c }}>
      <AceEditor
        {...rest}
        ref={(r) => { this.editor = r }}
        onChange={this.onChange}
        height={`${containerHeight}px`}
        width={`${containerWidth}px`}
        theme='github'
        mode={mode}
        enableBasicAutocompletion
      />
    </div>
  }
}

export default CodeEditor
