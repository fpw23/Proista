import React from 'react'
import { WithRedux } from '@proista/client-data/lib/WithRedux'
import { compose } from '@proista/client-tools/lib/index'
import { ah as DActions, sh as DState } from '../../Data/Drawer/Types'
import { WithMessageBus, BuildMessageBusChannels } from '@proista/client/lib/Tools/index'
import _ from 'lodash'
import Drawer from '@material-ui/core/Drawer'

export const DrawerChannels = BuildMessageBusChannels('Drawer', ['Hide', 'Show', 'Register', 'Unregister'])

const paddingValue = '20px'
export const DrawerStandardStyles = {
  HFull: {
    width: '100vw',
    padding: paddingValue
  },
  HThreeQuarters: {
    width: '75vw',
    padding: paddingValue
  },
  HHalf: {
    width: '50vw',
    padding: paddingValue
  },
  HQuarter: {
    width: '25vw',
    padding: paddingValue
  },
  VFull: {
    width: '100vw',
    height: '100vh',
    padding: paddingValue
  },
  VThreeQuarters: {
    width: '100vw',
    height: '75vh',
    padding: paddingValue
  },
  VHalf: {
    width: '100vw',
    height: '50vh',
    padding: paddingValue
  },
  VQuarter: {
    width: '100vw',
    height: '25vh',
    padding: paddingValue
  }
}

export class DrawerManagerPlain extends React.Component {
  onNewMessage (message) {
    const { DrawerShow, DrawerHide, DrawerRegister, DrawerUnregister } = this.props
    const { component, props, key, anchor } = message.Payload

    switch (message.Name) {
      case DrawerChannels.Show:
        DrawerShow(key, props, anchor)
        break
      case DrawerChannels.Hide:
        DrawerHide(key)
        break
      case DrawerChannels.Register:
        DrawerRegister(key, component)
        break
      case DrawerChannels.Unregister:
        DrawerUnregister(key)
        break
    }
  }

  onDrawerClose = (key) => {
    const { DrawerHide } = this.props
    DrawerHide(key)
  }

  render () {
    const { DrawerList = [] } = this.props

    return _.map(DrawerList, (d) => {
      return <Drawer key={d.key} anchor={d.anchor || 'right'} open={d.isOpen}>
        {d.isOpen === true
          ? React.createElement(d.component, _.merge({ key: d.key, close: () => { this.onDrawerClose(d.key) } }, d.props))
          : null
        }
      </Drawer>
    })
  }
}

export const DrawerManager = compose(
  WithRedux(
    [DState.DrawerList],
    [DActions.Hide, DActions.Show, DActions.Register, DActions.Unregister]
  ),
  WithMessageBus({
    channels: DrawerChannels.All
  })
)(DrawerManagerPlain)
