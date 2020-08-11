import _ from 'lodash'
import React from 'react'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { ah as ASActions, sh as ASState } from '@proista/client-data/lib/AppState/Types'
import { compose } from '@proista/client-tools/lib/compose'

export function WithComponentState (options) {
  const outerWrapper = (lopts) => {
    return (WrappedComponent) => {
      const opts = _.merge({
        propName: 'AppData',
        clearOnUnmount: true
      }, lopts)

      if (_.isString(opts.stateKey) === false) {
        throw Error('Component State Wrapper must be passed a dataName prop!')
      }

      const appStateKey = `${opts.stateKey}_ComponentData`

      class internalPlain extends React.Component {
        componentWillUnmount () {
          if (opts.clearOnUnmount === true) {
            const { AppStateClearValue } = this.props
            AppStateClearValue(appStateKey)
          }
        }

        render () {
          const wrapperProps = {}

          const {
            AppData, AppStateSetValue, AppStateClearValue, AppStateAppendArray,
            AppStateUpdateArray, AppStateClearArray, ...rest
          } = this.props

          wrapperProps.SetAppValue = (prop, value) => { AppStateSetValue(appStateKey, prop, value) }
          wrapperProps.ClearAppArray = (prop) => { AppStateClearArray(appStateKey, prop) }
          wrapperProps.UpdateAppArray = (prop, filterFunction, updateFunction, modifyFunction) => { AppStateUpdateArray(appStateKey, prop, filterFunction, updateFunction, modifyFunction) }
          wrapperProps.AppendAppArray = (prop, value) => { AppStateAppendArray(appStateKey, prop, value) }
          wrapperProps.ClearAppValue = (prop) => { AppStateClearValue(appStateKey, prop) }
          wrapperProps[opts.propName || 'AppData'] = AppData

          return (
            <WrappedComponent {...wrapperProps} {...rest} StateKey={appStateKey} />
          )
        }
      }

      const internal = compose(
        WithRedux(
          [ASState.GetValues(appStateKey)],
          [ASActions.SetValue, ASActions.ClearValue,
            ASActions.AppendArrayValue, ASActions.ClearArrayValue,
            ASActions.UpdateArrayValue]
        )
      )(internalPlain)

      return internal
    }
  }

  if (_.isFunction(options)) {
    return outerWrapper({})(options)
  }

  return outerWrapper(options)
}
