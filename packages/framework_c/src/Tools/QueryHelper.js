import _ from 'lodash'
import { compose } from '@proista/client-tools/lib/index'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { ah as ASActions, sh as ASState } from '@proista/client-data/lib/AppState/Types'
import React from 'react'
import axios from 'axios'

const globals = {
  onFRSuccess: undefined,
  onFRFailure: undefined,
  onError: undefined,
  getExtraPostData: undefined
}

export const WithQuerySetGlobalOptions = (options) => {
  if (_.has(options, 'onFRSuccess')) {
    if (_.isFunction(options.onFRSuccess)) {
      globals.onFRSuccess = options.onFRSuccess
    }
  }

  if (_.has(options, 'onFRFailure')) {
    if (_.isFunction(options.onFRFailure)) {
      globals.onFRFailure = options.onFRFailure
    }
  }

  if (_.has(options, 'onError')) {
    if (_.isFunction(options.onError)) {
      globals.onError = options.onError
    }
  }

  if (_.has(options, 'getExtraPostData')) {
    if (_.isFunction(options.getExtraPostData)) {
      globals.getExtraPostData = options.getExtraPostData
    }
  }
}

export function WithQuery (options) {
  const outerWrapper = (lopts) => {
    return (WrappedComponent) => {
      const opts = _.merge({
        propName: 'QueryData',
        clearOnUnmount: true,
        trackLoading: true,
        trackSkipCount: true,
        trackHasMore: true,
        trackCallCount: false
      }, lopts)

      if (_.isString(opts.stateKey) === false) {
        throw Error('With Query must be passed a statekey prop!')
      }

      const appStateKey = `${opts.stateKey}_QueryData`

      class internalPlain extends React.Component {
            getQueryProps = _.once(() => {
              const {
                AppStateSetValue, AppStateClearValue, AppStateAppendArray,
                AppStateUpdateArray, AppStateClearArray
              } = this.props

              const ret = {}

              _.forEach(opts.actions, (a) => {
                if (ret[a.prop]) {
                  throw new Error('Query Wrapper action prop name already assigned!')
                }

                if (a.mapIsArray === true & _.isString(a.map) === true) {
                  ret[`${a.map}Update`] = (filterFunction, updateFunction, modifyFunction) => {
                    AppStateUpdateArray(appStateKey, a.map, filterFunction, updateFunction, modifyFunction)
                  }
                  ret[`${a.map}Append`] = (values) => {
                    AppStateAppendArray(appStateKey, a.map, values)
                  }
                  ret[`${a.map}Clear`] = () => {
                    AppStateClearArray(appStateKey, a.map)
                  }
                } else if (_.isString(a.map) === true) {
                  ret[`${a.map}Set`] = (value) => {
                    AppStateSetValue(appStateKey, a.map, value)
                  }
                  ret[`${a.map}Clear`] = () => {
                    AppStateClearValue(appStateKey, a.map)
                  }
                }

                ret[a.prop] = (data, loadMore = false) => {
                  const { AppData } = this.props

                  if (opts.trackLoading === true) {
                    AppStateSetValue(appStateKey, `${a.prop}Loading`, true)
                  }

                  let queryParams
                  if (a.mapIsArray === true) {
                    queryParams = _.merge({ Skip: 0 }, data)
                  } else {
                    queryParams = _.merge({}, data)
                  }

                  if (loadMore === true && (_.isString(a.map) || _.isFunction(a.map))) {
                    queryParams.Skip = (AppData[`${a.prop}SkipCount`] || 0) + 1
                  }

                  const lastCallCount = (AppData[`${a.prop}CallCount`] || 0)

                  const webCall = new Promise((resolve, reject) => {
                    let postData = {
                      url: a.url,
                      data: queryParams,
                      crossDomain: true,
                      method: 'post'
                    }

                    if (_.isFunction(globals.getExtraPostData)) {
                      const extraPostData = globals.getExtraPostData() || {}
                      postData = _.merge({}, extraPostData, postData)
                    }

                    axios(postData).then(resp => {
                      if (resp.data.Status !== 'Success') {
                        if (_.isFunction(globals.onFRFailure)) {
                          globals.onFRFailure(resp.data)
                        }
                        if (opts.trackLoading === true) {
                          AppStateSetValue(appStateKey, `${a.prop}Loading`, false)
                        }
                        reject(resp.data.Messages)
                      } else {
                        if (_.isFunction(globals.onFRSuccess)) {
                          globals.onFRSuccess(resp.data)
                        }

                        if (_.isString(a.map)) {
                          if (queryParams.Skip > 0) {
                            AppStateAppendArray(appStateKey, a.map, resp.data.ReturnValue)
                          } else {
                            AppStateSetValue(appStateKey, a.map, resp.data.ReturnValue)
                          }

                          if (a.mapIsArray === true) {
                            if (resp.data.ReturnValue.length === queryParams.Limit) {
                              if (opts.trackHasMore === true) {
                                AppStateSetValue(appStateKey, `${a.map}HasMore`, true)
                              }
                            } else {
                              if (opts.trackHasMore === true) {
                                AppStateSetValue(appStateKey, `${a.map}HasMore`, false)
                              }
                            }
                          }
                          if (opts.trackHasMore === true) {
                            AppStateSetValue(appStateKey, `${a.prop}SkipCount`, queryParams.Skip)
                          }
                        } else if (_.isFunction(a.map)) {
                          const mapResult = a.map(resp.data.ReturnValue, queryParams.Skip)
                          if (!_.isEmpty(mapResult)) {
                            _.forEach(_.keys(mapResult), (k) => {
                              AppStateSetValue(appStateKey, k, mapResult[k])
                            })
                          }
                          if (opts.trackHasMore === true) {
                            AppStateSetValue(appStateKey, `${a.prop}SkipCount`, queryParams.Skip)
                          }
                        }

                        if (opts.trackLoading === true) {
                          AppStateSetValue(appStateKey, `${a.prop}Loading`, false)
                        }
                        if (opts.trackCallCount === true) {
                          AppStateSetValue(appStateKey, `${a.prop}CallCount`, lastCallCount + 1)
                        }

                        resolve({ data: resp.data.ReturnValue, extra: resp.data.ExtraData })
                      }
                    }).catch(err => {
                      if (_.isFunction(globals.onError)) {
                        globals.onError(err)
                      }
                      reject(err)
                      if (opts.trackLoading === true) {
                        AppStateSetValue(appStateKey, `${a.prop}Loading`, false)
                      }
                    })
                  })
                  return webCall
                }
              })

              return ret
            })

            render () {
              const { AppData } = this.props

              const queryProps = this.getQueryProps()
              const wrapperProps = { ...queryProps }
              wrapperProps[opts.propName] = AppData
              return (
                <WrappedComponent {...this.props} {...wrapperProps} />
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
