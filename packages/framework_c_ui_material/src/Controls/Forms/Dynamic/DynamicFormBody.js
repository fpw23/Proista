import React from 'react'
import { Row, Col, LayoutSizes } from '../../Core/index'
import { CatchError } from '@proista/client/lib/Controls/Core/index'
import * as FC from '../Fields/index'
import { FormBoxHeader } from '../FormBoxHeader'
import { comparePaths } from '@proista/client-tools/lib/index'
// import { DynamicComboBox } from './DynamicComboBox'
import _ from 'lodash'

export class DynamicFormBody extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      bodyNodes: null,
      definitions: [],
      errors: []
    }
  }

  componentDidMount () {
    const { definition } = this.props
    const newState = this.parseDefinition(definition)
    if (newState.defError === undefined) {
      newState.bodyNodes = this.buildDefinition(newState.definitions)
    }
    this.setState(newState)
  }

  componentDidUpdate (prevProps, prevState) {
    const def = comparePaths('definition', this.props, prevProps, '')

    if (def.HasChanged) {
      const newState = this.parseDefinition(def.Current)
      if (newState.errors.length === 0) {
        try {
          newState.bodyNodes = this.buildDefinition(newState.definitions)
        } catch (err) {
          newState.errors.push('Can not build definition')
          newState.errors.push(err.message)
        }
      }
      this.setState(newState)
    }
  }

    parseDefinition = (Definition) => {
      const ret = {
        definitions: [],
        errors: []
      }

      try {
        ret.definitions = JSON.parse(Definition)
      } catch (err) {
        ret.errors.push('Can not parse definition')
        ret.errors.push(err.message)
      }

      return ret
    }

    buildDefinition = (definitions) => {
      const nodes = []

      for (const def of definitions) {
        nodes.push(this.buildDefinitionElement(def))
      }
      return nodes
    }

    buildDefinitionElement = (def = {}, namePrePend = '') => {
      let children = null

      if (_.isArray(def.children)) {
        children = []

        for (const childDef of def.children) {
          children.push(this.buildDefinitionElement(childDef))
        }
      }

      if (_.isString(def.children)) {
        children = def.children
      }

      const defProps = _.clone(def.props) || {}
      if (_.has(defProps, 'layout')) {
        defProps.layout = LayoutSizes[defProps.layout] || LayoutSizes.Full
      }

      defProps.key = def.id

      if (namePrePend) {
        if (_.has(defProps, 'name')) {
          defProps.name = `${namePrePend}.${defProps.name}`
        }
      }

      if (/[A-Z]/.test(def.component[0])) {
        switch (def.component) {
          case 'ComboBox':
          case 'TextBox':
          case 'NumberBox':
          case 'CheckBox':
            return React.createElement(FC[def.component], defProps, children)
          case 'FormBoxHeader':
            return React.createElement(FormBoxHeader, defProps, children)
          case 'Row':
            return React.createElement(Row, defProps, children)
          case 'Col':
            return React.createElement(Col, defProps, children)
          default:
            throw new Error(`Dynamic Form Body Unsupport Component: ${def.component}`)
        }
      } else {
        return React.createElement(def.component, defProps, children)
      }
    }

    render () {
      const { bodyNodes, errors = [] } = this.state

      if (errors.length > 0) {
        return <ul>
          {_.map(errors, (e) => <li>{e}</li>)}
        </ul>
      } else {
        return <CatchError>
          {bodyNodes || null}
        </CatchError>
      }
    }
}
