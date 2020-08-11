import { createBus } from 'suber'
import _ from 'lodash'
import React from 'react'

let appBus

export const InitMessageBus = () => {
  console.log('calling Message Bus Init')
  appBus = createBus()
  return appBus
}

const MessageBus = {
  subscribe: (channel, callback) => {
    if (appBus === undefined) {
      throw new Error('Must call initialize before using message bus')
    }
    return appBus.take(channel, callback)
  },
  send: (channel, message) => {
    if (message) {
      if (appBus === undefined) {
        throw new Error('Must call initialize before using message bus')
      }
      appBus.send(channel, message)
    }
  }
}

export function WithMessageBus (options) {
  const outerWrapper = (lopts) => {
    return (WrappedComponent) => {
      const opts = _.merge({
        channels: ['*']
      }, lopts)

      class internal extends React.Component {
        constructor (props) {
          super(props)

          this.childRef = React.createRef()
          this.subscriptions = []
        }

        componentDidMount () {
          _.each(opts.channels, (c) => {
            this.subscriptions.push(MessageBus.subscribe(c, this.onNewMessage.bind(this)))
          })
        }

        onNewMessage (message) {
          if (this.childRef.current) {
            if (_.isFunction(this.childRef.current.onNewMessage)) {
              this.childRef.current.onNewMessage(message)
            } else {
              console.log('MBH No Ref.onNewMessage')
            }
          } else {
            console.log('MBH No Ref')
          }
        }

        componentWillUnmount () {
          _.each(this.subscriptions, (s) => {
            if (_.isFunction(s)) {
              s()
            }
          })
        }

        render () {
          return (
            <WrappedComponent ref={this.childRef} {...this.props} />
          )
        }
      }

      return internal
    }
  }

  if (_.isFunction(options)) {
    return outerWrapper({})(options)
  }

  return outerWrapper(options)
}

export const BuildMessageBusChannels = (componentName, customChannels) => {
  if (_.isArray(customChannels)) {
    const ret = {}
    const allNames = []
    for (var customChannel of customChannels) {
      const name = componentName + '.' + customChannel
      allNames.push(name)
      ret[customChannel] = name
      ret[`New${customChannel}`] = (payload) => {
        return { Name: name, Payload: payload }
      }
    }
    ret.All = allNames
    return ret
  } else {
    return {
      Success: componentName + '.Success',
      NewSuccess: (payload) => {
        return { Name: componentName + '.Success', Payload: payload }
      },
      Error: componentName + '.Error',
      NewError: (payload) => {
        return { Name: componentName + '.Error', Payload: payload }
      },
      Closed: componentName + '.Closed',
      NewClosed: (payload) => {
        return { Name: componentName + '.Closed', Payload: payload }
      },
      Open: componentName + '.Open',
      NewOpen: (payload) => {
        return { Name: componentName + '.Open', Payload: payload }
      },
      All: [
        componentName + '.Success',
        componentName + '.Error',
        componentName + '.Closed',
        componentName + '.Open'
      ]
    }
  }
}

export function SendBusMessage (message = {}, channel = '*') {
  try {
    MessageBus.send(message.Name || channel || '*', message)
  } catch (err) {
    console.log('Send Bus Message Error:', err)
  }
}
